import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import url from '../utils/server.js'
import { session, getSession } from '../utils/session'
import Navbar from '../components/navbar'

const Home = (props) => {

	const [isLogged, setIsLogged] = useState()
	const [sessionID, setSessionID] = useState()

	useEffect(() => {
		const getUserSession = async() => {
			setIsLogged(session())

			const userHash = getSession()
			const userID = await fetch(`${url}/api/getEntityByHash?entityHash=${userHash}`)
				.then(response => response.json())
				.then(response => response.id_entity)
			
			setSessionID(userID)
		}
		getUserSession()
	}, [])

	return (
		<>
			<Navbar />

			<div className="w-full flex flex-col space-y-12 py-24 items-center font-medium">
        
				<div className="flex flex-col space-y-2 justify-center items-center">
					<Link href="/activities">
						<a className="text-xl text-orange-500">Mostrar lista de actividades</a>
					</Link>
					<a href={'/new-activity'}className="text-1xl ">Prueba modificar actividad</a>
				</div>

			</div>
		</>
	)
}

export default Home
