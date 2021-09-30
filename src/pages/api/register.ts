import { PrismaClientKnownRequestError } from "@prisma/client/runtime"
import md5 from "md5"

import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../libs/Prisma"

export default async (req: NextApiRequest, res: NextApiResponse) => {
	let error = false

	let { user: name, pass } = req.body

	name = name.trim()
	pass = pass.trim()

	if (!name || !pass) return res.send({ status: "Error" })

	const user = await prisma.user
		.create({
			data: {
				name: name,
				pass: md5(pass),
			},
		})
		.catch((e: PrismaClientKnownRequestError) => {
			error = true
			return e.code == "P2002" ? res.send({ status: "Name exists" }) : res.send({ status: "Bad Request" })
		})
		
	if (!error) return res.send({ status: "Ok" })
}
