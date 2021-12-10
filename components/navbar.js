import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import url from '../utils/server.js'
import { session, getSession } from '../utils/session'
import { SearchOutline, ChevronDownOutline } from 'react-ionicons'

const Navbar = ({}) => {

	const [isLogged, setIsLogged] = useState(null)
	const [sessionID, setSessionID] = useState(false)

	useEffect(() => {
		const getUserSession = async() => {
			setIsLogged(session())

			const userHash = getSession()
			const userID = await fetch(`${url}/api/getEntityByHash?entityHash=${userHash}`)
				.then(response => response.json())
			
			setSessionID(userID)
		}
		getUserSession()
	}, [])

	return (
		<div className='flex flex-row justify-between items-center px-6 w-full h-20 border'>

			{/* Logo y búsqueda */}
			<div className='flex flex-row items-center space-x-8'>
				<Link href="/" passHref>
					<div className="transform -translate-y-px cursor-pointer">
						<Image
							src="/logos/who.svg"
							alt="Wanna Hang Out logo"
							width={65}
							height={32}
							className="pointer-events-none"
						/>
					</div>
				</Link>

				<div className='relative'>
					<input
						placeholder='Buscar eventos'
						className='relative peer flex flex-row w-96 h-11 pl-10 px-5 placeholder-gray-400 bg-gray-50 focus:bg-white border border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-100 rounded-lg outline-none transition-colors duration-150 ease-in-out'
					/>
					<SearchOutline
						className='absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 peer-focus:text-gray-700 z-10 pointer-events-none'
						color={''}
						height='18px'
						width='18px'
					/>
				</div>
			</div>

			{/* Acciones login y usuario */}
			<div className={`${isLogged ?? 'opacity-0 pointer-events-none'} flex flex-row items-center space-x-4`}>
				{isLogged ?
					<>
						<Link href="/new-activity">
							<a className='flex flex-row justify-center items-center text-base font-medium text-orange-600 px-6 h-10 bg-orange-100 rounded-lg'>
								Crear
							</a>
						</Link>

						<div className='flex flex-row items-center px-1.5 space-x-2'>
							<div className={`relative flex flex-row w-8 h-8 bg-gray-200 ${(sessionID === false) ? 'animate-pulse' : ''} ring-1 ring-gray-200 rounded-full overflow-hidden`}>
								{sessionID && <img src={sessionID.avatar} className='absolute w-full h-full rounded-full' alt='user avatar' />}
							</div>

							<div className='flex flex-row items-center'>
								<div>{sessionID.name}</div>
								<ChevronDownOutline
									className='flex flex-row justify-center items-center p-1.5'
									color={''}
									height="18px"
									width="18px"
								/>
							</div>
							
						</div>
					</>
					:
					<>
						<Link href="/signup">
							<a className='flex flex-row justify-center items-center text-base font-medium text-gray-700 px-6 h-10 bg-gray-100 rounded-lg'>
								Crear cuenta
							</a>
						</Link>

						<Link href="/login">
							<a className='flex flex-row justify-center items-center text-base font-medium text-white px-6 h-10 bg-orange-500 rounded-lg'>
								Iniciar sesión
							</a>
						</Link>
					</>
				}
			</div>

		</div>	
	)
}

export default Navbar
