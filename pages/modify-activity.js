import React, {useState} from 'react'
import url from '../utils/server'
import log from '../utils/log'

const ModifyActivity = ({
	activity,
	address,
	tags,
	tags_activity
}) => {

	// Refactorizar siguiente sprint
	const [titleValue, setTitle] = useState(activity.title)
	const [descriptionValue, setDescription] = useState(activity.description)
	const [seatsValue, setSeats] = useState(activity.seats)
	const [priceValue, setPrice] = useState(activity.price)
	const [dateValue, setDate] = useState(activity.date)
	const [durationValue, setDuration] = useState(activity.min_duration)
	const [tagsValue, setTags] = useState(tags_activity.id_tags)
	const [codPosValue, setCodPos] = useState(address.codPos.toString())
	const [locationValue, setLocation] = useState(address.location)
	const [directionValue, setDirection] = useState(address.direction)
	const [latitudeValue, setLatitude] = useState(address.latitude.toString())
	const [longitudeValue, setLongitude] = useState(address.longitude.toString())

	function getSelected(){
		var array = []
		var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

		for(var i = 0; i < checkboxes.length; i++){
			array.push(checkboxes[i].value)
		}

		return array
	}

	const handleSubmit = async event => {
		event.preventDefault()	

		const res = await fetch(
			`${url}/api/updateActivity`,{
				body: JSON.stringify({	
					id_activity: activity.id_activity,
					id_entity_creator: activity.id_entity_creator,
					title: event.target.title.value,
					description: event.target.description.value,
					seats: event.target.seats.value,
					price: event.target.price.value,
					dateAct: event.target.date.value,
					min_duration: event.target.duration.value,
					tags_act: getSelected(),
					deleted: 0,
					id_address: activity.id_address,
					codPos: event.target.postalcode.value,
					location: event.target.location.value,
					direction: event.target.direction.value,
					latitude: event.target.latitude.value,
					longitude: event.target.longitude.value
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			})
			.then(response => {
				window.location.href = 'http://localhost:3001/activities'	// Esto habria que cambiarlo es un poco gitano
			})

	}	

	return (
		<>
			<div className="font-sans w-full h-screen flex flex-col space-y-12 my-24 items-center">

				<h1 className="text-4xl font-medium">Modificar Actividad</h1>

				<form className="flex flex-col space-y-4" onSubmit={handleSubmit}>	
	
					<div>
						<label className="text-gray-800"htmlFor="title">Title </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="title"
							name="title"
							value={titleValue}
							onChange={ (event) => setTitle(event.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="description">Description </label>
						<textarea className="rounded-lg border border-gray-600 focus:border-gray-600" rows="3" cols="20"
							name="description"
							value={descriptionValue}
							onChange={ (event) => setDescription(event.target.value)}
						></textarea>
					</div>
					<div>
						<label htmlFor="seats">Seats </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="seats" 
							name="seats" 
							value={seatsValue}
							onChange={ (event) => setSeats(event.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="price">Price </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="price" 
							name="price" 
							value={priceValue}
							onChange={ (event) => setPrice(event.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="date">Date </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="date" id="date" 
							name="date" 
							value={dateValue}
							onChange={ (event) => setDate(event.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="duration">Duration in min </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="duration"
							name="duration" 
							value={durationValue}
							onChange={ (event) => setDuration(event.target.value)}
						/>
					</div>
					<div>
						<label >Choose tags: </label>
						{
							tags.map(({id_tags,name}, i) =>
								<div className="w-full sm:w-auto" key={i}>
									<label className="inline-flex items-center">
										<input className="form-radio" type="checkbox" id="tags_act" 
											name="tags_act" 
											value={id_tags}
										/>
										<span className="ml-2">{name}</span>
									</label>
								</div>
							)
						}
					</div>
					<div>
						<label htmlFor="postalcode">Postal code </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="postalcode" 
							name="postalcode"
							value={codPosValue}
							onChange={ (event) => setCodPos(event.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="location">Location </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="location" 
							name="location"
							value={locationValue}
							onChange={ (event) => setLocation(event.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="direction">Direction </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="direction" 
							name="direction" 
							value={directionValue}
							onChange={ (event) => setDirection(event.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="latitude">Latitude </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="latitude" 
							name="latitude" 
							value={latitudeValue}
							onChange={ (event) => setLatitude(event.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="longitude">Longitude </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="longitude" 
							name="longitude" 
							value={longitudeValue}
							onChange={ (event) => setLongitude(event.target.value)}
						/>
					</div>
					<button type="submit" className="rounded-full border-2 border-orange-500 hover:border-orange-500">Modificar</button>		
				</form>

			</div>
		</>
	)
}

export async function getServerSideProps(ctx){

	const {id} = ctx.query

	const activity = await fetch(`${url}/api/getActivityByID?id_activity=${id}`)
		.then(response => response.json())
	
	const tags = await fetch(`${url}/api/getAllTags`)
	 	.then(response => response.json())

	const address = await fetch(`${url}/api/getAddressByID?id_address=${activity.id_address}`)
		.then(response => response.json())

	const tags_activity = await fetch(
		`${url}/api/getTagsByIdAndType`,{
			body: JSON.stringify({	
				id: activity.id_activity,
				type: 2
			}),
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST'
		})
		.then(response => response.json())

	return{
		props:{
			activity,
			address,
			tags,
			tags_activity
		}
	}
}

export default ModifyActivity
