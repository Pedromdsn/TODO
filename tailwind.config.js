module.exports = {
	mode: "jit",
	purge: ["./src/**"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				background: "#1111",
				pink: "#F652A0",
				blue: "#36EEE0",
				cyan: "#BCECE0",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
