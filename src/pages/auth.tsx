import axios from "axios"
import { useRouter } from "next/dist/client/router"
import Image from "next/image"
import { useState } from "react"

import { useForm, useWatch } from "react-hook-form"
import { FaUserAlt, FaKey } from "react-icons/fa"

const Auth = () => {
	const { register, handleSubmit } = useForm()
	const [erroLogin, setErrorLogin] = useState(false)
	const router = useRouter()

	const login = async (e: AuthProps) => {
		const user = e.name.trim()
		const pass = e.senha.trim()

		// if (pass.length < 8 || !pass.split("").every((e) => e.toLowerCase() == e)) {
		// 	setErroSenha(true)
		// 	return
		// }

		const login = await axios.post("/api/auth", {
			user,
			pass,
		})

		if (login.status == 202) return router.push("/")

		return setErrorLogin(true)
	}

	const goToRegister = () => {}

	return (
		<div className="bg-black h-screen flex flex-col justify-center items-center">
			<div className="w-1/3 h-1/3 flex flex-col justify-center mb-10">
				<Image src="/todo.png" height="400" width="1000" />
			</div>
			<form onSubmit={handleSubmit(login)} className="flex flex-col justify-center items-center gap-5 mb-20">
				<div className="flex px-8 py-4 bg-white items-center rounded-3xl focus-within:ring-2 ring-gray-400">
					<FaUserAlt />
					<input
						{...register("name")}
						type="text"
						placeholder="Username"
						className="outline-none pl-5 w-60 text-xl"
						required
					/>
				</div>
				<div className="flex px-8 py-4 bg-white items-center rounded-3xl focus-within:ring-2 ring-gray-400">
					<FaKey />
					<input
						{...register("senha")}
						type="password"
						placeholder="Password"
						className="outline-none pl-5 w-60 text-xl"
						required
					/>
				</div>

				<div
					className={`${
						erroLogin || "hidden"
					} text-red-500 bg-red-300 px-5 py-4 border-2 border-red-500 rounded-3xl`}>
					Password needs an uppercase letter and 8 characters.
				</div>

				<div className="flex gap-10 justify-center items-center mt-2 text-xl">
					<button
						className="border-2 border-gray-500 px-5 py-3 bg-white text-gray-600 rounded-2xl"
						onClick={goToRegister}>
						Registrar
					</button>
					<button className="border-2 border-green-700 px-5 py-3 bg-green-400 text-green-800 rounded-2xl cursor-pointer">
						Login
					</button>
				</div>
			</form>
		</div>
	)
}

export default Auth
