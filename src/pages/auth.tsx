import axios from "axios"
import Image from "next/image"
import Inputs from "../components/Inputs"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/dist/client/router"
import { FaUserAlt, FaKey } from "react-icons/fa"

const Auth = () => {
	const { register, handleSubmit } = useForm()
	const [erroLogin, setErrorLogin] = useState(false)
	const router = useRouter()

	const login = async (e: AuthProps) => {
		const user = e.name.trim()
		const pass = e.senha.trim()

		const login = await axios.post("/api/auth", {
			user,
			pass,
		})

		if (login.status == 202) return router.push("/")

		return setErrorLogin(true)
	}

	const goToRegister = (e) => {
		e.preventDefault()
		router.push("/")
	}

	return (
		<div className="bg-background h-screen flex flex-col justify-center items-center">
			<div className="flex flex-col justify-center mb-10 p-5">
				<Image src="/todo.png" height="200" width="500" />
			</div>
			<form onSubmit={handleSubmit(login)} className="flex flex-col justify-center items-center gap-5 mb-20">
				<Inputs register={register("name")} icon={FaUserAlt} placeholder="Username" />
				<Inputs register={register("senha")} icon={FaKey} placeholder="Password" />

				<div
					className={`${
						erroLogin || "hidden"
					} text-red-500 bg-red-300 px-5 py-4 border-2 border-red-500 rounded-3xl`}>
					Password needs an uppercase letter and 8 characters.
				</div>

				<div className="flex gap-10 justify-center items-center mt-2 text-xl flex-wrap">
					<button
						className="border-2 border-gray-500 px-5 py-3 bg-white text-gray-600 rounded-2xl w-32"
						onClick={goToRegister}>
						Registrar
					</button>
					<button className="border-2 border-green-700 px-5 py-3 bg-green-400 text-green-800 rounded-2xl w-32">
						Login
					</button>
				</div>
			</form>
		</div>
	)
}

export default Auth
