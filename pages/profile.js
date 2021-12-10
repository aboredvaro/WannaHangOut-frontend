import React, { useState } from 'react'
import Link from 'next/link'
import Navbar from '../components/navbar'
import url from '../utils/server.js'

const Profile = ( {entity, score} ) => {

	function EntityRole() {
		if(entity.id_role.toString() === '1') {
			return (
				<>
					<p className="text-gray-800">Teléfono de contacto: {entity.phone}</p>
					<p className="text-gray-800">Email: {entity.mail}</p>
				</>
			)
		}
	}

	function AvgScore() {
		if(score[0].media == null) {
			return ' Aún no hay reviews'
		}
		else return score[0].media
	}

	return (
		<>
			<Navbar />

			<div className="w-full flex flex-col space-y-5 py-24 items-center">
				<h1 className="text-4xl">{entity.nick}</h1>
				<img className="object-cover w-16 h-16 mr-2 rounded-full" src={entity.avatar} alt="Foto Perfil"/>
				<h2 className="text-3xl">{entity.name}</h2>
				<Link href={`/modify-account?id=${entity.id_entity}`}>
					<a className='flex flex-row justify-center items-center text-base font-medium text-orange-600 px-6 h-10 bg-orange-100 active:bg-orange-200 active:bg-opacity-75 transition-colors duration-150 ease-in-out rounded-lg'>
						Modificar datos
					</a>
				</Link>
				<p className="text-gray-800">{entity.description}</p>
				{EntityRole()}
				<p className="text-gray-800">Puntuación media de actividades: {AvgScore()} ({score[0].reviews} reviews)</p>
			</div>
		</>
	)
}

export async function getServerSideProps(ctx) {

	const {id} = ctx.query

	const entity = await fetch(`${url}/api/getEntityByID?id_entity=${id}`)
	 	.then(response => response.json())
		 
	const score = await fetch(`${url}/api/getAverageScoreByEntityCreator?id_entity_creator=${id}`)
		.then(response => response.json())

	return {
		props: {
			entity,
			score
		}
	}

}

export default Profile
