import React, {useState} from 'react'
import Navbar from '../components/navbar'
import ActivityItem from '../components/activity-item'
import log from '../utils/log.js'
import url from '../utils/server.js'
import MapContainer from '../components/map'
import { Listbox } from '@headlessui/react'

const Activities = ({
	activities,
	locations,
	entities,
	tags,
	addressList
}) => {

	console.log(locations)
	
	const [listActivities, setListActivities] = useState(activities)
	const [selectedLocation, setSelectedLocation] = useState(locations[0])
	
	const containerStyle = {
		position: 'relative',
		width: '384px',
		height: '720px'
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

	function getSelectedEntity(){
		var selectElement = document.querySelector('#id_entity')
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
					price_min: event.target.precioMin.value,
					price_max: event.target.precioMax.value,
					min_duration_min: event.target.duracionMin.value,
					min_duration_max:event.target.duracionMax.value,
					seats_min: event.target.plazasMin.value, 
					seats_max: event.target.plazasMax.value,
					dateAct_min: event.target.dateMin.value,
					dateAct_max: event.target.dateMax.value,
					id_tags: getSelectedTags(),
					id_entity_creator: getSelectedEntity()
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
		<>
			<Navbar />
				
			<div className="flex flex-row">

				{/* Filtros*/} 
				<div className="flex flex-col items-start justify-start w-72 h-180 bg-gray-50">

					<div className="flex flex-col p-6 pt-10">
						<h1 className="text-3xl font-medium text-gray-700">Filtros</h1>
						<h2 className="text-base font-regular text-gray-400">{listActivities.length} resultados</h2>
					</div>

					<div className="flex flex-col">
						<form onSubmit={handleSubmit}>

							{/* Seleccion de Ubicacion */}
							<div className="flex flex-col">
								<div className="flex flex-col">
									<label className="text-sm font-medium text-gray-700">Ubicación </label>
									<label className="text-base font-regular text-gray-400">Valencia </label>
								</div>
								
								<select id='location'>
									<option></option>
									{
										locations.map(({location}, i) => 
											<option key={i} value={location}>{location}</option>
										)
									}
								</select>
							</div>  

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

							<div>
								<label>PRECIOS (€) </label>
								<label className="text-gray-800"htmlFor="precioMin">Desde  </label>
								<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="precioMin" name="precioMin" placeholder="0"/>
								<label className="text-gray-800"htmlFor="precioMax"> Hasta </label>
								<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="precioMax" name="precioMax" placeholder=""/>
							</div>    
							<div>
								<label>DURACION (min) </label>
								<label className="text-gray-800"htmlFor="duracionMin">Desde  </label>
								<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="duracionMin" name="duracionMin" placeholder="0"/>
								<label className="text-gray-800"htmlFor="duracionMax"> Hasta </label>
								<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="duracionMax" name="duracionMax" placeholder=""/>
							</div>
							<div>
								<label>Plazas </label>
								<label className="text-gray-800"htmlFor="plazasMin">Desde  </label>
								<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="plazasMin" name="plazasMin" placeholder="0"/>
								<label className="text-gray-800"htmlFor="plazasMax"> Hasta </label>
								<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="plazasMax" name="plazasMax" placeholder=""/>
							</div>        
							<div>
								<label>Fecha </label>
								<input type="date" id="dateMin" name="dateMin" className="rounded-lg border border-gray-600 focus:border-gray-600"></input>
								<input type="date" id="dateMax" name="dateMax" className="rounded-lg border border-gray-600 focus:border-gray-600"></input>
							</div>
							    
							<div>
								<label >Intereses: </label>
								{
									tags.map(({id_tags,name}, i) =>
										<div className="w-full sm:w-auto" key={i}>
											<label className="inline-flex items-center">
												<input className="form-radio" type="checkbox" id="tags_act" name="tags_act" value={id_tags}/>
												<span className="ml-2">{name}</span>
											</label>
										</div>
									)
								}
							</div>   

							<button type="submit" className="rounded-full border-2 border-orange-500 hover:border-orange-500">Aplicar Filtros</button>

						</form>
					</div>	
					
				</div>

				{/* Actividades */}

				<div cassName="flex flex-row item-center justify-center bg-gray-200">
					
					<div className="flex flex-col space-y-4">
						{
							listActivities.map(activity => {
								return (	// añadir mensaje si no hay ninguna actividad
									<ActivityItem
										key={activity.id_activity}
										id_activity={activity.id_activity}
										title={activity.title}
										description={activity.description}
										id_entity_host={activity.id_entity_creador}
										seats={activity.seats}
										price={activity.price}
										location={activity.location}
										dateAct={activity.dateAct}
										min_duration={activity.min_duration}
									/>
								)
							})
						}
					</div>
				</div>

				{/** Mapa */}
				<div className="flex flex-row items-start justify-end">
					<MapContainer 
						containerStyle={containerStyle}
						center={center}
						zoom={12}
						addressList={addressList}
					/>
				</div>

			</div>

		</>
	)
}

export async function getServerSideProps() {

	const activities = await fetch(`${url}/api/getAllActivities`)
		.then(response => response.json())

	const locations = await fetch(`${url}/api/getLocationWithActivities`)
		.then(response => response.json())

	const entities = await fetch(`${url}/api/getEntitiesWithActivities`)
		.then(response => response.json())

	const tags = await fetch(`${url}/api/getAllTags`)
	 	.then(response => response.json())

	const addressList = await fetch(`${url}/api/getAllAddressOfActivities`)
	 	.then(response => response.json())

	return {
  	props:{
	   	activities,
			locations,
			entities,
			tags,
			addressList
   		}
	}
}

export default Activities