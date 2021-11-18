import React, { useState } from 'react'
import Navbar from '../components/navbar'

const Profile = (entity) => {

	function EntityRole() {
		if(entity.id_role.toString() === '2') {
			return (
				<>
					{/*Teléfono de contacto y email*/}
				</>
			)
		}
	}

	return (
		<>
			{
				<Navbar/>
			}

			{/*Componente profile*/}
			{EntityRole()}
		</>
	)
}

export async function getServerSideProps(ctx) {

	const {id} = ctx.query

	const entity = await fetch(`${url}/api/getEntityByID?id_activity=${id}`)
	 	.then(response => response.json())

	return {
		props: {
			entity
		}
	}

}

export default Profile