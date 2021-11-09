import React, { useState } from 'react'
import { Listbox } from '@headlessui/react'
import log from '../utils/log.js'
import url from '../utils/server.js'

const Modificar = ({ 
	tags,
	entity,
	address
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

	const [selectedRole, setSelectedRole] = useState(entity.id_role.toString())
	const [nickValue, setNick] = useState(entity.nick)
	const [nameValue, setName] = useState(entity.name)
	const [surnameValue, setSurname] = useState(entity.surname)
	const [descriptionValue, setDescription] = useState(entity.description)
	const [emailValue, setEmail] = useState(entity.mail)
	const [phoneValue, setPhone] = useState(entity.phone.toString())
	const [cpValue, setCP] = useState(address.codPos.toString())
	const [locationValue, setLocation] = useState(address.location)
	const [directionValue, setDirection] = useState(address.direction)
	const [latitudeValue, setLatitude] = useState(address.latitude.toString())
	const [longitudeValue, setLongitude] = useState(address.longitude.toString())
	const [passwordValue, setPassword] = useState(entity.pass)
	const [passbiValue, setPassbi] = useState(entity.pass)
	const [photoValue, setPhoto] = useState(entity.avatar)
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
						<label className="text-gray-800">Razón social: </label>
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
								placeholder=" Contraseña"
								value = {passwordValue}
								onChange = { (e) => setPassword(e.target.value)}
								required/>
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
								onChange = { (e) => setPassbi(e.target.value)}
								required/>
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
								onChange = { (e) => setPassword(e.target.value)}
								required/>
						</div>
						<div>
							<label className="text-gray-800">Repita Su Contraseña: </label>
							<input 
								className="rounded-lg border border-gray-600 focus:border-gray-600"
								type="text" 
								placeholder=" Repita su contraseña"
								value = {passbiValue}
								onChange = { (e) => setPassbi(e.target.value)}
								required/>
						</div>
					</div>
				</>
			)
		}
		
	}

	const handleSubmit = async event => {
		event.preventDefault()	

		if(!/^\d+$/.test(phoneValue)) {
			alert('No puede haber letras en su número de teléfono')
			return
		}
		if(phoneValue.trim().length!==9) {
			alert(typeof(phoneValue)+ 'Su número de teléfono debe tener 9 cifras')
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
		if(isNaN(latitudeValue) || isNaN(longitudeValue)) {
			alert('No puede haber letras en los campos de latitud y longitud')
			return
		}
		if(passwordValue.localeCompare(passbiValue)!==0) {
			alert('Las contraseñas no coiniciden, vuelva a intentarlo')
			return
		}
		var tags = getSelected()
		if(tags==='') {
			alert('Debe seleccionar al menos una etiqueta')
			return 
		}
		const res = await fetch(
			`${url}/api/updateEntity`,{
				body: JSON.stringify({	
					id_entity: entity.id_entity.toString(),
					id_role: selectedRole,
					deleted: entity.deleted,
					phone: phoneValue,
					nick: nickValue,
					name: nameValue,
					surname: selectedRole==='1'?'':surnameValue,
					description: descriptionValue,
					mail: emailValue,
					pass: passwordValue,
					avatar: photoValue,
					tags_ent: tags,
					id_address: address.id_address.toString(),
					codPos: cpValue,
					latitude: latitudeValue,
					longitude: longitudeValue,
					location: locationValue,
					direction: directionValue
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'PUT'
			})
			.then(response => console.log(response.text()))

	}

	const handleDeleteSubmit = async event => {
		event.preventDefault()	

		const res = await fetch(
			`${url}/api/deleteEntityById`,{
				body: JSON.stringify({	
					id_entity: entity.id_entity.toString()
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			})
			.then(response => console.log(response.text()))
	}

	return (
		<>
			<div className="w-full h-screen flex flex-col space-y-12 py-24 items-center font-medium">
        
				<h1 className="text-4xl">Modifique su cuenta</h1>

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
					<button type="submit" className="rounded-full border-2 border-orange-500 hover:border-orange-500">Modificar</button>		
				</form>

				<h1 className="text-4xl">Darse de baja</h1>

				<form className="flex flex-col space-y-4" onSubmit={handleDeleteSubmit}>
					
					<button type="submit" className="rounded-full border-2 border-orange-500 hover:border-orange-500">Darse de baja</button>		
				</form>

			</div>
		</>
	    )
	}

	export async function getServerSideProps(ctx) {

		const { id } = ctx.query

		const res = await fetch(`${url}/api/getEntityByID?id_entity=${id}`)
			.then(response => response.json())
		const entity = res

		const res1 = await fetch(`${url}/api/getAllTags`)
		    .then(response => response.json())
		const tags = res1

		const res2 = await fetch(`${url}/api/getAddressByID?id_address=${entity.id_address}`)
			.then(response => response.json())
		const address = res2

		return{
			props:{
				tags,
				entity,
				address
			}
		}
		 
	}

export default Modificar