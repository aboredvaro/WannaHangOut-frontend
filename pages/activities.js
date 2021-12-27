import React, { useState, useEffect, Fragment } from 'react'
import Navbar from '../components/navbar'
import ActivityItem from '../components/activity-item'
import log from '../utils/log.js'
import url from '../utils/server.js'
import MapContainer from '../components/map'
import { Switch, Listbox, Transition } from '@headlessui/react'
import { CheckmarkOutline, CodeOutline } from 'react-ionicons'

const Activities = ({
	activities,
	tags,
	locations
}) => {

	const [acivityList, setAcivityList] = useState(activities && activities)
	const [addressList, setAddressList] = useState(null)
	const [mapHeight, setMapHeight] = useState(0)
	const [selectedLocation, setSelectedLocation] = useState(locations && locations[0])
	const [selectedDate, setSelectedDate] = useState()
	const [filtersPaid, setFiltersPaid] = useState()
	const [filtersFree, setFiltersFree] = useState()

	function getMapHeight() {
		setMapHeight(document.querySelector('#map').offsetHeight)
	}
	
	useEffect(() => {
		const getAddressList = () => { return acivityList && acivityList.map(act => new Object({ id_address: act.id_activity, longitude: act.longitude, latitude: act.latitude })) }
		setAddressList(getAddressList())
		getMapHeight()
		window.addEventListener('resize', () => {(typeof window !== undefined) && getMapHeight()} )
	}, [acivityList])

	useEffect(() => {
		const today = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
		document.querySelector('#dateMax').value = today
	}, [tags])

	const containerStyle = {
		position: 'relative',
		width: '384px',
		height: mapHeight
	}

	const center = {
		lat: 39.4702,
		lng: -0.376805
	}

	function getSelectedTags() {
		var array = []
		var checkboxes = document.querySelectorAll('input[name=tags_act]:checked')

		for(var i = 0; i < checkboxes.length; i++){
			array.push(checkboxes[i].value)
		}
		
		if(array.length == 0){
			return undefined
		}

		return array
	}

	const handleSubmit = async event => {
		event.preventDefault()

		const filteredActivities = await fetch(`${url}/api/filterActivitiesBy?location=${selectedLocation}&paid=${filtersPaid}&free=${filtersFree}&dateAct_max=${event.target.dateMax.value}&tags_act=${getSelectedTags()}`)
			.then(response => response.json())

		setAcivityList(filteredActivities)
	}

	return (
		<div className="flex flex-col w-full md:h-screen md:max-h-screen md:flex-grow-0 md:flex-shrink">
			<Navbar />
				
			<div className="relative flex flex-row w-full h-full flex-grow-0 overflow-hidden">

				{/* Filtros */}
				<div className="relative flex flex-col flex-shrink-0 w-72 h-full bg-gray-50 overflow-auto pb-16 border-r border-gray-100">

					<div className="flex flex-col px-6 py-10 w-72">
						<span className="text-3xl font-medium text-gray-700">Filtros</span>
						<span className="text-base font-regular text-gray-400">{acivityList.length} Resultados</span>
					</div>
					
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col">
							
							{/* Seleccion de Ubicacion */}
							{locations && (
								<div className="relative flex flex-col h-20 mx-6">
									<Listbox value={selectedLocation} onChange={setSelectedLocation}>
										<div className="relative">
											<Listbox.Button className="relative flex flex-row items-center w-full pl-3 py-2 pr-10 text-left bg-white rounded-lg border border-gray-200 cursor-pointer sm:text-sm outline-none">
												<div className="relative flex flex-col">
													<span className="block truncate text-sm font-regular text-gray-400">Ubicación</span>
													<span className="block truncate text-base font-medium text-gray-700">{selectedLocation}</span>
												</div>
												<span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
													<CodeOutline
														className="text-gray-400 transform rotate-90"
														color={''}
														height="16px"
														width="16px"
													/>
												</span>
											</Listbox.Button>
											<Transition
												as={Fragment}
												leave="transition ease-in duration-100"
												leaveFrom="opacity-100"
												leaveTo="opacity-0"
											>
												<Listbox.Options className="absolute w-full h-44 py-1 mt-1 overflow-auto text-base bg-white border border-gray-200 rounded-md shadow-card max-h-60 sm:text-sm outline-none">
													{locations.map((location, locationIdx) => (
														<Listbox.Option
															key={locationIdx}
															className={({ active }) => `${active ? 'text-gray-900 bg-gray-100' : 'text-gray-600'} cursor-pointer select-none relative py-2 pl-10 pr-4`}
															value={location}
														>
															{({ selected, active }) => (
																<>
																	<span className={`${selected ? 'font-medium text-gray-900' : 'font-normal'} block truncate`}>
																		{location}
																	</span>
																	{selected ? (
																		<span className="text-amber-600 absolute inset-y-0 left-0 flex items-center pl-3">
																			<CheckmarkOutline
																				className="text-gray-700"
																				color={''}
																				height="16px"
																				width="16px"
																			/>
																		</span>
																	) : null}
																</>
															)}
														</Listbox.Option>
													))}
												</Listbox.Options>
											</Transition>
										</div>
									</Listbox>
								</div>
							)}

							{/* Fecha */}
							<div className="flex flex-row items-center px-3 py-2 mx-3 mb-3">
								<div className="flex flex-col">
									<span className="text-sm font-medium text-gray-700">Fecha</span>
									<span className="text-base text-gray-400 mb-4">Desde hoy hasta</span>
									<input type="date" id="dateMax" name="dateMax" className="rounded-lg border border-gray-600 focus:border-gray-600"></input>
								</div>
							</div>

							{/* Precios */}
							<div className="flex flex-col justify-center px-3 py-2 w-68 h-32 mx-3 mb-3">
								<div className="flex flex-col justify-start mb-4">
									<label className="text-sm font-medium text-gray-700">Precio</label>
									<label className="text-base font-regular text-gray-400">Todos los precios</label>
								</div>

								<div className="flex flex-col pb-1 mb-2">
									<div className="flex flex-col mb-3 space-y-3">

										<div className="relative flex flex-row justify-start items-center">
											<Switch
												checked={filtersFree}
												onChange={setFiltersFree}
												className="flex flex-row items-center"
											>
												<div className={`${filtersFree ? 'bg-orange-500' : 'bg-white border border-gray-300'} relative flex flex-row justify-center items-center h-5 w-5 mr-2 rounded cursor-pointer`}>
													<CheckmarkOutline
														className={`${filtersFree ? '' : 'hidden'} right-3 top-2 cursor-pointer`}
														color={'#fff'}
														height="16px"
														width="16px"
													/>
												</div>
												<span>Gratis</span>
											</Switch>
										</div>

										<div className="relative flex flex-row justify-start items-center">
											<Switch
												checked={filtersPaid}
												onChange={setFiltersPaid}
												className="flex flex-row items-center"
											>
												<div className={`${filtersPaid ? 'bg-orange-500' : 'bg-white border border-gray-300'} relative flex flex-row justify-center items-center h-5 w-5 mr-2 rounded cursor-pointer`}>
													<CheckmarkOutline
														className={`${filtersPaid ? '' : 'hidden'} right-3 top-2 cursor-pointer`}
														color={'#fff'}
														height="16px"
														width="16px"
													/>
												</div>
												<span>De pago</span>
											</Switch>
										</div>

									</div>
								</div>
	
							</div>  	
							    
							{/* Tags */}
							<div className="flex flex-col px-3 py-2 w-68 mx-3">

								<div className="flex flex-row mb-4">
									<div className="flex flex-col">
										<label className="text-sm font-medium text-gray-700">Categoría</label>
										<label className="text-base font-regular text-gray-400">Todas las cateogorías</label>
									</div>
								</div>
								
								<div className="flex flex-col justify-center pb-1 space-y-3">	
									{
										tags.map((tag) => (
											<div className="flex flex-row items-center w-60" key={tag.id_tags}>
												<input className="items-center justify-center mr-2" type="checkbox" id={tag.id_tags} name="tags_act" value={tag.id_tags}/>
												<label className="text-base font-regular text-gray-700" htmlFor={tag.id_tags}>{tag.name}</label>
											</div>
										))
									}
								</div>

							</div>   
						</div>		
						
						{/* Botón */}
						<div className="fixed bottom-0 left-0 flex flex-col px-3 py-3 w-72 bg-gray-50">
							<button type="submit" className="btn-primary">Aplicar Filtros</button>
						</div>

					</form>	
					
				</div>

				{/* Actividades */}
				<div className="flex flex-col w-full h-full p-3 overflow-auto divide-y divide-gray-100">
				
					{ acivityList && acivityList.length > 0 ? (
						acivityList.map((act) => {
							return (
								<ActivityItem
									key={act.id_activity}
									activity={act}
								/>
							)
						}))
						:
						(
							<div className="flex flex-col w-full h-full items-center justify-center">
								<span>No hay resultados para esta búsqueda</span>
							</div>
						)
					}
				
				</div>

				{/* Mapa */}
				<div id="map" className="hidden xl:flex flex-col w-96 h-full max-h-full">
					<MapContainer
						containerStyle={containerStyle}
						center={center}
						zoom={12}
						addressList={addressList}
					/>
				</div>

			</div>

		</div>
	)
}

export async function getServerSideProps() {

	const activities = await fetch(`${url}/api/getAllActivities`)
		.then(response => response.json())

	const locations = await fetch(`${url}/api/getLocationWithActivities`)
	 	.then(response => response.json())
	 	.then(json => json.map(loc => loc.location))

	const tags = await fetch(`${url}/api/getAllTags`)
	 	.then(response => response.json())

	return {
  	props: {
	   	activities,
			tags,
			locations
   	}
	}
}

export default Activities