import React, { useState } from 'react'
import Link from 'next/link'
import Navbar from '../components/navbar'
import url from '../utils/server.js'
import ActivityItem from '../components/activity-item'

const Profile = ( {
	entity, score, createdActivities, signedUpToActs
} ) => {

	const [imgArray, setImgArray] = useState([])
 
	function AvgScore() {
		if(score[0].media == null) { 
			return ' Aún no hay reviews'
		}
		else return (score[0].media + ' sobre 5')
	}	

	async function getActImg() {
		/*const response = await fetch(`${url}/api/getImageByIdActivity?id_activity=${actId}&cant=1`)
			.then(response => response.json())
		console.log(response)
		return response[0]*/

		/*var imgsAux = []
		createdActivities.map(async activity => {
			const response = await fetch(`${url}/api/getImageByIdActivity?id_activity=${actId}&cant=1`)
				.then(response => response.json())
			imgsAux.push(response[0])
		})
		console.log(imgsAux)
		setImgArray(imgsAux)*/
	}

	function toUpperFirst(fecha) {
		return fecha.charAt(0).toUpperCase() + fecha.slice(1)
	}

	function activityComp(activity) {
		return(
			<>	
			<div className='flex-none'>
				<div className='flex flex-col w-113 h-103 space-y-4' key={activity.id_activity}>
					{/*Foto de la act */}
					<div>
						<img className='object-cover w-108 h-60 rounded-lg' src={activity.urlPath} alt='Imagen de la actividad' />
					</div>

					{/*Datos de la act */}
					<div className='flex flex-col items-start space-y-4'>
						<div className='flex flex-col items-start space-y-0'>
							<p className='text-2xl font-semibold'>{activity.title}</p>
							<p className='text-sm text-orange-600'>{toUpperFirst(new Date(activity.dateAct).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }))}</p>
							<div className='flex flex-row justify-start space-x-1.5'>
								<p className='text-sm text-gray-400'>{activity.direction}</p>
								<p className='text-sm text-gray-400 font-bold'>·</p>
								<p className='text-sm text-gray-400'>{activity.location}</p>
							</div>
						</div>

						{/**Barra inferior inf creador + gratis y últimas plazas */}
						<div className='flex flex-rom w-full justify-between'>
							<div className='flex flex-row justify-start space-x-2'>
								<div>
									<img className='object-cover w-10 h-10 rounded-full' src={activity.avatar} alt='Imagen del creador' />
								</div>
								<div className='flex flex-col items-start space-y-0'>
									<p className='text-sm'>{activity.name}</p>
									<p className='text-xs text-gray-400'>{(activity.avgScoreOfEntity === 0) ? 'Aún no hay reviews' : activity.avgScoreOfEntity + ' sobre 5'}</p>
								</div>
							</div>

							{/**Flags (ultimas plazas, gratis) */}
							<div className='flex flex-row justify-end space-x-2'>
								{(activity.ocupation >= 0,9) && <div className='flex flex-row w-36 h-8 bg-purple-50 rounded-md justify-center items-center py-1 px-3'>
									<p className='text-base text-purple-600'>Últimas plazas</p>
								</div>}
								{(activity.price === 0) && <div className='flex flex-row w-20 h-8 bg-gray-50 rounded-md justify-center items-center py-1 px-3'>
									<p className='text-base text-gray-500'>Gratis</p>
								</div>}
							</div>
						</div>
					</div>

				</div></div>
			</>
		)
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
								<p className="text-base text-gray-400">{(createdActivities.length === 1) ? createdActivities.length + ' Actividad' : createdActivities.length + ' Actividades'}</p>
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
					<div className='flex flex-col w-full p-6 space-y-6'>
						<div className='flex flex-row justify-start space-x-4'>
							<p className='text-2xl font-medium'>Eventos creados</p>
							<p className='text-2xl text-gray-400 font-medium'>{createdActivities.length}</p>
						</div>
						
						{/*Actividades hosteadas */}
						<div className='overflow-x-auto flex flex-row justify-start space-x-2'>
							{(createdActivities.length > 0) && createdActivities.map((activity, i) => {
								return (	
									activityComp(activity)
								)
							})}
							{(createdActivities.length === 0) && <p className='text-lg font-medium text-gray-400'>
								Aquí aparecerán los eventos que ha creado este usuario
							</p>}
						</div>
					</div>

					{/*Actividades apuntadas */}
					<div className='flex flex-col w-full p-6 space-y-6'>
						<div className='flex flex-row justify-start space-x-4'>
							<p className='text-2xl font-medium'>Eventos a los que estoy apuntado</p>
							<p className='text-2xl text-gray-400 font-medium'>{signedUpToActs.length}</p>
						</div>
						
						{/*Actividades apuntadas */}
						<div className='overflow-x-scroll flex flex-row justify-start space-x-4'>
							{(signedUpToActs.length > 0) && signedUpToActs.map((activity, i) => {
								return (	
									activityComp(activity)
								)
							})}
							{(signedUpToActs.length === 0) && <p className='text-lg font-medium text-gray-400'>
								Aquí aparecerán los eventos a los que se ha apuntado este usuario
							</p>}
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

	const createdActivities = await fetch(`${url}/api/getActivitiesCreatedByEntity?id_entity=${id}`)
		.then(response => response.json())
		 
	const signedUpToActs = await fetch(`${url}/api/getActivitiesUserSignUpTo?id_entity=${id}`)
		.then(response => response.json())

	return {
		props: {
			entity,
			score,
			createdActivities,
			signedUpToActs
		}
	}

}

export default Profile
