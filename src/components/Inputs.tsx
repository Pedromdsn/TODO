import { IconType } from "react-icons"

interface InputsProps {
	register: any
	icon: IconType
	placeholder: string
}

const Inputs = (props: InputsProps) => {
	return (
		<div className="flex px-8 py-4 bg-white items-center rounded-3xl focus-within:ring-2 ring-gray-400">
			<props.icon />
			<input
				{...props.register}
				type="text"
				placeholder={props.placeholder}
				className="outline-none pl-5 w-60 text-xl"
				required
			/>
		</div>
	)
}

export default Inputs