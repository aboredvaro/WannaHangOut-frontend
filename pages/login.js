import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '../components/navbar'
import { useRouter } from 'next/router'
import { session, setSession } from '../utils/session'
import sha from '../utils/sha.js'
import { EyeOutline, EyeOffOutline } from 'react-ionicons'

const Login = (props) => {

	const router = useRouter()

	const [showPassword, setShowPassword] = useState(false)
	const [passwordFocused, setPasswordFocused] = useState(false)
	const [showAlert, setShowAlert] = useState(false)
	const [remember, setRemember] = useState(false)
	const [showLogin, setShowLogin] = useState(false)

	const login = async (event) => {
		event.preventDefault()
		if (await setSession(sha(document.getElementById('mailInput').value),sha(document.getElementById('passwordInput').value))) {
			router.push('/')
		} else {
			setShowAlert(true)
		}
	}

	useEffect(() => {
		if (session()) {
			router.push('/')
		} else {
			setShowLogin(true)
		}
	}, [router])

	return (
		<>
			<div className={`${showLogin ? 'flex' : 'hidden'} flex-col w-full min-h-screen items-stretch bg-gray-50`}>
				<Navbar />

				<div className='flex flex-col w-full h-full items-center justify-center py-20'>
					<form
						onSubmit={login}
						className="flex flex-col p-8 rounded-xl shadow-card bg-white border border-gray-100 space-y-4"
					>
						
						<div className={`${showAlert ? 'flex' : 'hidden'} flex-row justify-center items-center w-full p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium`}>
							<p className="text-sm">Correo o contraseña incorrectos</p>
						</div>

						<div className="flex flex-col space-y-1">
							<p className="text-sm">Correo</p>
							<input
								className="input w-64"
								type="email"
								pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
								id="mailInput"
								required
								autoFocus
							/>
						</div>

						<div className="flex flex-col space-y-1">
							<div className="flex flex-row justify-between items-center">
								<p className="text-sm">Contraseña</p>
								<a className="text-supporting-2 font-medium text-orange-500">He olvidado mi contraseña</a>
							</div>
							<div className="relative w-full">
								<div className={`${passwordFocused ? '' : 'opacity-25'} hover:opacity-100`}>
									<EyeOutline
										className={`absolute ${showPassword ? 'hidden' : ''} right-3 top-2 cursor-pointer`}
										color={'#4B5563'}
										height="24px"
										width="24px"
										onClick={() => {setShowPassword(!showPassword); document.getElementById('passwordInput').focus()}}
									/>
									<EyeOffOutline
										className={`absolute ${showPassword ? '' : 'hidden'} right-3 top-2 cursor-pointer`}
										color={'#4B5563'}
										height="24px"
										width="24px"
										onClick={() => {setShowPassword(!showPassword); document.getElementById('passwordInput').focus()}}
									/>
								</div>
								<input
									className="input w-64"
									type={showPassword ? 'text' : 'password'}
									id="passwordInput"
									required
									onFocus={() => { setPasswordFocused(true) }}
									onBlur={() => { setPasswordFocused(false) }}
								/>
							</div>
						</div>

						{/*
						<div className="relative flex flex-row justify-start items-center">
							<Switch
								checked={remember}
								onChange={setRemember}
								className="flex flex-row items-center"
							>
								<div className={`${remember ? 'bg-orange-500' : 'bg-gray-100 border border-gray-300'} relative flex flex-row justify-center items-center h-5 w-5 mr-1.5 rounded cursor-pointer`}>
									<CheckmarkOutline
										className={`${remember ? '' : 'hidden'} right-3 top-2 cursor-pointer`}
										color={'#fff'}
										height="16px"
										width="16px"
									/>
								</div>
								<span>Recordarme</span>
							</Switch>
						</div>
						*/}

						<button className="flex flex-row py-2.5 w-full justify-center items-center rounded-lg bg-orange-500 transform active:translate-y-0.5 transition-all duration-50 text-white text-sm">
							Iniciar sesión
						</button>

						<div className="relative flex flex-col justify-start items-center">
							<p className="text-sm text-gray-400 font-medium">¿Aún no eres miembro?</p>
							<Link href="/signup">
								<a className="text-sm text-orange-500 font-medium">Crear cuenta</a>
							</Link>
						</div>

					</form>
				</div>

			</div>
		</>
	)
}

export default Login