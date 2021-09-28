import jwt from "jsonwebtoken"

import { NextApiRequest, NextApiResponse } from "next"
import { parseCookies } from "nookies"
import { prisma } from "../../libs/Prisma"

const LambdaAddTodo = async (req: NextApiRequest, res: NextApiResponse) => {
	const { todo: todoText, id }: { todo: string; id: number } = req.body
	const { TokenSenior: token } = parseCookies({ req })

	//Global Check
	const tokenDecoded: any = jwt.verify(token, process.env.TOKEN!!, (err, decoded) => {
		if (err) return null
		return decoded
	})

	if (!tokenDecoded?.id) {
		res.redirect("/auth").send("")
		return res.status(401).send("")
	}

	switch (req.method) {
		case "POST":
			if (todoText.trim().length == 0) return res.status(401).send("")

			const createTodo = await prisma.todo.create({
				data: {
					todo: todoText as string,
					authorId: tokenDecoded!!.id,
				},
			})

			return res.status(201).send(createTodo)
		case "DELETE":
			const todo = await prisma.todo.findFirst({
				where: {
					id: id,
					authorId: tokenDecoded!!.id,
				},
			})

			if (!todo) return res.status(401).send("")

			await prisma.todo
				.delete({
					where: {
						id: todo.id,
					},
				})
				.catch((e) => console.log(e))

			return res.status(201).send("")
		default:
			res.status(404).send("")
	}
}

export default LambdaAddTodo
