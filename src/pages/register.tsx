import axios from "axios"
import Image from "next/image"
import Inputs from "../components/Inputs"

import { useForm } from "react-hook-form"
import { useRouter } from "next/dist/client/router"
import { FaUserAlt, FaKey } from "react-icons/fa"
import { toast, ToastContainer } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

const Auth = () => {
	const { register, handleSubmit } = useForm()
	const router = useRouter()

	const login = async (e: RegisterProps) => {
		const user = e.name.trim()
		const pass = e.senha.trim()
		const pass1 = e.senha1.trim()

		const id = toast.loading("Please wait...", { position: "bottom-right", autoClose: 5000 })

		if (pass1 != pass)
			return toast.update(id, { render: "Passwords not math", type: "error", isLoading: false, autoClose: 5000 })


		if (pass.length < 8 || pass.split("").every(e => typeof e.charAt(0) != "number" && e.charAt(0).toLowerCase() == e.charAt(0)))
			return toast.update(id, { render: "Password need had 8 letter and 1 Password must be 8 letters and one uppercase.", type: "error", isLoading: false, autoClose: 5000 })

		const res = await axios.post("/api/register", {
			user,
			pass,
		})

		switch (res.data.status) {
			case "Ok":
				 toast.update(id, { render: "Registered", type: "success", isLoading: false, autoClose: 5000 })
				 break
			case "Name exists":
				toast.update(id, { render: "Username in use", type: "error", isLoading: false, autoClose: 5000 })
				return
			default:
				toast.update(id, { render: "Unexpected error", type: "error", isLoading: false, autoClose: 5000 })
				return
		}

		router.push("/")
	}

	const goToAuth = (e) => {
		e.preventDefault()
		router.push("/auth")
	}

	return (
		<div className="bg-background h-screen flex flex-col justify-center items-center">
			<div className="flex flex-col justify-center mb-10 p-5">
				<Image src="/todo.png" height="200" width="500" />
			</div>
			<form onSubmit={handleSubmit(login)} className="flex flex-col justify-center items-center gap-5 mb-20">
				<Inputs register={register("name")} icon={FaUserAlt} placeholder="Username" />
				<Inputs register={register("senha")} icon={FaKey} placeholder="Password" pass />
				<Inputs register={register("senha1")} icon={FaKey} placeholder="Confirm Password" pass />

				<div className="flex gap-10 justify-center items-center mt-2 text-xl flex-wrap">
					<button
						className="border-2 border-gray-500 px-5 py-3 bg-white text-gray-600 rounded-2xl w-32"
						onClick={goToAuth}>
						Login
					</button>
					<button className="border-2 border-green-700 px-5 py-3 bg-green-400 text-green-800 rounded-2xl w-32">
						Registrar
					</button>
				</div>
			</form>
			<ToastContainer />
		</div>
	)
}

export default Auth
