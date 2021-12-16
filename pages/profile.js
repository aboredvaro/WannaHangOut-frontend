import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '../components/navbar'
import url from '../utils/server.js'
import { session, getSession } from '../utils/session'
import ActivityItem from '../components/activity-item'
import { session, getSession } from '../utils/session.js'

const Profile = ( {
	entity,
	score,
	createdActivities,
	signedUpToActs
} ) => {

	const [imgArray, setImgArray] = useState([])
	const [isLogged, setIsLogged] = useState(null)
	const [sessionID, setSessionID] = useState(false)
	const [isUsersProfile, setIsUsersProfile] = useState(false)

	useEffect(() => {
		const getUserSession = async() => {
			const userSession = session()
			setIsLogged(userSession)

			if (userSession) {
				const userHash = getSession()
				const userID = await fetch(`${url}/api/getEntityByHash?entityHash=${userHash}`)
					.then(response => response.json())
				
				setSessionID(userID)
				setIsUsersProfile(userID.id_entity === entity.id_entity)
			}
		}
		getUserSession()
	})
 
	function AvgScore() {
		if(score[0].media == null) { 
			return ' Aún no hay reviews'
		}
		else return (score[0].media + ' sobre 5')
	}	

	function toUpperFirst(fecha) {
		return fecha.charAt(0).toUpperCase() + fecha.slice(1)
	}

	function activityComp(activity) {
		return(
			<Link href={`/activity?id=${activity.id_activity}`} passHref>
				<div className='flex-none cursor-pointer'>
					<div className='flex flex-col w-auto h-103 space-y-4' key={activity.id_activity}>
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
								<Link href={`/profile?id=${activity.id_entity_creator}`} passHref>
									<div className='flex flex-row justify-start space-x-2'>
										<div>
											<img className='object-cover w-10 h-10 rounded-full' src={activity.avatar} alt='Imagen del creador' />
										</div>
										<div className='flex flex-col items-start space-y-0'>
											<p className='text-sm'>{activity.name}</p>
											<p className='text-xs text-gray-400'>{(activity.avgScoreOfEntity === 0) ? 'Aún no hay reviews' : activity.avgScoreOfEntity + ' sobre 5'}</p>
										</div>
									</div>
								</Link>

								{/**Flags (ultimas plazas, gratis) */}
								<div className='flex flex-row justify-end space-x-2'>
									{(activity.ocupation >= 0.75) && <div className='flex flex-row w-36 h-8 bg-purple-50 rounded-md justify-center items-center py-1 px-3'>
										<p className='text-base text-purple-600'>Últimas plazas</p>
									</div>}
									{(activity.price === 0) && <div className='flex flex-row w-20 h-8 bg-gray-50 rounded-md justify-center items-center py-1 px-3'>
										<p className='text-base text-gray-500'>Gratis</p>
									</div>}
								</div>
							</div>
						</div>

					</div>
				</div>
			</Link>
		)
	}
	
	return (
		<div className="flex flex-col">
			<Navbar />

			<div className='flex flex-col w-full h-full items-center justify-center space-y-10 py-20'>

				<div className='flex flex-col w-full items-center space-y-20'>
					{/*Foto y datos  */}
					<div className='flex flex-col w-full h-full items-center justify-center space-y-4 px-6'>
						{/*<h1 className="text-4xl">{entity.nick}</h1>*/}
						<img className="object-cover w-40 h-40 rounded-full pointer-events-none select-none shadow-card" src={entity.avatar} alt="Foto Perfil"/>
						
						<div className='flex flex-col items-center space-y-0'>
							<p className="text-3xl font-medium text-center">{entity.name} {entity.surname}</p>
							<p className="text-base text-gray-400 pb-4">@{entity.nick}</p>
							<p className="text-base text-gray-700 pb-10 text-center max-w-prose">{entity.description}</p>
							{/*Review */}
							<div className='flex flex-row justify-center space-x-2'>
								<p className="text-base text-gray-400">{AvgScore()}</p>
								<p className="text-base text-gray-400 font-bold">·</p>
								<p className="text-base text-gray-400">{(createdActivities.length === 1) ? createdActivities.length + ' Actividad' : createdActivities.length + ' Actividades'}</p>
							</div>
						</div>

						{isUsersProfile && (
							<Link href={`/modify-account?id=${entity.id_entity}`}>
								<a className='btn-secondary w-56 text-bold'>
									Editar perfil
								</a>
							</Link>
						)}
					</div>

					{/*Actividades hosteadas */}
					<div className='flex flex-col w-full space-y-6'>
						<div className='flex flex-row justify-start space-x-4 p-6 md:pl-48'>
							<p className='text-2xl font-medium'>Eventos creados</p>
							<p className='text-2xl text-gray-400'>{createdActivities.length}</p>
						</div>
						
						{/*Actividades hosteadas */}
						<div className='overflow-x-auto overflow-y-hidden flex flex-row justify-start space-x-2 px-6 md:pl-48 pb-4'>
							{(createdActivities.length > 0) && createdActivities.map((activity, i) => {
								return (	
									activityComp(activity)
								)
							})}
							{(createdActivities.length === 0) && <p className='flex flex-col text-lg text-center text-gray-400 bg-gray-50 w-full justify-center items-center py-4 px-6 md:mr-48 rounded-lg'>
								Aquí aparecerán los eventos que ha creado este usuario
							</p>}
						</div>
					</div>

					{/*Actividades apuntadas */}
					<div className='flex flex-col w-full space-y-6'>
						<div className='flex flex-row justify-start space-x-4 p-6 md:pl-48'>
							<p className='text-2xl font-medium'>Eventos a los que estoy apuntado</p>
							<p className='text-2xl text-gray-400'>{signedUpToActs.length}</p>
						</div>
						
						{/*Actividades apuntadas */}
						<div className='overflow-x-scroll overflow-y-hidden flex flex-row justify-start space-x-4 px-6 md:pl-48 pb-4'>
							{(signedUpToActs.length > 0) && signedUpToActs.map((activity, i) => {
								return (	
									activityComp(activity)
								)
							})}
							{(signedUpToActs.length === 0) && <p className='flex flex-col text-lg text-center text-gray-400 bg-gray-50 w-full justify-center items-center py-4 px-6 md:mr-48 rounded-lg'>
								Aquí aparecerán los eventos a los que se ha apuntado este usuario
							</p>}
						</div>
					</div>

				</div>
			</div>
		</div>
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
