const colors = require('tailwindcss/colors')

module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			sans: ['"Basier Circular"', 'sans-serif']
		},
		fontSize: {
			'supporting-1': ['0.5rem', { lineHeight: '0.625rem' }],
			'supporting-2': ['0.625rem', { lineHeight: '0.75rem' }],
			xs: ['0.75rem', { lineHeight: '1rem' }],
    	sm: ['0.875rem', { lineHeight: '1.25rem' }],
    	base: ['1rem', { lineHeight: '1.5rem' }],
    	lg: ['1.125rem', { lineHeight: '1.75rem' }],
    	xl: ['1.25rem', { lineHeight: '1.75rem' }],
    	'2xl': ['1.5rem', { lineHeight: '2rem' }],
    	'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    	'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    	'5xl': ['3rem', { lineHeight: '1' }],
    	'6xl': ['3.75rem', { lineHeight: '1' }],
    	'7xl': ['4.5rem', { lineHeight: '1' }],
    	'8xl': ['6rem', { lineHeight: '1' }],
    	'9xl': ['8rem', { lineHeight: '1' }]
		},
		colors: {
			transparent: 'rgba(0,0,0,0)',
			orange: colors.orange,
			gray: colors.gray,
			red: colors.red,
			green: colors.green,
			purple: colors.purple,
			white: colors.white
		},
		extend: {
			transitionDuration: {
				50: '50ms'
			},
			boxShadow: {
      	'card': '0 24px 32px rgba(0, 0, 0, 0.04)',
			},
			transitionProperty: {
				'width': 'width',
				'height': 'height',
				'spacing': 'margin, padding',
				'size': 'height, width',
			},
			width: {
				'110': '27.5rem',
				'18.4' : '4.6rem'
			}
		},
	},
	variants: {
		backgroundColor: ['responsive', 'hover', 'active', 'focus'],
		backgroundOpacity: ['responsive', 'hover', 'active', 'focus'],
	},
	plugins: [],
}
