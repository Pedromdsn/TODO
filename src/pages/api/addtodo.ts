import jwt from "jsonwebtoken"

import { NextApiRequest, NextApiResponse } from "next"
import { parseCookies } from "nookies"
import { prisma } from "../../libs/Prisma"

const LambdaAddTodo = async (req: NextApiRequest, res: NextApiResponse) => {
	const { todo } = req.body
	const { TokenSenior } = parseCookies({ req })

	const token: any = jwt.verify(TokenSenior, process.env.TOKEN!!, (err, decoded) => {
		if (err) return null
		return decoded
	})
	
	if (!token?.id) return (res.status(401).send(""))

	
	const teste = await prisma.todo.create({
		data: {
			todo: todo as string,
			authorId: token?.id,
		},
	})

	return res.status(201).send("")
}

export default LambdaAddTodo
