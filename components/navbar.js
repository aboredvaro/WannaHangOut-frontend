import React, { useState } from 'react'
import { SearchOutline } from 'react-ionicons'

const Navbar = (props) => {
	
	// Barra de navegación

	return (
		<div className='flex flex-row justify-between items-center px-20 w-full h-20 border'>

			{/* Logo y búsqueda */}
			<div className='flex flex-row items-center space-x-8'>
				<div>logo</div>
				<div className='relative'>
					<input
						placeholder='Buscar eventos'
						className='relative flex flex-row w-96 pl-12 px-5 py-3 placeholder-gray-400 bg-gray-100 focus:bg-white border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 rounded-lg outline-none'
					/>
					<SearchOutline
						className='absolute top-1/2 left-5 transform -translate-y-1/2 text-gray-700 z-10'
						color={''}
						height="18px"
						width="18px"
					/>
				</div>
			</div>

			{/* Acciones login y usuario */}
			<div className='flex flex-row space-x-4'>
				<button className='flex flex-row justify-center items-center text-base font-medium text-gray-700 px-6 h-10 bg-gray-100 rounded-lg'>
					Crear cuenta
				</button>
				<button className='flex flex-row justify-center items-center text-base font-medium text-white px-6 h-10 bg-orange-500 rounded-lg'>
					Iniciar sesión
				</button>
			</div>

		</div>	
	)
}

export default Navbar