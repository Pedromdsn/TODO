import jwt from "jsonwebtoken"

import { NextApiRequest, NextApiResponse } from "next"
import { parseCookies } from "nookies"
import { prisma } from "../../libs/Prisma"

const LambdaAddTodo = async (req: NextApiRequest, res: NextApiResponse) => {
	const { todo, id }: { todo: string; id: number } = req.body
	const { TokenSenior } = parseCookies({ req })

	switch (req.method) {
		case "POST":
			if (todo.trim().length == 0) return res.status(401).send("")

			const token: any = jwt.verify(TokenSenior, process.env.TOKEN!!, (err, decoded) => {
				if (err) return null
				return decoded
			})

			if (!token?.id) return res.status(401).send("")

			await prisma.todo.create({
				data: {
					todo: todo as string,
					authorId: token?.id,
				},
			})

			return res.status(201).send("")
		case "DELETE":
			//TODO: Delete
			return res.status(201).send("")
	}
}

export default LambdaAddTodo
