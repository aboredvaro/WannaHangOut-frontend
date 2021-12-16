import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import log from '../utils/log.js'
import url from '../utils/server.js'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { PersonOutline, CheckmarkCircle, HelpCircleOutline, CloseCircle } from 'react-ionicons'
const Signup = ({ tags }) => {

	const router = useRouter()

	function getSelectedTags(){
		var array = []
		var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

		for(var i = 0; i < checkboxes.length; i++){
			array.push(checkboxes[i].value)
		}
		//log(array)

		return array.length>0?array:''
	}

	const [nameValue, setName] = useState('')
	const [emailValue, setEmail] = useState('')
	const [passwordValue, setPassword] = useState('')
	const [passbiValue, setPassbi] = useState('')
	const [signUpPage, setSignUpPage] = useState(1)
	const [checkPsw, setCheckPsw] = useState('')
	const [barritas, setBarritas] = useState(0)
	const [match, setMatch] = useState(false)

	const handleSubmit = async event => {
		event.preventDefault()

		if(!match || barritas !== 5) return false

		const res = await fetch(
			`${url}/api/createNewEntity`,{
				body: JSON.stringify({		
					id_role: 2,
					name: nameValue,
					mail: emailValue,
					pass: passwordValue
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			}
		).then(response => {
			if (response.ok) return response.json()
		})

		if(!isNaN(res)) {
			router.push('/')
		}

		/*const ses = await fetch(`${url}/api/existNick`, {
			body: JSON.stringify({
				nick: nickValue
			}),
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST'
		}).then(response => { if (response.ok) return response.json() })
		
		if(ses) {
			alert('Nick en uso')
			return false
		}
		
		const res = await fetch(
			`${url}/api/createNewEntity`,{
				body: JSON.stringify({	
					id_role: selectedRole,
					phone: phoneValue,
					nick: nickValue,
					name: nameValue,
					surname: selectedRole==='1'?'':surnameValue,
					description: descriptionValue,
					mail: emailValue,
					pass: passwordValue,
					avatar: photoValue,
					tags_ent: tags,
					codPos: cpValue,
					latitude: latitudeValue,
					longitude: longitudeValue,
					location: locationValue,
					direction: directionValue
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			}
		).then(response => {
			if (response.ok) return response.json()
		})

		if(!isNaN(res)) {
			router.push('/')
		}*/
	}

	/*
		1. Una minúscula
		2. Una mayúscula
		3. Un número
		4. Un símbolo
		5. 8 caracteres
	*/
	const handlePsw = (psw) => {
		setCheckPsw('')
		var cont = 0
		if(psw === '') {
			setPassword(psw)
			setBarritas(0)
			return false
		}
		if(!(psw.length >= 8)){
			setCheckPsw('Debe contener al menos 8 carácteres')
		} else cont = cont + 1
		if(!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(psw)){
			setCheckPsw('Usa mínimo un símbolo')
		} else cont = cont + 1
		if(!/\d/.test(psw)) {
			setCheckPsw('Usa mínimo un número')
		} else cont = cont + 1
		if(!/[A-Z]/.test(psw)) {
			setCheckPsw('Usa mínimo una mayúscula')
		} else cont = cont + 1
		if(!/[a-z]/.test(psw)) {
			setCheckPsw('Usa mínimo una minúscula')
		} else cont = cont + 1

		setBarritas(cont)

		if(cont === 5) {
			setCheckPsw('Contraseña segura, ¡bien hecho!')
		}

		setPassword(psw)
	}

	const handlePswBi = (pswBi) => {
		setMatch(false)
		if(pswBi === '') {
			setPassbi(pswBi)
			return false
		} 

		(passwordValue === pswBi) ? setMatch(true) : null
		setPassbi(pswBi)
	}

	const handleCancel = async event => {
		router.push('/')
	}

	const previusPage = () => {
		setSignUpPage(signUpPage - 1)
	}

	const nextPage = () => {
		if(/\d/.test(nameValue) && !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(emailValue)) {
			alert('El nombre no puede contener números \nEl email introducido no es válido')
		}else if(/\d/.test(nameValue)) {
			alert('El nombre no puede contener números')
		}
		else if(!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(emailValue)) {
			alert('El email introducido no es válido')
		}
		else { 
			/*var hash = sha(emailValue)
			const ses = await fetch(`${url}/api/getEntityByHash?entityHash=${hash}`)
				.then(response => {
					if (response.ok)
						return response.json()})
			
			//console.log(ses)

			//if(ses === -1) {*/
			setSignUpPage(signUpPage + 1)
			//} else alert('Correo en uso')
		}
	}

	function tickVerde() {
		if(barritas === 5) {
			return(
				<>
					<CheckmarkCircle
						color={'#4CAF50'} 
						title={'Tick'}
						height="16px"
						width="16px"
					/>
				</>
			)
		} else return (<></>)
	}

	function twoPswMatch() {
		if(match){
			return(
				<>
					{/*Contraseñas coinciden! Viva! */}
					{((passbiValue !== '') && (barritas === 5)) && <div className='flex fle-row justify-start space-x-1'>
						<CheckmarkCircle
							color={'#4CAF50'} 
							title={'Tick'}
							height="16px"
							width="16px"
						/>
						<p className="text-xs">Las contraseñas coinciden</p>
					</div>}
				</>
			)
		} else if(!match) {
			return(
				<>
					{/*Fallo! :( */}
					{((passbiValue !== '') && (barritas === 5)) && <div className='flex fle-row justify-start space-x-1'>
						<CloseCircle
							color={'#F44336'}
							title={'Bad password'}
							height="16px"
							width="16px"
						/>
						<p className="text-xs">¡Las contraseñas no coinciden!</p>
					</div>}
				</>
			)
		}
	}

	function pageOne() {
		return(
			<>
				{/*Nombre */}
				<div className="flex flex-col space-y-1">
					<div className='flex flex-row justify-start space-x-0.5'>
						<p className='text-sm text-red-500 font-semibold'>*</p>
						<p className="text-sm font-medium">Nombre</p>
					</div>
					<input
						className="input w-full"
						value = {nameValue}
						onChange = { (e) => setName(e.target.value)} 
						required
						autoFocus
					/>
				</div>
					
				{/*Correo */}
				<div className="flex flex-col space-y-1">
					<div className='flex flex-row justify-start space-x-0.5'>
						<p className='text-sm text-red-500 font-semibold'>*</p>
						<p className="text-sm font-medium">Correo</p>
					</div>
					<input
						className="input w-full"
						value = {emailValue}
						onChange = { (e) => setEmail(e.target.value)}
						required
					/>
				</div>
			</>
		)
	}

	function pageTwo() {
		return(
			<>
				{/*Contraseña */}
				<div className="flex flex-col space-y-1">
					<div className='flex flex-row justify-start space-y-0.5'>
						<p className='text-sm text-red-500 font-semibold'>*</p>
						<p className="text-sm font-medium">Contraseña</p>
					</div>
					<input
						className="input w-full"
						type='password'
						value = {passwordValue}
						onChange = { (e) => {
							handlePsw(e.target.value)
						}}
						required
						autoFocus
					/>
				</div>

				{/*Indicadores y alertas */}
				{<div className="flex flex-col space-y-1">
					{/*Barritas */}
					<div className='flex flex-row justify-center space-x-0.5'>
						<div className={(barritas > 0) ? 'w-18.4 h-1 rounded-l-full shadow-card bg-green-500' : 'w-18.4 h-1 rounded-l-full shadow-card bg-gray-300'} />
						<div className={(barritas > 1) ? 'w-18.4 h-1 shadow-card bg-green-500' : 'w-18.4 h-1 shadow-card bg-gray-300'} />
						<div className={(barritas > 2) ? 'w-18.4 h-1 shadow-card bg-green-500' : 'w-18.4 h-1 shadow-card bg-gray-300'} />
						<div className={(barritas > 3) ? 'w-18.4 h-1 shadow-card bg-green-500' : 'w-18.4 h-1 shadow-card bg-gray-300'} />
						<div className={(barritas > 4) ? 'w-18.4 h-1 rounded-r-full shadow-card bg-green-500' : 'w-18.4 h-1 rounded-r-full shadow-card bg-gray-300'} />
					</div>
					{/*Alerta + (?) */}
					<div className='flex flex-row justify-between'>
						<div className='flex fle-row justify-start space-x-1'>
							{tickVerde()}
							<p className="text-xs text-gray-700">{checkPsw}</p>
						</div>
						<HelpCircleOutline
							color={'#616161'}
							title={'ha?'}
							height="16px"
							width="16px"
						/>
					</div>
				</div>}

				{/*Repetir contraseña */}
				<div className="flex flex-col space-y-1">
					<div className='flex flex-row justify-start space-y-0.5'>
						<p className='text-sm text-red-500 font-semibold'>*</p>
						<p className="text-sm font-medium">Repetir contraseña</p>
					</div>
					<input
						className="input w-full"
						type='password'
						value = {passbiValue}
						onChange = { (e) => {handlePswBi(e.target.value)}}
						required
						autoFocus
					/>

					{twoPswMatch()}
				</div>
			</>
		)
	}

	return (
		<>
			<div className='flex-col w-full min-h-screen  bg-gray-50'>
				<Navbar />

				<div className='flex flex-col w-full h-full items-center justify-center py-20'>

					{/*Caja blanca */}
					<form
						onSubmit={handleSubmit}
						className="flex flex-col w-110 p-8 rounded-xl shadow-card bg-white border border-gray-100 space-y-4"
					>
						<div className="flex flex-col justify-between space-y-10">
							{/*N. pagina*/}
							<div className="flex flex-col space-y-1">
								<p className="text-xs text-gray-400 font-medium">{signUpPage} de 2</p>
								<p className="text-2xl text-gray-600 font-medium">
									{(signUpPage === 1)
										? 'Datos personales' : (signUpPage === 2)
											? 'Seguridad' : ''
									}
								</p>
							</div>

							<div className="flex flex-col justify-between space-y-4">
								
								{(signUpPage === 1) && pageOne()}
								{(signUpPage === 2) && pageTwo()}

								{/*Botones atrás y siguiente */}
								<div className="flex flex-row justify-between space-x-4 items-center">
									<button
										type="button"
										className="btn-terciary w-full"
										onClick={()=> (signUpPage === 1) ? handleCancel() : previusPage()}
									>
										{(signUpPage === 1) ? 'Cancelar' : 'Atrás'}
									</button>
									{(signUpPage !== 2) && <button 
										type="button"
										className="btn-primary w-full"
										onClick={()=> nextPage()}
									>
										Siguiente
									</button>}
									{(signUpPage === 2) && <button 
										type="submit"
										className="btn-primary w-full"
									>
										Crear cuenta
									</button>}
								</div>
								<div className="relative flex flex-row justify-center space-x-2">
									<p className="text-sm text-gray-400">¿Ya eres miembro?</p>
									<Link href="/login">
										<a className="text-sm text-orange-500 font-medium">Iniciar sesión</a>
									</Link>
								</div>

							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	    )
}

export async function getServerSideProps() {

	const tags = await fetch(`${url}/api/getAllTags`)
		.then(response => response.json())
	
	return{
		props:{
			tags
		}
	}
}

export default Signup
