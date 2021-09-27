import jwt from "jsonwebtoken"
import md5 from "md5"

import { prisma } from "../../libs/Prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { setCookie } from "nookies"

const LambdaAuth = async (req: NextApiRequest, res: NextApiResponse) => {
	const { name, pass } = req.body
	
	const user = await prisma.users.findFirst({
		where: {
			name: name,
			pass: md5(pass),
		},
	})

	if (!user) return res.status(401).send("")

	const token = jwt.sign({ id: user.id }, process.env.TOKEN!!, { expiresIn: 60 })

	setCookie({ res }, "TokenSenior", token, {
		maxAge: 60,
		path: "/",
	})

	return res.status(202).send("")
}

export default LambdaAuth
