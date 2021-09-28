import jwt from "jsonwebtoken"
import axios from "axios"
import Image from "next/image"
import nookies from "nookies"
import Todo from "../components/Todo"

import { GetServerSideProps } from "next"
import { useForm } from "react-hook-form"
import { prisma } from "../libs/Prisma"
import { useState } from "react"

export default function Home({ data }: { data: TodoPropsIndex[] }) {
	const { register, handleSubmit } = useForm()
	const [todos, setTodos] = useState<TodoPropsIndex[]>(data)

	const add = async (e: TodoReceivedProps) => {
		const res = await axios.post("/api/todo", {
			todo: e.todo,
		})
		if (res.status == 201) setTodos([...todos, res.data])
	}

	const remove = async (id: number) => {
		// e.preventDefault()
		const res = await axios.delete("/api/todo", {
			data: {
				id: id,
			},
		})
		if (res.status == 201) setTodos([...todos.filter((e) => e.id != id)])
	}

	return (
		<div className="flex flex-col items-center min-h-screen py-2 bg-background">
			<div className="flex flex-col justify-center mb-10 p-5 mt-[10vh]">
				<Image src="/todo.png" height="200" width="500" />
			</div>
			<div>
				<form className="flex" onSubmit={handleSubmit(add)}>
					<input
						{...register("todo")}
						type="text"
						className="w-60 py-1 px-5 ring-2 ring-black outline-none"
					/>
					<button className="bg-red-600 py-1 px-5 ring-2 ring-black text-white font-medium">ADD ITEM</button>
				</form>
			</div>
			<div className="mt-10 flex flex-col gap-3">
				{todos.reverse().map((e) => (
					<Todo todo={e.todo} key={e.id} id={e.id} remove={remove} />
				))}
			</div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { TokenSenior } = nookies.get(ctx)

	const token: any = jwt.verify(TokenSenior, process.env.TOKEN!!, (err, decoded) => {
		if (err) return null

		return decoded
	})

	if (!token)
		return {
			props: {},
			redirect: { destination: "/auth" },
		}

	const data = await prisma.todo.findMany({
		where: {
			authorId: token!!.id,
		},
	})

	console.log(data)

	return {
		props: {
			data,
		},
	}
}
