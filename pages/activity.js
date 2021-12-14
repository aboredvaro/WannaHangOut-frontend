import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Navbar from '../components/navbar'
import log from '../utils/log.js'
import ActivityItem from '../components/activity-score-item.js'
import MapContainer from '../components/map'
import CreateReviewItem from'../components/create-review-item.js'
import ReviewItem from '../components/review-item.js'
import { session, getSession } from '../utils/session.js'
import url from '../utils/server.js'

const ActivityPage = ({
	activity,
	actScore,
	reviewsList,
	address,
	imageActivity,
	entity
}) => {
	const router = useRouter()

	var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

	var addressList = []	// array para que pueda usarse el mapa
	addressList.push(address)

	const containerStyle = {
		position: 'relative',
		width: '640px',
		height: '260px'
	}

	const center = {
		lat: address.latitude,
		lng: address.longitude
	}

	const [isLogged, setIsLogged] = useState(false)
	const [sessionID, setSessionID] = useState()

	useEffect(() => {
		const getUserSession = async() => {
			setIsLogged(session())

			const userHash = getSession()
			const userID = await fetch(`${url}/api/getEntityByHash?entityHash=${userHash}`)
				.then(response => response.json())
				.then(response => response.id_entity)
			
			setSessionID(userID)
		}
		getUserSession()
	}, [])

	const [participated, setParticipated] = useState(false)

	const deleteActivity = async event => {
		event.preventDefault()

		const res = await fetch(
			`${url}/api/deleteActivityById`,{
				body: JSON.stringify({	
					id_activity: activity.id_activity
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			})
			.then(router.push('/activities'))
	}

	function pastDate() {
		const today = new Date()
		return ((new Date(activity.dateAct)) < today)
	}

	return (
		<>
			<Navbar />

			{/** Actividad */}
			<div className="relative flex flex-col w-full items-center px-28 bg-green-100">

				<div className="absolute top-0 left-0 w-screen h-screen bg-purple-200"></div>

				<div className="flex flex-col w-auto h-full pt-28 z-10">

					{/** Primera parte. Foto y Titulo */}
					<div className="flex flex-row bg-white items-stretch">

						{/** Imagen */}
						<div className="flex flex-col w-screen max-w-3xl h-auto">
							<img className="w-full" src={'https://media.quincemil.com/imagenes/2020/07/17021058/cedeira-640x360.jpg'} alt="Foto Actividad"/>
						</div>

						<div className="flex flex-col w-screen max-w-sm p-6 justify-between">

							{/** Información de Actividad */}
							<div className="flex flex-col space-y-8">

								<div className="flex flex-row space-x-4">

									{/** Fecha y Lugar */}
									<div className="flex flex-col">
										<label className="text-sm font-medium text-orange-500">{  new Date(activity.dateAct).toLocaleDateString('es-ES', options)}</label>
										<div className="flex flex-row space-x-2">
											<label className="text-sm font-regular text-gray-400">Calle {address.direction}</label>
											<label className="text-sm font-bold text-gray-400"> · </label>
											<label className="text-sm font-regular text-gray-400"> {address.location}</label>
										</div>
									</div>

									{/** Boton de Compartir */}
									<div>

									</div>
								</div>

								{/** Titulo, Plazas, Entidad... */}
								<div className="flex flex-col space-y-2">

									{/** Ult. plazas */}
									<div className="flex flex-row px-2">
										{activity.seats < 20 &&
											<div className="flex flex-row px-2 rounded-md bg-purple-50 text-sm font-regular text-purple-600">Últimas plazas</div>
										}	
									</div>

									{/** Titulo */}
									<label className="text-2xl font-semibold text-gray-700">{activity.title}</label>

									{/** Nick y avatar del perfil creador */}
									<div className="flex flex-row space-x-2 items-center">
										<img className="object-cover w-8 h-8 rounded-full" src={entity && entity.avatar} alt="Foto Perfil"/>
										<label className="text-xs font-regular text-gray-700">{entity && entity.nick}</label>
									</div>

								</div>
							</div>

							{/** Botones de Actividad */}
							<div className="flex flex-col w-full items-center space-y-2">
								{activity.price == 0 ? 
									<label className="text-base font-medium text-gray-700">Gratis</label> :
									<label className="text-base font-medium text-gray-700">{activity.price} €</label>
								}

								<button type="submit" className="btn-primary w-full">Apuntarme</button>
							</div>
						</div>
					</div>

					{/** Segunda parte. Descripción y demás */}
					<div className="flex flex-row bg-purple-300">

						{/** Descripción,mapa,categorías y compartir*/}
						<div className="flex flex-col w-full h-full space-y-10 p-10 bg-red-400 bg-opacity-30">
					
							{/** Descripción */}
							<div className="flex flex-col space-y-3">
								<label className="text-lg font-medium text-gray-700">Descripción</label>
								<label className="text-base font-regular text-gray-700">{activity.description}</label>
							</div>	

							{/** Mapa */}
							<div className="flex flex-col space-y-3">
								<label className="text-lg font-medium text-gray-700">Mapa</label>
								<div className="hidden xl:flex flex-col h-64 max-h-full">
									<MapContainer
										containerStyle={containerStyle}
										center={center}
										zoom={16}
										addressList={addressList}
									/>
								</div>
								<label className="text-sm font-regular text-gray-400">{'Calle ' + address.direction + ', ' + address.location}</label>
							</div>

							{/** Categorías */}
							<div className="flex flex-col sapce-y-3">
								<label className="text-lg font-medium text-gray-700">Categorías</label>

								<div className="flex flex-row space-x-2">
									{/** Mostrar lista de categorías */}
								</div>
							</div>

							{/** Compartir */}
							<div className="flex flex-col space-y-3">
								<label className="text-lg font-medium text-gray-700">Compartir con amigos</label>
								<div className="flex flex-row space-x-6">
									{/** Iconos Redes Sociales */}
								</div>	
							</div>

						</div>
							
						{/** Fecha y Ubicación (panel derecho)*/}
						<div className="flex flex-col w-full max-w-sm h-full px-6 py-10 space-y-10">

							{/** Fecha */}
							<div className="flex flex-col space-y-2">
								<label className="text-lg font-medium text-gray-700">Día y Hora</label>	
								<div className="flex flex-col">
									<label className="text-sm font-regular text-gray-700">{  new Date(activity.dateAct).toLocaleDateString('es-ES', options)}</label>
									<label className="text-sm font-regular text-gray-700">{new Date(activity.dateAct).getHours() + new Date(activity.dateAct).getMinutes()}</label>
								</div>

								<label className="text-sm font-medium text-orange-500">Añadir al calendario</label>
							</div>

							{/** Ubicación */}
							<div className="flex flex-col space-y-2">
								<label className="text-lg font-medium text-gray-700">Ubicación</label>	
								<div className="flex flex-col">
									<label className="text-sm font-regular text-gray-700">Calle {address.direction}</label>
									<label className="text-sm font-regular text-gray-700">{address.location}</label>
									<label className="text-sm font-regular text-gray-700">{address.codPos + ',' + address.location}</label>
								</div>

								<label className="text-sm font-medium text-orange-500">Ver Mapa</label>
							</div>

						</div>

					</div>

				</div>
		
			</div>
		</>
	)
}

export async function getServerSideProps(ctx) {

	const {id} = ctx.query

	const res = await fetch(`${url}/api/getActivityByID?id_activity=${id}`)
	 	.then(response => response.json())
	const activity = res

	const address = await fetch(`${url}/api/getAddressByID?id_address=${activity.id_address}`)
		.then(response => response.json())
	
	const actScore = await fetch(`${url}/api/getAverageScoreByActivities?id_activity=${id}`)
		.then(response => response.json())

	const reviewsList = await fetch(`${url}/api/getAllReviewByActivityID?id_activity=${id}`)
		.then(response => response.json())

	const imageActivity = await fetch(`${url}/api/getImageByIdActivity?id_activity=${activity.id_activity}&?cant=${1}`)
		.then(response => response.json())

	const entity = await await fetch(`${url}/api/getEntityByID?id_entity=${activity.id_entity_creator}`)
		.then(response => response.json())

	return {
		props: {
			activity,
			address,
			actScore,
			reviewsList,
			imageActivity,
			entity
		}
	}
}

/*
				{(sessionID === activity.id_entity_creator) &&
					<>
						<Link href={`/modify-activity?id=${activity.id_activity}`}>
							<a className="rounded-full border-2 text-center cursor-pointer">Modificar</a>
						</Link>
						<form className="flex flex-col space-y-4" onSubmit={deleteActivity}>
							<button type="submit" className="rounded-full border-2 ">Borrar</button>
						</form>
					</>
				}
				
				{
					(isLogged && participated && pastDate()) && (
						<CreateReviewItem 
							id_activity_prop={activity.id_activity}
						/>
					)
				}	*/		

export default ActivityPage
