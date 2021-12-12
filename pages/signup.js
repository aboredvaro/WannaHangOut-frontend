import React, { useState } from 'react'
import Navbar from '../components/navbar'
import log from '../utils/log.js'
import url from '../utils/server.js'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { PersonOutline, CheckmarkCircle, HelpCircleOutline } from 'react-ionicons'
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

	const [selectedRole, setSelectedRole] = useState('2')
	const [nickValue, setNick] = useState('')
	const [nameValue, setName] = useState('')
	const [surnameValue, setSurname] = useState('')
	const [descriptionValue, setDescription] = useState('')
	const [emailValue, setEmail] = useState('')
	const [phoneValue, setPhone] = useState('')
	const [passwordValue, setPassword] = useState('')
	const [passbiValue, setPassbi] = useState('')
	const [photoValue, setPhoto] = useState('')
	const [pswVisible, setPswVisible] = useState(false)
	const [signUpPage, setSignUpPage] = useState(1)

	const handleSubmit = async event => {
		event.preventDefault()

		const ses = await fetch(`${url}/api/existNick`, {
			body: JSON.stringify({
				nick: nickValue
			}),
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST'
		})
			.then(response => { if (response.ok) return response.json() })
		
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
			if (response.ok)
				return response.json()
			}
		)

		if(!isNaN(res)) {
			router.push('/')
		}
	}

	const handleCancel = async event =>{
		router.push('/')
	}

	const previusPage = () => {
		setSignUpPage(signUpPage - 1)
	}

	const nextPage = () => {
		setSignUpPage(signUpPage + 1)
	}

	function pageOne() {
		return(
			<>
				{/*Nombre y apellido */}
				<div className="flex flex-row justify-between space-x-4 items-center">
					<div className="flex flex-col space-y-1">
						<p className="text-sm">Nombre</p>
						<input
							className="input w-full"
							value = {nameValue}
							onChange = { (e) => setName(e.target.value)} 
							required
							autoFocus
						/>
					</div>
					<div className="flex flex-col space-y-1">
						<p className="text-sm">Apellido</p>
						<input
							className="input w-full"
							value = {surnameValue}
							onChange = { (e) => setSurname(e.target.value)}
							required
							autoFocus
						/>
					</div>
				</div>

				{/*Correo */}
				<div className="flex flex-col space-y-1">
						<p className="text-sm">Correo</p>
						<input
							className="input w-full"
							value = {emailValue}
							onChange = { (e) => setEmail(e.target.value)}
							required
							autoFocus
						/>
				</div>

				{/*Telf */}
				<div className="flex flex-col space-y-1">
						<p className="text-sm">Teléfono</p>
						<input
							className="input w-full"
							value = {phoneValue}
							onChange = { (e) => setPhone(e.target.value)}
							required
							autoFocus
						/>
				</div>
			</>
		)
	}

	function pageTwo() {
		return(
			<>
				{/*Foto de perfil */}
				<div className="flex flex-row justify-center">
					<div className="h-28 w-28 flex flex-row justify-center items-center bg-gray-100 rounded-full">
						{/*<PersonOutline 
							color={'#BDBDBD'} 
							title={'defaultUserImg'}
							height="40px"
							width="40px"
						/>*/}
						<img 
							className="object-cover h-28 w-28 flex flex-row justify-center items-center bg-gray-100 rounded-full" 
							src={photoValue} alt={''} 
						/>
					</div>
				</div>
				<div className="flex flex-col space-y-1">
					<p className="text-sm">URL de imagen</p>
					<div className="flex flex-row space-x-2">
						<input
							className="input w-full"
							value = {photoValue}
							onChange = { (e) => setPhoto(e.target.value)}
							required
							autoFocus
						/>
						<button 
							type="button"
							className="btn-terciary w-24"
							onClick={()=> setPhoto('')}
						>
							Borrar
						</button>
					</div>
				</div>
				{/*Nick */}
				<div className="flex flex-col space-y-1">
						<p className="text-sm">Nick</p>
						<input
							className="input w-full"
							value = {nickValue}
							onChange = { (e) => setNick(e.target.value)}
							required
							autoFocus
						/>
				</div>
			</>
		)
	}

	function pageThree() {
		return(
			<>
				{/*Contraseña */}
				<div className="flex flex-col space-y-1">
					<p className="text-sm">Contraseña</p>
					<input
						className="input w-full"
						value = {passwordValue}
						onChange = { (e) => setPassword(e.target.value)}
						required
						autoFocus
					/>
				</div>

				{/*Indicadores y alertas */}
				<div className="flex flex-col space-y-1">
					{/*Barritas */}
					<div className='flex flex-row justify-center space-x-0.5'>
						<div className='w-18.4 h-1 rounded-l-full shadow-card bg-gray-300'/>
						<div className='w-18.4 h-1 shadow-card bg-gray-300'/>
						<div className='w-18.4 h-1 shadow-card bg-gray-300'/>
						<div className='w-18.4 h-1 shadow-card bg-gray-300'/>
						<div className='w-18.4 h-1 rounded-r-full shadow-card bg-gray-300'/>
					</div>
					{/*Alerta + (?) */}
					<div className='flex flex-row justify-between'>
						<p className="text-xs text-gray-700">Usa mínimo una minúscula</p>
						<HelpCircleOutline
						color={'#616161'}
							title={'ha?'}
							height="16px"
							width="16px"
						/>
					</div>
				</div>

				{/*Repetir contraseña */}
				<div className="flex flex-col space-y-1">
					<p className="text-sm">Repetir contraseña</p>
					<input
						className="input w-full"
						value = {passbiValue}
						onChange = { (e) => setPassbi(e.target.value)}
						required
						autoFocus
					/>

					{/*Contraseñas coinciden! Viva! */}
					<div className='flex fle-row justify-start space-x-1'>
						<CheckmarkCircle
							color={'#4CAF50'} 
							title={'Tick'}
							height="16px"
							width="16px"
						/>
						<p className="text-xs">Las contraseñas coinciden</p>
					</div>
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
								<p className="text-xs text-gray-400">{signUpPage} de 3</p>
								<p className="text-2xl text-gray-600">
									{(signUpPage === 1)
										? 'Datos personales' : (signUpPage === 2)
											? 'Perfil' : (signUpPage === 3)
												? 'Seguridad' : ''
									}
								</p>
							</div>

							<div className="flex flex-col justify-between space-y-4">
								
								{(signUpPage === 1) && pageOne()}
								{(signUpPage === 2) && pageTwo()}
								{(signUpPage === 3) && pageThree()}

								{/*Botones atrás y siguiente */}
								<div className="flex flex-row justify-between space-x-4 items-center">
									<button
										type="button"
										className="btn-terciary w-full"
										onClick={()=> (signUpPage === 1) ? handleCancel() : previusPage()}
									>
										{(signUpPage === 1) ? 'Cancelar' : 'Atrás'}
									</button>
									{(signUpPage !== 3) && <button 
										type="button"
										className="btn-primary w-full"
										onClick={()=> nextPage()}
									>
										Siguiente
									</button>}
									{(signUpPage === 3) && <button 
										type="submit"
										className="btn-primary w-full"
									>
										Crear cuenta
									</button>}
								</div>
								<div className="relative flex flex-row justify-center space-x-2">
									<p className="text-sm text-gray-400 font-medium">¿Ya eres miembro?</p>
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
