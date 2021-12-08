import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import url from '../utils/server.js'
import { session, getSession } from '../utils/session'

const Home = (props) => {

	const [isLogged, setIsLogged] = useState()
	const [sessionID, setSessionID] = useState()

	useEffect(() => {
		const getUserSession = async() => {
			setIsLogged(session())

			const userHash = getSession()
			
			setSessionID(await fetch(`${url}/api/getEntityByHash?entityHash=${userHash}`)
				.then(response => response.json())
				.then(response => response.id_entity))
		}
		getUserSession()
	}, [])

	useEffect(() => {
		setIsLogged(session())

	}, [])

	return (
		<>
			<div className="w-full h-screen flex flex-col space-y-12 py-24 items-center font-medium">
        
				<div className="flex flex-col space-y-2 justify-center items-center">
					<h1 className="text-4xl">Wanna Hang Out</h1>
					<h2 className="text-xl">Sesión iniciada (<span className={`${isLogged ? 'text-green-500' : 'text-red-500'}`}>{isLogged ? 'Sí' : 'No'}</span>)</h2>
				</div>

				{isLogged ?
					<Link href="/logout">
						<a className="text-xl text-red-500">Cerrar sesión</a>
					</Link>
					:
					<Link href="/login">
						<a className="text-xl text-green-500">Iniciar sesión</a>
					</Link>
				}

				<div className="flex flex-col space-y-2 items-center">
					{/*<a href="login" className="text-xl text-orange-500">Log in</a>
					<a href="activities" className="text-xl text-orange-500">Activities list</a>
					<a href="new-activity" className="text-xl text-orange-500">Create new activity</a>
					<a href="profile" className="text-xl text-orange-500">Modificar Mis Datos</a>
					<a href="signup" className="text-xl text-orange-500">Sign up</a>*/}
					<Link href={`/modificar?id=${sessionID}`} passHref>
						<div className="text-xl text-orange-500 cursor-pointer">Modificar Mis Datos</div>
					</Link>
					<Link href={`/profile?id=${sessionID}`} passHref>
						<div className="text-xl text-orange-500 cursor-pointer">Mi perfil</div>
					</Link>
					{/*<Link href="/signup">
						<a className="text-xl text-orange-500">Crear cuenta</a>
					</Link>*/}
					<Link href="/activities">
						<a className="text-xl text-orange-500">Mostrar lista de actividades</a>
					</Link>
				</div>
				<Link href="/new-activity">
					<a className="text-xl text-orange-500 bg-orange-100 py-2 px-6 rounded-xl">Crear actividad</a>
				</Link>

			</div>
		</>
	)
}

export default Home