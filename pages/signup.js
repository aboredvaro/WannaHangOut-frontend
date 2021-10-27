import React, { useState } from 'react'
import { Listbox } from '@headlessui/react'

const Signup = (props) => {

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
						<Listbox value={selectedRole} onChange={setSelectedRole}>
							<Listbox.Button>{selectedRole.name}</Listbox.Button>
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
						<label className="text-gray-800">Descripción: </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600 box-content h-32"type="text" id="description" name="description" placeholder=" Descripción"/>
					</div>
					<button type="submit" className="rounded-full border-2 border-orange-500 hover:border-orange-500">Create</button>		
				</form>

			</div>
		</>
	)
}

export default Signup