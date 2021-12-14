import React, { useState } from 'react'
import Link from 'next/link'
import Navbar from '../components/navbar'
import url from '../utils/server.js'

const Profile = ( {entity, score} ) => {

	function AvgScore() {
		if(score[0].media == null) {
			return ' Aún no hay reviews'
		}
		else return (score[0].media + ' sobre 5,0')
	}

	return (
		<>
			<Navbar />

			<div className='flex flex-col w-full h-full items-center justify-center space-y-10 p-20'>

				<div className='flex flex-col w-full items-center space-y-10'>
					{/*Foto y datos  */}
					<div className='flex flex-col w-full h-full items-center justify-center space-y-4'>
						{/*<h1 className="text-4xl">{entity.nick}</h1>*/}
						<img className="object-cover w-40 h-40 rounded-full" src={entity.avatar} alt="Foto Perfil"/>
						
						<div className='flex flex-col items-center space-y-0'>
							<p className="text-2xl font-medium">{entity.name}</p>
							{/*Review */}
							<div className='flex flex-row justify-center space-x-2'>
								<p className="text-base text-gray-400">{AvgScore()}</p>
								<p className="text-base text-gray-400 font-bold">·</p>
								<p className="text-base text-gray-400">{score[0].reviews} reviews</p>
							</div>
						</div>

						<p className="text-base text-gray-400">{entity.description}</p>

						<Link href={`/modify-account?id=${entity.id_entity}`}>
							<a className='btn-secondary w-56 text-bold'>
								Editar perfil
							</a>
						</Link>
					</div>

					{/*Actividades hosteadas */}
					<div className='flex flex-col w-full p-6'>
						<div className='flex flex-row justify-start space-x-4'>
							<p className='text-2xl font-medium'>Eventos creados</p>
							<p className='text-2xl font-medium'>Eventos creados</p>
						</div>
					</div>

				</div>
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
