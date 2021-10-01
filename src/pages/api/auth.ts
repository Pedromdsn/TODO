import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import { prisma } from "../../libs/Prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { setCookie } from "nookies"
import { Status } from "../../@types/Enum"

const tokenTime = 10 * 60 // 10 Minutes

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { name, pass } : {name: string, pass: string} = req.body
	
	if (!name || !pass) return res.send({status: Status.UNEXPECTED_ERROR})
	
	const user = await prisma.user.findFirst({
		where: {
			name: name,
		},
	})
	
	if (!user) return res.send({ status: Status.NOT_FOUND })
	if (!bcrypt.compareSync(pass, user.pass)) return res.send({ status: Status.NOT_ALLOWED })

	const token = jwt.sign({ id: user.id }, process.env.TOKEN!!, { expiresIn: tokenTime })

	setCookie({ res }, "TokenSenior", token, {
		maxAge: tokenTime,
		path: "/",
	})

	return res.send({ status: Status.OK })
}
