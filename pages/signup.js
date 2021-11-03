import React, { useState } from 'react'
import { Listbox } from '@headlessui/react'
import log from '../utils/log.js'
import url from '../utils/server.js'


const Signup = ({ 
	tags
 }) => {
	//#region Selección User/Shop
	const roles = [
		{id: 1, name: 'Shop'},
		{id: 2, name: 'User'},
	]

	const [selectedRole, setSelectedRole] = useState(roles[0])

	function RoleSelection(props) {
		const isUser = props.isUser
		if (isUser) {
			return <SelectedUser />
		}
		return <SelectedShop />
	}

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
	//#endregion

	function getSelectedTags(){
		var array = []
		var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

		for(var i = 0; i < checkboxes.length; i++){
			array.push(checkboxes[i].value)
		}
		log(array)

		return array
	}

	function getSelectedRole(){
		if(selectedRole==="User") return 2
		return 1
	}

	const handleSubmit = async event=> {
		event.preventDefault()	

		const res = await fetch(
			`${url}/api/createNewEntity`,{
				body: JSON.stringify({	
					id_role: getSelectedRole(),
					nick: event.target.nick.value,
					name: event.target.name.value,
					//surname: event.target.surname.value,
					description: event.target.description.value,
					mail: event.target.mail.value,
					phone: event.target.phone.value,
					//pass: NO HAY CAMPO PARA CONTRASEÑAÑAÑÑAÑAÑÑAÑAÑÑAÑAÑAÑÑAÑAÑÑA
					//preguntar cómo pasar la contraseña a la base de datos
					//AVATAR
					
					codPos: event.target.codPos.value,
					location: event.target.location.value,
					direction: event.target.direction.value,
					latitude: event.target.latitude.value,
					longitud: event.target.longitude.value,
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			})
			.then(response => console.log(response))
			.then((result) => {
				console.log(result)
			})

	}


	return (
		<>
			<div className="w-full h-screen flex flex-col space-y-12 py-24 items-center font-medium">
        
				<h1 className="text-4xl">Página de registro</h1>

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
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="location" name="location" placeholder=" Localidad"/>
					</div>
					<div>
						<label className="text-gray-800">Dirección: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="direction" name="direction" placeholder=" Localidad"/>
					</div>
					<div>
						<label htmlFor="latitude">Latitude </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="latitude" name="latitude" placeholder="Latitude"/>
					</div>
					<div>
						<label htmlFor="longitude">Longitude </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="longitude" name="longitude" placeholder="Longitude"/>
					</div>
					<button type="submit" className="rounded-full border-2 border-orange-500 hover:border-orange-500">Create</button>		
				</form>

			</div>
		</>
	    )
	}

	export async function getServerSideProps() {
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