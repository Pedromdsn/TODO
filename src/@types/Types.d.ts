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
}

type TodoComponentProps = {
	id: number
	todo: string
	remove: any
}

interface InputsProps {
	register: any
	icon: IconType
	placeholder: string
	pass?: boolean = false
}