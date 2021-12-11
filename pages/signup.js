import React, { useState } from 'react'
import Navbar from '../components/navbar'
import log from '../utils/log.js'
import url from '../utils/server.js'
import { useRouter } from 'next/router'
import Link from 'next/link'

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
	const [cpValue, setCP] = useState('')
	const [locationValue, setLocation] = useState('')
	const [directionValue, setDirection] = useState('')
	const [latitudeValue, setLatitude] = useState('')
	const [longitudeValue, setLongitude] = useState('')
	const [passwordValue, setPassword] = useState('')
	const [passbiValue, setPassbi] = useState('')
	const [photoValue, setPhoto] = useState('')
	const [pswVisible, setPswVisible] = useState(false)
	const [signUpPage, setSignUpPage] = useState(1)

	function RoleSelection(props) {
		if (selectedRole === '2') {
			return(
				<>
					<div className="space-y-4 items-center font-medium">
						<div>
							<label className="text-gray-800">Nombre: </label>
							<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="name" name="name" placeholder=" Nombre" 
								value = {nameValue}
								onChange = { (e) => setName(e.target.value)} 
								required
								key="user1"/>
						</div>
						<div>
							<label className="text-gray-800">Apellidos: </label>
							<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="surname" name="surname" placeholder=" Apellidos" 
								value = {surnameValue}
								onChange = { (e) => setSurname(e.target.value)} 
								key="user2"/>
						</div>
					</div>
				</>
			)
		} 
		return(
			<>
				<div className="space-y-4 items-center font-medium"key='shop1'>
					<div>
						<label className="text-gray-800">Nombre: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="name" name="name" placeholder=" Razón social"
							value = {nameValue}
							onChange = { (e) => setName(e.target.value)} 
							required
							key="shop1"/>
					</div>
				</div>
			</>
		)
	}

	function ShowPassword(props) {
		if(!pswVisible){
			return(
				<>
					<div className="space-y-4 items-center font-medium">
						<div>
							<label className="text-gray-800">Contraseña: </label>
							<input 
								className="rounded-lg border border-gray-600 focus:border-gray-600"
								type="password" 
								id="pass" 
								name="pass" 
								placeholder=" Contraseña"
								value = {passwordValue}
								onChange = { (e) => setPassword(e.target.value)}/>
						</div>
						<div>
							<label className="text-gray-800">Repita Su Contraseña: </label>
							<input 
								className="rounded-lg border border-gray-600 focus:border-gray-600"
								type="password" 
								id="passRepe" 
								name="passRepe" 
								placeholder=" Repita su contraseña"
								value = {passbiValue}
								onChange = { (e) => setPassbi(e.target.value)}/>
						</div>
					</div>
				</>
			)
		} else if(pswVisible) {
			return(
				<>
					<div className="space-y-4 items-center font-medium">
						<div>						
							<label className="text-gray-800">Contraseña: </label>
							<input 
								className="rounded-lg border border-gray-600 focus:border-gray-600"
								type="text" 
								placeholder=" Contraseña"
								value = {passwordValue}
								onChange = { (e) => setPassword(e.target.value)}/>
						</div>
						<div>
							<label className="text-gray-800">Repita Su Contraseña: </label>
							<input 
								className="rounded-lg border border-gray-600 focus:border-gray-600"
								type="text" 
								placeholder=" Repita su contraseña"
								value = {passbiValue}
								onChange = { (e) => setPassbi(e.target.value)}/>
						</div>
					</div>
				</>
			)
		}
		
	}

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
			.then(response => {
				if (response.ok)
					return response.json()})
		
		if(ses) {
			alert('Nick en uso')
			return false
		}
		
		if(!/^\d+$/.test(phoneValue)) {
			alert('No puede haber letras en su número de teléfono')
			return false
		}
		if(phoneValue.trim().length!==9) {
			alert('Su número de teléfono debe tener 9 cifras')
			return false
		} 
		if(!/^\d+$/.test(cpValue)) {
			alert('No puede haber letras en su Código Postal')
			return false
		}
		if(cpValue.trim().length!==5) {
			alert('Su código postal debe tener 5 cifras')
			return false
		}
		if(!/^\d+$/.test(latitudeValue) || !/^\d+$/.test(longitudeValue)) {
			alert('No puede haber letras en los campos de latitud y longitud')
			return false
		}
		if(passwordValue.localeCompare(passbiValue)!==0) {
			alert('Las contraseñas no coiniciden, vuelva a intentarlo')
			return false
		}
		var tags = getSelectedTags()
		if(tags==='') {
			alert('Debe seleccionar al menos una etiqueta')
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
			})
			.then(response => {
				if (response.ok)
					return response.json()})
		if(!isNaN(res)) {
			router.push('/')
		}
			
	}

	const handleCancel = async event =>{
		router.push('/')
	}

	function showPSW() {
		var x = document.getElementById('pass')
		if(x.type === 'password') {
			x.type = 'text'
		} else {
			x.type = 'password'
		}
		
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
										? 'Datos personales'
										: (signUpPage === 2)
											? 'Perfil'
											: (signUpPage === 3)
												? 'Seguridad'
												: ''}
								</p>
							</div>

							<div className="flex flex-col justify-between space-y-4">
								
								{(signUpPage === 1) && pageOne()}
								{(signUpPage === 2) && pageOne()}
								{(signUpPage === 3) && pageOne()}

								{/*Botones atrás y siguiente */}
								<div className="flex flex-row justify-between space-x-4 items-center">
									<button
										type="button"
										className="btn-terciary w-full"
										onClick={()=> (signUpPage === 1) ? handleCancel() : previusPage()}
									>
										{(signUpPage === 1) ? 'Cancelar' : 'Atrás'}
									</button>
									<button 
										type="button"
										className="btn-primary w-full"
										onClick={()=> (signUpPage === 3) ? handleSubmit() : nextPage()}
									>
										{(signUpPage === 3) ? 'Crear cuenta' : 'Siguiente'}
									</button>
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
