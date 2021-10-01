import jwt from "jsonwebtoken"

import { NextApiRequest, NextApiResponse } from "next"
import { parseCookies } from "nookies"
import { Status } from "../../@types/Enum"
import { prisma } from "../../libs/Prisma"

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { todo: todoText, id, complete }: { todo: string; id: number; complete: boolean } = req.body
	const { TokenSenior: token } = parseCookies({ req })

	//Global Check
	const tokenDecoded: any = jwt.verify(token, process.env.TOKEN!!, (err, decoded) => {
		if (err) return null
		return decoded
	})

	if (!tokenDecoded?.id) return res.send({ status: Status.INVALID_TOKEN })

	switch (req.method) {
		case "PUT":
			const completeTodo = await prisma.todo.update({
				where: {
					id: id,
				},
				data: {
					complete: !!complete,
				},
			})

			return res.send({ status: Status.OK, createTodo: completeTodo })
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
