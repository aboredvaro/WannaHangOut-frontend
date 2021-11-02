import React, { useState } from 'react'
import { Listbox } from '@headlessui/react'
import log from '../utils/log.js'
import url from '../utils/server.js'


const Signup = ({ tags }) => {

	const roles = [
		{id: 1, name: 'Shop'},
		{id: 2, name: 'User'},
	]

	const [selectedRole, setSelectedRole] = useState(roles[0])

	const handleSubmit = async event=> {
		event.preventDefault()	

		const res = await fetch(
			`${url}/api/createNewEntity`,{
				body: JSON.stringify({	
					//title: event.target.title.value,
					id_rol: event.target.role.value,
					nick: event.target.nick.value,
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
						<Listbox value={selectedRole} onChange={setSelectedRole}>
							<Listbox.Button >{selectedRole.name}</Listbox.Button>
							<Listbox.Options>
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
					<div>
						<label className="text-gray-800">Nombre: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="name" name="name" placeholder=" Nombre"/>
					</div>
					<div>
						<label className="text-gray-800">Apellidos: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="surname" name="surname" placeholder=" Apellidos"/>
					</div>

					///////////Parte para "Shop"
					<div>
						<label className="text-gray-800">Razón social: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="name" name="name" placeholder=" Razón social"/>
					</div>
					//////////Fin 

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
					{/*<div>
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
					</div> */}
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
					<button type="submit" className="rounded-full border-2 border-orange-500 hover:border-orange-500">Create</button>		
				</form>

			</div>
		</>
	)
}

export default Signup