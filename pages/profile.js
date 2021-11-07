import React, { useState } from 'react'
import url from '../utils/server.js'
import log from '../utils/log.js'
import ActivityItem from '../components/activity-item.js'

const Profile = ({
	entity
}) => {

	const deleteEntity = async event => {
		event.preventDefault()

		const res = await fetch(
			`${url}/api/deleteEntityById`,{
				body: JSON.stringify({	
					id_entity: entity.id_entity
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			})
			.then(response => console.log(response))
			.then(response => {
				window.location.href = 'http://localhost:3001/index'	// Esto habria que cambiarlo es un poco gitano
			})
	}

	return (
		<>
			<div className="w-full h-screen flex flex-col space-y-12 my-24 items-center">
        
				<h1 className="text-4xl font-medium">Perfil</h1>

				<div className="flex flex-col space-y-4">
					<img 
						className='inline object-cover w-16 h-16 mr-2 rounded-full'
						src={ entity.avatar }
						alt="new"
					/>
					<p1>{entity.nick}</p1>
					
					
					<form className="flex flex-col space-y-4">
						<button type="submit" className="rounded-full border-2 ">Modificar</button>
					</form>

					<form className="flex flex-col space-y-4" onSubmit={deleteEntity}>
						<button type="submit" className="rounded-full border-2 ">Borrar</button>
					</form>
					
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps(ctx) {

	const { id } = ctx.query

	const res = await fetch(`${url}/api/getEntityByID?id_entity=${id}`)
	 	.then(response => response.json())
	const entity = res

	return {
		props: {
			entity
		}
	}

}

export default Profile