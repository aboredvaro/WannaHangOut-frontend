import React from 'react'
import url from '../utils/server'
import log from '../utils/log'

const CreateActivity = ({
	tags
}) => {

	function getSelected(){
		var array = []
		var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

		for(var i = 0; i < checkboxes.length; i++){
			array.push(checkboxes[i].value)
		}
		log(array)

		return array
	}

	const handleSubmit = async event => {
		event.preventDefault()	

		const res = await fetch(
			`${url}/api/createNewActivity`,{
				body: JSON.stringify({	
					id_entity_creator: event.target.id.value,	// Esto para el siguiente sprint hay que hacerlo automatico
					title: event.target.title.value,
					description: event.target.description.value,
					seats: event.target.seats.value,
					price: event.target.price.value,
					dateAct: event.target.date.value,
					min_duration: event.target.duration.value,
					tags_act: getSelected(),
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
			.then(response => console.log(response))
			.then(response => {
				window.location.href = 'http://localhost:3001/activities'	// Esto habria que cambiarlo es un poco gitano
			})

	}

	return (
		<>
			<div className="font-sans w-full h-screen flex flex-col space-y-12 my-24 items-center">

				<h1 className="text-4xl font-medium">Create New Activity</h1>

				<form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
					<div>
						<label className="text-gray-800"htmlFor="id">Id (esto es solo por Sprint 2) </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="id" name="id" placeholder="Id_Creator"/>
					</div>
					<div>
						<label className="text-gray-800"htmlFor="title">Title </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="title" name="title" placeholder="Title"/>
					</div>
					<div>
						<label htmlFor="description">Description </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="description" name="description" placeholder="Description"/>
					</div>
					<div>
						<label htmlFor="seats">Seats </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="seats" name="seats" placeholder="Seats"/>
					</div>
					<div>
						<label htmlFor="price">Price </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="price" name="price" placeholder="Price"/>
					</div>
					<div>
						<label htmlFor="date">Date </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="date" id="date" name="date" />
					</div>
					<div>
						<label htmlFor="duration">Duration in min </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="duration" name="duration" placeholder="Duration"/>
					</div>
					<div>
						<label >Choose tags: </label>
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
					<div>
						<label htmlFor="postalcode">Postal code </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="postalcode" name="postalcode" placeholder="Postal Code"/>
					</div>
					<div>
						<label htmlFor="location">Location </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="location" name="location" placeholder="Location"/>
					</div>
					<div>
						<label htmlFor="direction">Direction </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="direction" name="direction" placeholder="Direction"/>
					</div>
					<div>
						<label htmlFor="latitude">Latitude </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="latitude" name="latitude" placeholder="Latitude"/>
					</div>
					<div>
						<label htmlFor="longitude">Longitude </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="longitude" name="longitude" placeholder="Longitude"/>
					</div>
					<button type="submit" className="rounded-full border-2 border-orange-500 hover:border-orange-500">Create</button>		
				</form>

			</div>
		</>
	)
}

export async function getServerSideProps(){

	const res = await fetch(`${url}/api/getAllTags`)
	 	.then(response => response.json())
	const tags = res

	return{
		props:{
			tags
		}
	}

}

export default CreateActivity
