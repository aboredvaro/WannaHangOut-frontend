import React, { useState } from 'react'
import { Listbox } from '@headlessui/react'
import log from '../utils/log.js'
import url from '../utils/server.js'

const Modificar = ({ 
	tags,
	entity
 }) => {

	function getSelected(){
		var array = []
		var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

		for(var i = 0; i < checkboxes.length; i++){
			array.push(checkboxes[i].value)
		}
		log(array)

		return array.length>0?array:undefined
	}

	const [selectedRole, setSelectedRole] = useState(entity.id_role)
	const [nickValue, setNick] = useState(entity.nick)
	const [descriptionValue, setDescription] = useState(entity.description)
	const [emailValue, setEmail] = useState(entity.mail)
	const [phoneValue, setPhone] = useState(entity.phone)
	const [cpValue, setCP] = useState(entity.codPos)
	const [locationValue, setLocation] = useState(entity.location)
	const [directionValue, setDirection] = useState(entity.direction)
	const [latitudeValue, setLatitude] = useState(entity.latitude)
	const [longitudeValue, setLongitude] = useState(entity.longitude)
	const [passwordValue, setPassword] = useState(entity.pass)
	const [passbiValue, setPassbi] = useState(entity.pass)
	const [photoValue, setPhoto] = useState(entity.avatar)

	function SelectedUser(props) {
		return (
			<>
				<div className="space-y-4 items-center font-medium">
					<div>
						<label className="text-gray-800">Nombre: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="name" name="name" placeholder=" Nombre" required/>
					</div>
					<div>
						<label className="text-gray-800">Apellidos: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="surname" name="surname" placeholder=" Apellidos" required/>
					</div>
				</div>
			</>
		)
	}

	function SelectedShop(props) {
		return(
			<>
				<div className="space-y-4 items-center font-medium">
				<div>
						<label className="text-gray-800">Nombre: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="name" name="name" placeholder=" Razón social"/>
					</div>
				</div>
			</>
		)
	}

	function RoleSelection(props) {
		if (selectedRole === '2') {
			return <SelectedUser />
		} 
		return <SelectedShop />
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
		.then(response => console.log(response.text()))
		if(!ses) {
			alert('El nick ' + nickValue + ' ya está en uso, pruebe otro')
		}
		
		if(!/^\d+$/.test(phoneValue)) {
			alert('No puede haber letras en su número de teléfono')
			return
		}
		if(phoneValue.trim().length!==9) {
			alert('Su número de teléfono debe tener 9 cifras')
			return
		} 
		if(!/^\d+$/.test(cpValue)) {
			alert('No puede haber letras en su Código Postal')
			return
		}
		if(cpValue.trim().length!==5) {
			alert('Su código postal debe tener 5 cifras')
			return
		}
		if(!/^\d+$/.test(latitudeValue) || !/^\d+$/.test(longitudeValue)) {
			alert('No puede haber letras en los campos de latitud y longitud')
			return
		}
		if(passwordValue.localeCompare(passbiValue)!==0) {
			alert('Las contraseñas no coiniciden, vuelva a intentarlo')
			return
		}
		const res = await fetch(
			`${url}/api/createNewEntity`,{
				body: JSON.stringify({	
					id_role: selectedRole,
					phone: phoneValue,
					nick: nickValue,
					name: event.target.name.value,
					surname: selectedRole==='1'?'':event.target.surname.value,
					description: descriptionValue,
					mail: emailValue,
					pass: passwordValue,
					avatar: photoValue,
					tags_ent: getSelected(),
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
						<RoleSelection/>
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
							id="passBis" 
							name="passBis" 
							placeholder=" Contraseña"
							value = {passbiValue}
							onChange = { (e) => setPassbi(e.target.value)}/>
					</div>
					<div>
						<label className="text-gray-800">Foto: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="avatar" name="avatar" placeholder=" URL Foto"
							value = {photoValue}
							onChange = { (e) => setPhoto(e.target.value)}/>
					</div>
					<img class="object-cover w-16 h-16 mr-2 rounded-full" src={photoValue} alt="Foto Perfil"/>
					<button type="submit" className="rounded-full border-2 border-orange-500 hover:border-orange-500">Create</button>		
				</form>

			</div>
		</>
	    )
	}

	export async function getServerSideProps(ctx) {

		const { id } = 1

		const res = await fetch(`${url}/api/getEntityByID?id_entity=${id}`)
		const ent= await res.json()
		const entity = ent[0]
		log(entity)

		const res1 = await fetch(`${url}/api/getAllTags`)
		    .then(response => response.json())
		const tags = res1

		return{
			props:{
				tags,
				entity
			}
		}
		 
	}

export default Modificar