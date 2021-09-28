type AuthProps = {
	name: string
	senha: string
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
