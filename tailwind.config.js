/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				dark: {
					1: '#181818',
					2: '#151515',
				},
				whit: {
					2: 'rgba(255, 255, 255, 0.02)',
					4: 'rgba(255, 255, 255, 0.04)',
				},
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
