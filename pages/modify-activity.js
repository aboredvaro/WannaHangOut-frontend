import React, {useState} from 'react'
import url from '../utils/server'
import log from '../utils/log'

const ModifyActivity = ({
	activity,
	address
}) => {

	// Refactorizar siguiente sprint
	const [titleValue, setTitle] = useState(activity.title)
	const [descriptionValue, setDescription] = useState(activity.description)
	const [seatsValue, setSeats] = useState(activity.seats)
	const [priceValue, setPrice] = useState(activity.price)
	const [durationValue, setDuration] = useState(activity.min_duration)

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
					dateAct: activity.dateAct,
					min_duration: event.target.duration.value,
					tags_act: [],
					deleted: 0,
					id_address: activity.id_address,
					codPos: address.codPos,
					location: address.location,
					direction: address.direction,
					latitude: address.latitude,
					longitude: address.longitude
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			})
			.then(response => console.log(response))
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
						<label className="text-gray-800"htmlFor="title">Titulo </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="title"
							name="title"
							value={titleValue}
							onChange={ (event) => setTitle(event.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="description">Descripcion </label>
						<textarea className="rounded-lg border border-gray-600 focus:border-gray-600" rows="3" cols="20"
							name="description"
							value={descriptionValue}
							onChange={ (event) => setDescription(event.target.value)}
						></textarea>
					</div>
					<div>
						<label htmlFor="seats">Aforo </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="seats" 
							name="seats" 
							value={seatsValue}
							onChange={ (event) => setSeats(event.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="price">Precio </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="price" 
							name="price" 
							value={priceValue}
							onChange={ (event) => setPrice(event.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="duration">Duracion(min) </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="duration"
							name="duration" 
							value={durationValue}
							onChange={ (event) => setDuration(event.target.value)}
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
	
	const address = await fetch(`${url}/api/getAddressByID?id_address=${activity.id_address}`)
		.then(response => response.json())


	return{
		props:{
			activity,
			address
		}
	}
}

export default ModifyActivity
