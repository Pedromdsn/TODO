import jwt from "jsonwebtoken"

import { NextApiRequest, NextApiResponse } from "next"
import { parseCookies } from "nookies"
import { Status } from "../../@types/Enum"
import { prisma as prismaClientStarted } from "../../libs/Prisma"

const prisma = prismaClientStarted

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { todo: todoText, id }: { todo: string; id: number } = req.body
	const { TokenSenior: token } = parseCookies({ req })

	//Global Check
	const tokenDecoded: any = jwt.verify(token, process.env.TOKEN!!, (err, decoded) => {
		if (err) return null
		return decoded
	})

	if (!tokenDecoded?.id) return res.send({ status: Status.INVALID_TOKEN })

	switch (req.method) {
		case "POST":
			if (todoText.trim().length == 0) return res.send({ status: Status.TODO_EMPTY })

			const createTodo = await prisma.todo.create({
				data: {
					todo: todoText as string,
					authorId: tokenDecoded!!.id,
				},
			})

			return res.send({ status: Status.OK, createTodo: createTodo })
		case "DELETE":
			const todo = await prisma.todo.findFirst({
				where: {
					id: id,
					authorId: tokenDecoded!!.id,
				},
			})

			if (!todo) return res.send({ status: Status.NOT_FOUND })

			await prisma.todo
				.delete({
					where: {
						id: todo.id,
					},
				})
				.catch((e) => console.log(e))

			return res.send({ status: Status.OK })
		default:
			res.send({ status: Status.NOT_ALLOWED })
	}
}
