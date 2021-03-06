import bcrypt from "bcrypt"

import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime"
import { prisma } from "../../libs/Prisma"
import { Status } from "../../@types/Enum"

export default async (req: NextApiRequest, res: NextApiResponse) => {
	let error = false

	let { user: name, pass } = req.body

	name = name.trim()
	pass = pass.trim()

	if (!name || !pass) return res.send({ status: Status.UNEXPECTED_ERROR })

	const user = await prisma.user
		.create({
			data: {
				name: name,
				pass: bcrypt.hashSync(pass, +process.env.SALT!!),
			},
		})
		.catch((e: PrismaClientKnownRequestError) => {
			error = true
			return e.code == "P2002"
				? res.send({ status: Status.DUPLICATED_NAME })
				: res.send({ status: Status.BAD_REQUEST })
		})

	if (!error) return res.send({ status: Status.OK })
}
