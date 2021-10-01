import axios from "axios"
import Image from "next/image"
import Inputs from "../components/Inputs"

import { useForm } from "react-hook-form"
import { useRouter } from "next/dist/client/router"
import { FaUserAlt, FaKey } from "react-icons/fa"
import { toast, ToastContainer } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"
import { Status } from "../@types/Enum"

const Auth = () => {
	const { register, handleSubmit } = useForm()
	const router = useRouter()

	const login = async (e: AuthProps) => {
		const user = e.name.trim()
		const pass = e.senha.trim()

		const id = toast.loading("Please wait...", { position: "bottom-right", autoClose: 5000 })

		const login = await axios.post("/api/auth", {
			user,
			pass,
		})

		if (login.data.status == Status.OK) {
			toast.update(id, { render: "Logged", type: "success", isLoading: false, autoClose: 5000 })
			return router.push("/")
		}

		toast.update(id, { render: "User not Found", type: "error", isLoading: false, autoClose: 5000 })
	}

	const goToRegister = (e) => {
		e.preventDefault()
		router.push("/register")
	}

	return (
		<div className="bg-background h-screen flex flex-col justify-center items-center">
			<div className="flex flex-col justify-center mb-10 p-5">
				<Image src="/todo.png" height="200" width="500" />
			</div>
			<form onSubmit={handleSubmit(login)} className="flex flex-col justify-center items-center gap-5 mb-20">
				<Inputs register={register("name")} icon={FaUserAlt} placeholder="Username" />
				<Inputs register={register("senha")} icon={FaKey} placeholder="Password" pass />

				<div className="flex gap-10 justify-center items-center mt-2 text-xl flex-wrap">
					<button className="border-2 border-green-700 px-5 py-3 bg-green-400 text-green-800 rounded-2xl w-32">
						Login
					</button>
					<button
						className="border-2 border-gray-500 px-5 py-3 bg-white text-gray-600 rounded-2xl w-32 order-first"
						onClick={goToRegister}>
						Registrar
					</button>
				</div>
			</form>
			<ToastContainer />
		</div>
	)
}

export default Auth
