import jwt from "jsonwebtoken"
import md5 from "md5"

import { prisma } from "../../libs/Prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { setCookie } from "nookies"
import { Status } from "../../@types/Enum"

const tokenTime = 10 * 60 // 10 Minutes

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { name, pass } = req.body

	const user = await prisma.user.findFirst({
		where: {
			name: name,
			pass: md5(pass),
		},
	})

	if (!user) return res.send({ status: Status.INVALID_TOKEN })

	const token = jwt.sign({ id: user.id }, process.env.TOKEN!!, { expiresIn: tokenTime })

	setCookie({ res }, "TokenSenior", token, {
		maxAge: tokenTime,
		path: "/",
	})

	return res.send({ status: Status.OK })
}
