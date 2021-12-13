import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import ActivityItem from '../components/activity-item'
import log from '../utils/log.js'
import url from '../utils/server.js'
import MapContainer from '../components/map'
import { Listbox } from '@headlessui/react'

const Activities = ({
	activities,
	locations,
	tags,
	addressList
}) => {
	
	const [mapHeight, setMapHeight] = useState(0)
	const [listActivities, setListActivities] = useState(activities)
	const [selectedLocation, setSelectedLocation] = useState(locations[0])

	function getMapHeight() {
		setMapHeight(document.querySelector('#map').offsetHeight)
	}
	
	useEffect(() => {
		getMapHeight()
		window.addEventListener('resize', () => {(typeof ifgetMapHeight !== undefined) && getMapHeight()} )
	})

	const containerStyle = {
		position: 'relative',
		width: '384px',
		height: mapHeight
	}

	const center = {
		lat: 39.4702,
		lng: -0.376805
	}

	function getSelectedTags(){
		var array = []
		var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

		for(var i = 0; i < checkboxes.length; i++){
			array.push(checkboxes[i].value)
		}
		
		if(array.length == 0){
			return undefined
		}

		return array
	}

	function getSelectedLocation(){
		var selectElement = document.querySelector('#location')
		var selected = selectElement.value

		if(selected == ''){
			return undefined
		}

		return selected
	}

	const handleSubmit = async event => {
		event.preventDefault()

		const res = await fetch(
			`${url}/api/filterActivitiesBy`,{
				body: JSON.stringify({
					location: getSelectedLocation(),
					price_min: event.target.precioMin.value, // ?
					price_max: event.target.precioMax.value, // ?
					min_duration_min: undefined, // No se le pasa
					min_duration_max: undefined, // No se le pasa
					seats_min: undefined, // No se le pasa
					seats_max: undefined, // No se le pasa
					dateAct_min: , // Fecha de hoy
					dateAct_max: event.target.dateMax.value, // Fecha del input
					id_tags: getSelectedTags(),
					id_entity_creator: undefined
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			})
			.then(response => response.json())

		var filteredActivities = res

		setListActivities(filteredActivities)
	}

	return (
		<div className="flex flex-col w-full md:h-screen md:max-h-screen md:flex-grow-0 md:flex-shrink">
			<Navbar />

			{/* TEST (BORRAR) */}
			<div className="hidden flex-row w-full h-full max-h-full overflow-hidden bg-green-100">
				<div className="h-screen"></div>
			</div>
				
			<div className="relative flex flex-row w-full h-full flex-grow-0 overflow-hidden">

				{/* Filtros */}
				<div className="relative flex flex-col flex-shrink-0 w-72 h-full bg-gray-50 overflow-auto pb-16 border-r border-gray-100">

					<div className="flex flex-col px-6 py-10 w-72">
						<label className="text-3xl font-medium text-gray-700">Filtros</label>
						<label className="text-base font-regular text-gray-400">{listActivities.length} Resultados</label>
					</div>
					
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col ">
							{/* Seleccion de Ubicacion 

							<div>
								<Listbox value={selectedLocation} onChange={setSelectedLocation}>
									<Listbox.Button>{selectedLocation}</Listbox.Button>
									<Listbox.Options>
										{
											locations.map(({location}, i) => 
												<Listbox.Option key={i} value={location}>{location}</Listbox.Option>
											)
										}
									</Listbox.Options>
								</Listbox>
							</div> 
							*/}

							<div className="flex flex-row items-center px-3 py-2 m-3 w-68 h-14 ">
							</div>

							{/* Fecha */}
							<div className="flex flex-row items-center px-3 py-2 mx-3 mb-3">
								<div className="flex flex-col">
									<label className="text-sm font-medium text-gray-700">Fecha </label>
									<input type="date" id="dateMax" name="dateMax" className="rounded-lg border border-gray-600 focus:border-gray-600"></input>
								</div>
							</div>

							{/* Precios */}
							<div className="flex flex-col justify-center px-3 py-2 w-68 h-32 mx-3 mb-3">
								<div className="flex flex-col justify-start mb-4">
									<label className="text-sm font-medium text-gray-700">Precio</label>
									<label className="text-base font-regular text-gray-400">Todos los precios</label>
								</div>

								<div className="flex flex-col pb-1 mx-3 mb-2">
									<div className="flex flex-row items-center mb-3">
										<input className="items-center justify-center mr-2" type="checkbox" id="precioGratis" name="precioGratis"/>
										<label className="text-base font-regular">Gratis</label>
									</div>
									<div className="flex flex-row items-center">
										<input className="items-center justify-center mr-2" type="checkbox" id="precioPago" name="precioPago"/>
										<label className="text-base font-regular">Pago</label>
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
								
								<div className="flex flex-col justify-center pb-1">	
									{
										tags.map(({id_tags,name}, i) =>		
											<div className="flex flex-row items-center w-60" key={i}>
												<input className="items-center justify-center mr-2" type="checkbox" id="tags_act" name="tags_act" value={id_tags}/>
												<label className="text-base font-regular text-gray-700">{name}</label>
											</div>
											
										)
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
				<div className="flex flex-col w-full h-full p-3 space-y-2 overflow-auto divide-y-2 divide-gray-100">
				
					{ listActivities && (
						listActivities.map(act=> {
							return (	
								<ActivityItem
									key={act.id_activity}
									activity={act}
								/>
							)
						})
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

	const tags = await fetch(`${url}/api/getAllTags`)
	 	.then(response => response.json())

	const addressList = await fetch(`${url}/api/getAllAddressOfActivities`)
	 	.then(response => response.json())

	return {
  	props:{
	   	activities,
			locations,
			tags,
			addressList
   		}
	}
}

export default Activities