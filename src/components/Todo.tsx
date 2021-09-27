const Todo = (props: TodoComponentProps) => {
	return (
		<div className="flex">
			<div className="w-60 py-1 px-5 ring-2 ring-black">{props.todo}</div>
			<button className="bg-red-600 py-1 px-5 ring-2 ring-black text-white font-medium">REMOVE</button>
		</div>
	)
}

export default Todo
