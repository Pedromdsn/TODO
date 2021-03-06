import { IoIosRemoveCircle, IoIosCheckmarkCircle } from "react-icons/io"

const Todo = (props: TodoComponentProps) => {
	return (
		<div className="flex">
			<div className={`w-60 py-1 px-5 ring-2 ring-black ${!!props.todo.complete && "line-through"}`}>
				{props.todo.todo}
			</div>
			<div className="bg-red-600 py-1 px-2 w-20 ring-2 ring-black text-white font-medium flex justify-around items-center">
				<button
					className="text-xl filter hover:text-2xl"
					onClick={() => props.completeFun(props.todo.id, !props.todo.complete)}>
					<IoIosCheckmarkCircle />
				</button>
				<button className="text-xl filter hover:text-2xl" onClick={() => props.removeFun(props.todo.id)}>
					<IoIosRemoveCircle />
				</button>
			</div>
		</div>
	)
}

export default Todo
