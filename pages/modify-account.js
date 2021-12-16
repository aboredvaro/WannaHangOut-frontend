import React, { useState } from 'react'
import Navbar from '../components/navbar'
import log from '../utils/log.js'
import url from '../utils/server.js'
import { putImagesIntoCloudinary } from '../utils/cloudinary.js'

const Modificar = ({entity}) => {

	function getSelected(){
		var array = []
		var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

		for(var i = 0; i < checkboxes.length; i++){
			array.push(checkboxes[i].value)
		}
		log(array)

		return array.length>0?array:''
	}

	const [avatar, setAvatar] = useState(entity.avatar)
	const [nick, setNick] = useState(entity.nick)
	const [name, setName] = useState(entity.name)
	const [descp, setDescp] = useState(entity.description)
	const [email, setEmail] = useState(entity.mail)

	const handleSubmit = async event => {
		event.preventDefault()	

		var bodyFetch = {
			id_entity: entity.id_entity.toString(),
			id_role: selectedRole,
			phone: phoneValue,
			nick: nickValue,
			name: nameValue,
			surname: selectedRole==='1'?'':surnameValue,
			description: descriptionValue,
			mail: emailValue,
			avatar: photoValue,
			tags_ent: tags,
			codPos: cpValue,
			id_address: address.id_address.toString(),
			latitude: latitudeValue,
			longitude: longitudeValue,
			location: locationValue,
			direction: directionValue,
			deleted: 0
		}
		if(passwordValue !== '') {
			bodyFetch={...bodyFetch, pass: passwordValue}
		}

		const res = await fetch(
			`${url}/api/updateEntity`,{
				body: JSON.stringify(bodyFetch),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'PUT'
			})
			.then(response => console.log(response.text()))

	}

	const fileInput = document.getElementById("fileInput")
	fileInput.addEventListener("change", handleFiles, false)

	function handleFiles() {
		putImagesIntoCloudinary(URL.createObjectURL(this.files[0]), 'user')
		setAvatar(URL.createObjectURL(this.files[0]))
	}

	return (
		<>
			<Navbar />
			
			<div className='flex flex-col w-full h-full items-center justify-center py-20'>

					{/*Caja blanca */}
					<form
						onSubmit={handleSubmit}
						className="flex flex-col w-110 p-8 rounded-xl shadow-card bg-white border border-gray-100 space-y-4"
					>
						<div className="flex flex-col justify-between space-y-10">
							<div className='flex flex-row w-full justify-center'>
								<p className="text-2xl text-gray-600 font-medium">Modifique su cuenta</p>
							</div>

							<div className="flex flex-col justify-between space-y-4">

								{/**Foto perfil */}
								<div className='flex flex-col items-center'>
									<img className='object-cover w-28 h-28 rounded-full' src={avatar} />
								</div>

								<input type="file" id="fileInput" onChange={(e) => {setAvatar(e.target.value)}}/>

								{/*Nick */}
								<div className="flex flex-col space-y-1">
									<div className='flex flex-row justify-start space-x-0.5'>
										<p className='text-sm text-red-500 font-semibold'>*</p>
										<p className="text-sm font-medium">Nick</p>
									</div>
									<input
										className="input w-full"
										value = {nick}
										onChange = { (e) => setNick(e.target.value)}
										required
									/>
								</div>

								{/*Nombre */}
								<div className="flex flex-col space-y-1">
									<div className='flex flex-row justify-start space-x-0.5'>
										<p className='text-sm text-red-500 font-semibold'>*</p>
										<p className="text-sm font-medium">Nombre</p>
									</div>
									<input
										className="input w-full"
										value = {name}
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
											value = {email}
											onChange = { (e) => setEmail(e.target.value)}
											required
										/>
									</div>

								{/*Descripción */}
								<div className="flex flex-col space-y-1">
									<div className='flex flex-row justify-start space-x-0.5'>
										<p className='text-sm text-red-500 font-semibold'>*</p>
										<p className="text-sm font-medium">Descripción</p>
									</div>
									<textarea class="w-full h-20 resize-none px-3 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 rounded-lg appearance-none outline-none"
										value = {descp}
										onChange = { (e) => setDescp(e.target.value)} 
										required
										autoFocus
									/>
								</div>

								<div className="flex flex-row justify-between space-x-4 items-center">
									<button
										type="button"
										className="btn-terciary w-full"
										onClick={()=> handleCancel()}
									>
										Cancelar
									</button>
									<button 
										type="submit" 
										className="btn-primary w-full"
									>
										Guardar cambios
									</button>
								</div>
							</div>
						</div>
					</form>
			</div>
		</>
	    )	
	}
	
export async function getServerSideProps(ctx) {

	const { id } = ctx.query

	const entity = await fetch(`${url}/api/getEntityByID?id_entity=${id}`)
		.then(response => response.json())

	return{
		props:{
			entity
		}
	}
		
}

export default Modificar
