import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import log from '../utils/log.js'
import url from '../utils/server.js'
import { useRouter } from 'next/router'

const Modificar = ({ entity }) => {

	const router = useRouter()

	const [avatar, setAvatar] = useState(entity.avatar)
	const [nick, setNick] = useState(entity.nick)
	const [name, setName] = useState(entity.name)
	const [descp, setDescp] = useState(entity.description)
	const [email, setEmail] = useState(entity.mail)

	const handleSubmit = async event => {
		event.preventDefault()	

		const res = await fetch(
			`${url}/api/updateEntity`,{
				body: JSON.stringify({
			id_entity: entity.id_entity.toString(),
			id_role: entity.id_role,
			phone: entity.phone,
			nick: nick,
			name: name,
			surname: entity.surname,
			description: descp,
			mail: email,
			avatar: avatar,
			tags_ent: entity.tags_ent,
			codPos: entity.codPos,
			id_address: entity.id_address,
			latitude: entity.latitude,
			longitude: entity.longitude,
			location: entity.location,
			direction: entity.direction,
			deleted: 0,
			pass: entity.pass
		}),
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'PUT'
		})
		
		if(res) {
			router.push('/profile?id=' + entity.id_entity)
		}

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
								<div className="flex flex-col space-y-1">
									<div className='flex flex-row justify-start space-x-0.5'>
										<p className='text-sm text-red-500 font-semibold'>*</p>
										<p className="text-sm font-medium">URL de imagen</p>
									</div>
									<div className='flex flex-row justify-start space-x-2'>
									<input
										className="input w-full"
										value = {avatar}
										onChange = { (e) => setAvatar(e.target.value)}
										required
									/>
									<button 
									type='button'
										className='btn-terciary w-24'
										onClick={() => setAvatar('')}
									>
										Borrar
									</button>
									</div>
								</div>
							
								
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
									<textarea className="w-full h-20 resize-none px-3 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 rounded-lg appearance-none outline-none"
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
