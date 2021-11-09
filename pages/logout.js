import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { exitSession } from '../utils/session'

const Logout = (props) => {

	const router = useRouter()

	useEffect(() => {
		exitSession()
		router.push('/')
	})

	return (
		<div className="w-full h-screen flex flex-col items-center justify-center">

			<span>Cerrando sesión</span>

		</div>
	)
}

export default Logout