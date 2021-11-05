import React, { useState } from 'react'
import { Listbox } from '@headlessui/react'
import log from '../utils/log.js'
import url from '../utils/server.js'

const Modificar = ({ 
	tags,
	entity
 }) => {

	const roles = [
		{id: 1, name: 'Shop'},
		{id: 2, name: 'User'},
	]

	var [selectedRole, setSelectedRole] = useState(roles[0])

	function SelectedUser(props) {
		return (
			<>
				<div className="space-y-4 items-center font-medium">
					<div>
						<label className="text-gray-800">Nombre: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="name" name="name" placeholder=" Nombre"/>
					</div>
					<div>
						<label className="text-gray-800">Apellidos: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="surname" name="surname" placeholder=" Apellidos"/>
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
						<label className="text-gray-800">Razón social: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="name" name="name" placeholder=" Razón social"/>
					</div>
				</div>
			</>
		)
	}

	function RoleSelection(props) {
		const isUser = props.isUser
		if (isUser) {
			return <SelectedUser />
		} 
		return <SelectedShop />
	}

	function getSelected(){
		var array = []
		var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

		for(var i = 0; i < checkboxes.length; i++){
			array.push(checkboxes[i].value)
		}
		log(array)

		return array
	}


	const handleSubmit = async event=> {
		event.preventDefault()	
		var valor = selectedRole.id
		var x = parseInt(valor)
		alert(x)
		if (isNaN(x) || (typeof valor) === 'undefined'){
			alert('errrror')
		}
		const res = await fetch(
			`${url}/api/updateEntity`,{
				body: JSON.stringify({
					//id_entity: pasarlaaaaaaaa
					id_role: selectedRole.id,
					phone: event.target.phone.value,
					//deleted: 
					nick: event.target.nick.value,
					name: event.target.name.value,
					surname: event.target.surname.value,
					description: event.target.description.value,
					mail: event.target.mail.value,
					pass: event.target.pass.value,
					avatar: event.target.direction.value,
					tags_ent: getSelected(),
					codPos: event.target.codPos.value,
					latitude: event.target.latitude.value,
					longitude: event.target.longitude.value,
					location: event.target.location.value,
					direction: event.target.direction.value
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			})
			.then(response => response.text())
			.then(body=>{alert(body)})

	}

	return (
		<>
			<div className="w-full h-screen flex flex-col space-y-12 py-24 items-center font-medium">
        
				<h1 className="text-4xl">Modificar entidad</h1>

				<form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
					<div>
						<div><label className="text-gray-800">Rol: </label></div>
						<Listbox value={selectedRole} onChange={setSelectedRole}>
							<Listbox.Button >{selectedRole.name}</Listbox.Button>
							<Listbox.Options className="text-gray-800">
								{roles.map((role) => (
									<Listbox.Option
										key={role.id}
										value={role}
									>
										{role.name}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Listbox>
					</div>
					<div>
						<label className="text-gray-800">Nick: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="nick" name="nick" placeholder=" Nick"/>
					</div>
					{/*PARTE USER
					<div>
						<label className="text-gray-800">Nombre: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="name" name="name" placeholder=" Nombre"/>
					</div>
					<div>
						<label className="text-gray-800">Apellidos: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="surname" name="surname" placeholder=" Apellidos"/>
					</div>*/}
					
					<div>
						<RoleSelection isUser={selectedRole.name==="User"} />
					</div>

					{/*///////////Parte para "Shop"
					<div>
						<label className="text-gray-800">Razón social: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="name" name="name" placeholder=" Razón social"/>
					</div>
					//////////Fin */}

					<div>
						<div><label className="text-gray-800">Descripción: </label></div>
						<textarea className="resize-y rounded-lg border border-gray-600 focus:border-gray-600"id="description" name="description" placeholder=" Descripción"/>
					</div>
					<div>
						<label className="text-gray-800">Email: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="mail" name="mail" placeholder=" Email"/>
					</div>
					<div>
						<label className="text-gray-800">Teléfono: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="phone" name="phone" placeholder=" Teléfono"/>
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
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="codPos" name="codPos" placeholder=" Código Postal"/>
					</div>
					<div>
						<label className="text-gray-800">Localidad: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="location" name="location" placeholder=" Localidad"/>
					</div>
					<div>
						<label className="text-gray-800">Provincia: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="province" name="province" placeholder=" Provincia"/>
					</div>
					<div>
						<label className="text-gray-800">Dirección: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="direction" name="direction" placeholder=" Dirección"/>
					</div>
					<div>
						<label className="text-gray-800">Latitud: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="latitude" name="latitude" placeholder=" Latitud"/>
					</div>
					<div>
						<label className="text-gray-800">Longitud: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="longitude" name="longitude" placeholder=" Longitude"/>
					</div>
					<div>
						<label className="text-gray-800">Contraseña: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="pass" name="pass" placeholder=" Contraseña"/>
					</div>
					<div>
						<label className="text-gray-800">Repita Su Contraseña: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="passBis" name="passBis" placeholder=" Contraseña"/>
					</div>
					<div>
						<label className="text-gray-800">Fotaca: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="avatar" name="avatar" placeholder=" URL Foto"/>
					</div>
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