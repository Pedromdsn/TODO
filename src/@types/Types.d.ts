type AuthProps = {
	name: string
	senha: string
}

type RegisterProps = {
	name: string
	senha: string
	senha1: string
}

type TodoReceivedProps = {
	todo: string
}

type TodoPropsIndex = {
	id: number
	todo: string
	authorID: number
	complete: boolean
}

type InputsProps = {
	register: any
	icon: IconType
	placeholder: string
	pass?: boolean = false
}

type TodoComponentProps = {
	todo: TodoPropsIndex
	removeFun: any
	completeFun: any
}
