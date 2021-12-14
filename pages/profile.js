import React, { useState } from 'react'
import Link from 'next/link'
import Navbar from '../components/navbar'
import url from '../utils/server.js'
import ActivityItem from '../components/activity-item'

const Profile = ( {
	entity, score, activities
} ) => {
	console.log(activities)

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
							<p className="text-4xl font-medium">{entity.nick}</p>
							<p className="text-2xl text-gray-600 font-medium">{entity.name}</p>
							{/*Review */}
							<div className='flex flex-row justify-center space-x-2'>
								<p className="text-base text-gray-400">{AvgScore()}</p>
								<p className="text-base text-gray-400 font-bold">·</p>
								<p className="text-base text-gray-400">{(activities.length === 1) ? activities.length + ' Actividad' : activities.length + ' Actividades'}</p>
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
							<p className='text-2xl text-gray-400 font-medium'>{activities.length}</p>
						</div>
						
						{/*Actividades hosteadas */}
						<div className='flex flex-row justify-start space-x-2'>
							{(activities.length > 0) && activities.map(activity => {
								return (	
									<>
										<div className='flex flex-col w-110 h-96 '>
											{/*Foto de la act */}
											<div>
												<img className='object-cover w-110 h-60 rounded-lg bg-gray-700' src={null}/>
											</div>

											{/*Datos de la act */}
											<div className='flex flex-col items-start space-y-4'>
												<div className='flex flex-col items-start space-y-0'>
													<p className='text-sm font-semibold'>{activity.title}</p>
													<p className='text-sm text-orange-600'>{new Date(activity.dateAct).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}</p>
													{/*<p className='text-2xl font-medium'>Eventos creados</p>*/}
												</div>

											</div>

										</div>
									</>
								)
							})}
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

	const activities = await fetch(`${url}/api/getActivitiesFromEntity?id_entity=${id}`)
		.then(response => response.json())

	return {
		props: {
			entity,
			score,
			activities
		}
	}

}

export default Profile
