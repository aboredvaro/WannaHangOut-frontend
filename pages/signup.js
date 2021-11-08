import React, { useState } from 'react'
import { Listbox } from '@headlessui/react'
import log from '../utils/log.js'
import url from '../utils/server.js'


const Signup = ({ 
	tags
 }) => {

	function getSelectedTags(){
		var array = []
		var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

		for(var i = 0; i < checkboxes.length; i++){
			array.push(checkboxes[i].value)
		}
		log(array)

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
								id="pass" 
								name="pass" 
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
		
		var seguir = false

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
		
		console.log(ses)
		if(ses) {
			alert("Nick en uso")
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
			.then(response => console.log(response))
			
	}

	function showPSW() {
		var x = document.getElementById('pass')
		if(x.type === 'password') {
			x.type = 'text'
		} else {
			x.type = 'password'
		}
		
	}

	return (
		<>
			<div className="w-full h-screen flex flex-col space-y-12 py-24 items-center font-medium">
        
				<h1 className="text-4xl">Página de registro</h1>

				<form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
					<div>
						<label className="text-gray-800">Rol: </label>
						<select
							value = {selectedRole}
							onChange = { (e) => setSelectedRole(e.target.value)}
						>
							<option value='1'>Shop</option>
							<option value='2'>User</option>
						</select>
						{/*}<p>{selectedRole}</p>{*/}
					</div>
					<div>
						<label className="text-gray-800">Nick: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="nick" name="nick" placeholder=" Nick"
							value = {nickValue}
							onChange = { (e) => setNick(e.target.value)} 
							required/>
					</div>
					
					<div>
						{RoleSelection() }
					</div>

					<div>
						<div><label className="text-gray-800">Descripción: </label></div>
						<textarea className="resize-y rounded-lg border border-gray-600 focus:border-gray-600"id="description" name="description" placeholder=" Descripción"
							value = {descriptionValue}
							onChange = { (e) => setDescription(e.target.value)}/>
					</div>
					<div>
						<label className="text-gray-800">Email: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="mail" name="mail" placeholder=" Email"
							value = {emailValue}
							onChange = { (e) => setEmail(e.target.value)}/>
					</div>
					<div>
						<label className="text-gray-800">Teléfono: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="phone" name="phone" placeholder=" Teléfono"
							value = {phoneValue}
							onChange = { (e) => setPhone(e.target.value)}/>
					</div>
					<div>
						<label >Choose tags: </label>
						{
							tags.map(({id_tags,name}, i) =>
								<div className="w-full sm:w-auto" key={i}>
									<label className="inline-flex items-center">
							  		<input className="form-radio" type="checkbox" id="tags_act" name="tags_act" value={id_tags}/>
							  		<span className="ml-2">{name}</span>
									</label>
						 		 </div>
							)
						}
					</div>
					<div>
						<label className="text-gray-800">Código Postal: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="codPos" name="codPos" placeholder=" Código Postal"
							value = {cpValue}
							onChange = { (e) => setCP(e.target.value)}/>
					</div>
					<div>
						<label className="text-gray-800">Localidad: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="location" name="location" placeholder=" Localidad"
							value = {locationValue}
							onChange = { (e) => setLocation(e.target.value)}/>
					</div>
					<div>
						<label className="text-gray-800">Dirección: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="direction" name="direction" placeholder=" Dirección"
							value = {directionValue}
							onChange = { (e) => setDirection(e.target.value)}/>
					</div>
					<div>
						<label classirection="text-gray-800">Latitud: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="latitude" name="latitude" placeholder=" Latitud"
							value = {latitudeValue}
							onChange = { (e) => setLatitude(e.target.value)}/>
					</div>
					<div>
						<label className="text-gray-800">Longitud: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="longitude" name="longitude" placeholder=" Longitude"
							value = {longitudeValue}
							onChange = { (e) => setLongitude(e.target.value)}/>
					</div>
					<div>
						{ShowPassword ()}
					</div>
					<div>
						<input type="checkbox" 
						value={pswVisible}
						onChange = {() => setPswVisible(!pswVisible) } /> Mostrar contraseña
					</div>
					<div>
						<label className="text-gray-800">Foto: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="avatar" name="avatar" placeholder=" URL Foto"
							value = {photoValue}
							onChange = { (e) => setPhoto(e.target.value)}/>
					</div>
					<img className="object-cover w-16 h-16 mr-2 rounded-full" src={photoValue} alt="Foto Perfil"/>
					<button type="submit" className="rounded-full border-2 border-orange-500 hover:border-orange-500">Crear</button>		
				</form>

			</div>
		</>
	    )
	}

	export async function getServerSideProps(){

		const res = await fetch(`${url}/api/getAllTags`)
			 .then(response => response.json())
		const tags = res
	
		return{
			props:{
				tags
			}
		}
	}


export default Signup