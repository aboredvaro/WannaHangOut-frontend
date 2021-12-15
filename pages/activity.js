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
import { LogoTwitter, MailOpenOutline } from 'react-ionicons'
import url from '../utils/server.js'

const ActivityPage = ({
	activity
}) => {
	const router = useRouter()

	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

	const capitalize = (word) => {
		const lower = word.toLowerCase()
		return word.charAt(0).toUpperCase() + lower.slice(1)
	}

	const addMinutes = (date, minutes) => {
		return new Date(date.getTime() + minutes*60000)
	}

	const getCleanDate = (dirtyDate) => {
		const unformattedDate = new Date(dirtyDate)
		const dayName = capitalize(unformattedDate.toLocaleDateString('es-ES', { weekday: 'long' }))
		const dayNumber = unformattedDate.toLocaleDateString('es-ES', { day: 'numeric' })
		const month = capitalize(unformattedDate.toLocaleDateString('es-ES', { month: 'long' }))
		const time = unformattedDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute:'2-digit' })
		return `${dayName} ${dayNumber}, ${month} a las ${time}`
	}

	const getActDuration = (dirtyDate) => {
		const unformattedDate = new Date(dirtyDate)
		const dayName = capitalize(unformattedDate.toLocaleDateString('es-ES', { weekday: 'long' }))
		const dayNumber = unformattedDate.toLocaleDateString('es-ES', { day: 'numeric' })
		const month = capitalize(unformattedDate.toLocaleDateString('es-ES', { month: 'long' }))
		const time = unformattedDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute:'2-digit' })
		return `${dayName} ${dayNumber}, ${month} a las ${time}`
	}

	const [mapWidth, setMapWidth] = useState(0)

	function getMapWidth() {
		setMapWidth(document.querySelector('#img').offsetWidth - ((window.innerWidth > 1024 ? 40 : 24) * 2))
	}

	let getLocation = ({id_address, latitude, longitude}) => ({id_address, latitude, longitude})

	const addressList = []
	addressList.push(getLocation(activity))

	const mapStyles = {
		position: 'relative',
		width: mapWidth,
		height: '400px'
	}

	const coordinates = {
		lat: activity.latitude,
		lng: activity.longitude
	}

	const [isLogged, setIsLogged] = useState(null)
	const [sessionID, setSessionID] = useState(null)

	useEffect(() => {
		// Get user info
		console.log(activity)
		const getUserSession = async() => {
			const userSession = session()
			setIsLogged(userSession)

			if (userSession) {
				const userHash = getSession()
				const userID = await fetch(`${url}/api/getEntityByHash?entityHash=${userHash}`)
					.then(response => response.json())
					.then(response => response.id_entity)
				
				setSessionID(userID)
			}
		}
		getUserSession()

		// Set map width
		if (activity.description) {
			getMapWidth()
			window.addEventListener('resize', () => {(typeof ifgetMapHeight !== undefined) && getMapWidth()})
		}

		// Set map coordinates

	})

	const [participated, setParticipated] = useState(false)

	function pastDate() {
		const today = new Date()
		return ((new Date(activity.dateAct)) < today)
	}

	const image = activity.urlPath || 'https://i.imgur.com/y80U1fR_d.webp?maxwidth=1520&fidelity=grand'
	// Stray Kids 'https://i.imgur.com/UblrPGW_d.webp?maxwidth=760&fidelity=grand'
	// Twenty One Pilots 'https://i.imgur.com/y80U1fR_d.webp?maxwidth=760&fidelity=grand'
	// Feria de Proyectos 'https://i.imgur.com/zcs8mDl_d.webp?maxwidth=1520&fidelity=grand'
	// Random 'https://media.quincemil.com/imagenes/2020/07/17021058/cedeira-640x360.jpg'
	
	return (
		<div className="flex flex-col w-full">
			<Navbar />

			{/** Actividad */}
			<div className="relative flex flex-col w-full items-center bg-white xl:bg-gray-100 z-0">

				{/** Backdrop image */}
				<div className="opacity-0 xl:opacity-100 absolute top-0 left-0 w-screen h-screen pointer-events-none z-0">
					<div className="relative overflow-hidden">
						<img className="w-full filter blur-3xl transform origin-center scale-110" src={image} alt="Foto Actividad"/>
						<div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-gray-100 to-transparent"></div>
						<div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-100 to-transparent"></div>
					</div>
				</div>

				{/** Activity content */}
				<div className="flex flex-col items-start w-auto h-full xl:my-28 pb-32 lg:pb-20 xl:pb-0 bg-white overflow-hidden xl:rounded-lg xl:shadow-card z-10">

					{/** Primera parte. Foto y Titulo */}
					<div className="flex flex-col lg:flex-row bg-white lg:items-stretch">

						{/** Imagen */}
						<div className="flex flex-col w-screen lg:max-w-3xl h-auto pointer-events-none select-none">
							<img id="img" className="w-full" src={image} alt="Foto Actividad"/>
						</div>

						<div className="flex flex-col w-full lg:max-w-sm p-6 justify-between">

							{/** Información de Actividad */}
							<div className="flex flex-col-reverse lg:flex-col">

								<div className="flex flex-row space-x-4 lg:mb-8 mt-8 lg:mt-0">

									{/** Fecha y Lugar */}
									<div className="flex flex-col">
										<span className="text-sm font-medium text-gray-700">{getCleanDate(activity.dateAct)}</span>
										<div className="flex flex-row flex-wrap">
											<span className="text-sm font-regular text-gray-400 mr-2">Calle {activity.direction}</span>
											<span className="text-sm font-bold text-gray-400 mr-2"> · </span>
											<span className="text-sm font-regular text-gray-400"> {activity.location}</span>
										</div>
									</div>

									{/** Boton de Compartir */}
									<div>

									</div>
								</div>

								{/** Titulo, Plazas, Entidad... */}
								<div className="flex flex-col space-y-4 lg:space-y-2">

									{/** Ult. plazas */}
									{activity.ocupation < 0.75 &&
										<div className="flex flex-row">
											<div className="flex flex-row items-center h-8 px-4 rounded-md bg-purple-100 bg-opacity-60 text-sm font-regular text-purple-600">Últimas plazas</div>
										</div>
									}

									{/** Titulo */}
									<h1 className="flex flex-row text-4xl lg:text-3xl font-semibold text-gray-700">{activity.title}</h1>

									{/** Nick y avatar del perfil creador */}
									<Link href={`/profile?id=${activity.id_entity_creator}`}>
										<a className="flex flex-row space-x-2 items-center">
											<img className="object-cover w-8 h-8 rounded-full" src={activity.avatar && activity.avatar} alt="Foto Perfil"/>
											<span className="text-xs font-regular text-gray-700">{activity.name && activity.name}</span>
										</a>
									</Link>
									
								</div>
							</div>

							{/** Botones de Actividad */}
							<div className="fixed bottom-0 left-0 w-screen lg:w-full p-3 lg:p-0 bg-white lg:bg-none border-t border-gray-200 lg:border-none lg:relative flex flex-col items-center space-y-2 z-50">
								{activity.price == 0 ? 
									<span className="text-base font-medium text-gray-700">Gratis</span>
									:
									<span className="text-base font-medium text-gray-700">{activity.price} €</span>
								}

								<button type="submit" className="btn-primary w-full">Apuntarme</button>
							</div>
						</div>
					</div>

					{/** Segunda parte. Descripción y demás */}
					<div className="flex flex-col w-screen lg:w-auto lg:flex-row">

						{/** Descripción,mapa,categorías y compartir*/}
						<div className="flex flex-col w-full lg:max-w-3xl h-full space-y-10 p-6 lg:p-10">
					
							{/** Descripción */}
							<div className="flex flex-col space-y-3">
								<h3 className="text-2xl lg:text-lg font-medium text-gray-700">Descripción</h3>
								<p className="text-base font-regular text-gray-700">{activity.description}</p>
							</div>	

							{/** Mapa */}
							<div className="flex flex-col space-y-3">
								<h3 className="text-2xl lg:text-lg font-medium text-gray-700">Mapa</h3>
								<div
									id="map"
									className="flex flex-col"
									style={{
										width: mapWidth
									}}
								>
									<MapContainer
										containerStyle={mapStyles}
										center={coordinates}
										zoom={16}
										addressList={addressList}
									/>
								</div>
								<span className="text-sm font-regular text-gray-400">{'Calle ' + activity.direction + ', ' + activity.location}</span>
							</div>

							{/** Categorías */}
							<div className="flex flex-col space-y-3">
								<h3 className="text-2xl lg:text-lg font-medium text-gray-700">Categorías</h3>

								{/** Categorías */}
								<div className="flex flex-row w-full flex-wrap">
									{ activity && (
										Object.values(activity.tags).map( tag => {
											return (	
												<div key={tag.id_tags} className="flex flex-row h-10 lg:h-8 px-6 items-center justify-center whitespace-nowrap bg-gray-100 border border-gray-300 rounded-full mr-3 mb-3">
													{tag.name}
												</div>
											)
										})
									)}
								</div>
							</div>

							{/** Compartir */}
							<div className="flex flex-col space-y-3">
								<h3 className="text-2xl lg:text-lg font-medium text-gray-700">Compartir con amigos</h3>
								<div className="flex flex-row space-x-3">
									
									<a
										style={{
											backgroundColor: '#E7F5FE'
										}}
										className="flex flex-col items-center justify-center w-12 sm:w-10 h-12 sm:h-10 rounded-lg outline-none"
										href="http://twitter.com/share?text=¿Llegas nuevo a la ciudad y no tienes planes? Conecta con personas con tus mismos gustos y descubre experiencias cerca de ti, allá donde vayas.&url=https://wannahangout.herokuapp.com&hashtags=feriaetsinf,etsinfupv"
									>
										<LogoTwitter
											color={'#1DA1F2'}
											title={''}
											height="24px"
											width="24px"
										/>
									</a>

									<a
										className="flex flex-col items-center justify-center bg-gray-100 w-12 sm:w-10 h-12 sm:h-10 rounded-lg outline-none"
										href="mailto:?subject=Wanna Hang Out (Feria de Proyectos PIN 2021)&amp;body=He estado en la feria de proyectos de la ETSINF y quería compartirte este proyecto que me ha llamado la atención https://wannahangout.herokuapp.com."
									>
										<MailOpenOutline
											color={'#374151'}
											title={''}
											height="24px"
											width="24px"
										/>
									</a>

								</div>	
							</div>

						</div>
							
						{/** Fecha y Ubicación (panel derecho)*/}
						<div className="flex flex-col w-full max-w-sm h-full px-6 py-10 space-y-10">

							{/** Fecha */}
							<div className="flex flex-col space-y-2">
								<h3 className="text-lg font-medium text-gray-700">Día y Hora</h3>	
								<div className="flex flex-col">
									<span className="text-sm font-regular text-gray-700">{getCleanDate(activity.dateAct)}</span>
									<span className="text-sm font-regular text-gray-700">{new Date(activity.dateAct).getHours() + new Date(activity.dateAct).getMinutes()}</span>
								</div>

								<a className="hidden text-sm font-medium text-orange-500">Añadir al calendario</a>
							</div>

							{/** Ubicación */}
							<div className="flex flex-col space-y-2">
								<span className="text-lg font-medium text-gray-700">Ubicación</span>	
								<div className="flex flex-col">
									<span className="text-sm font-regular text-gray-700">Calle {activity.direction}</span>
									<span className="text-sm font-regular text-gray-700">{activity.location}</span>
									<span className="text-sm font-regular text-gray-700">{activity.codPos + ',' + activity.location}</span>
								</div>

								<a className="hidden text-sm font-medium text-orange-500">Ver Mapa</a>
							</div>

						</div>

					</div>

				</div>
		
			</div>
		</div>
	)
}

export async function getServerSideProps(ctx) {

	const {id} = ctx.query

	const activity = await fetch(`${url}/api/getActivityByID?id_activity=${id}`)
	 	.then(response => response.json())

	return {
		props: {
			activity
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
