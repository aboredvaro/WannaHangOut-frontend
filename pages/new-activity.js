import React from 'react'
import url from '../utils/server'
import log from '../utils/log'
import { useRouter } from 'next/router'

const CreateActivity = ({
	tags
}) => {

	const router = useRouter()

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
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			})
			.then(response => console.log(response))
			.then(response => {
				router.push(`/activity?id=${response}`)
			})

	}

	return (
		<>
			<div className="font-sans w-full h-screen flex flex-col space-y-12 my-24 items-center">

				<h1 className="text-4xl font-medium">Crear Nueva Actividad</h1>
				<h3 className="text-xlxl font-medium">*Una vez creada la actividad, no sera posible editar fecha ni intereses*</h3>

				<form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
					<div>
						<label className="text-gray-800"htmlFor="id">Id (esto es solo por Sprint 2) </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="id" name="id" placeholder=""/>
					</div>
					<div>
						<label className="text-gray-800"htmlFor="title">Titulo </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="title" name="title" placeholder="Titulo"/>
					</div>
					<div>
						<label htmlFor="description">Descripcion </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="description" name="description" placeholder="Descripcion"/>
					</div>
					<div>
						<label htmlFor="seats">Aforo </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="seats" name="seats" placeholder="Aforo"/>
					</div>
					<div>
						<label htmlFor="price">Precio </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="price" name="price" placeholder="Precio"/>
					</div>
					<div>
						<label htmlFor="date">Fecha </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="date" id="date" name="date" />
					</div>
					<div>
						<label htmlFor="duration">Duracion </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="duration" name="duration" placeholder="Duracion"/>
					</div>
					<div>
						<label >Elige intereses: </label>
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
						<label htmlFor="postalcode">Codigo Postal </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="postalcode" name="postalcode" placeholder="Codigo Postal"/>
					</div>
					<div>
						<label htmlFor="location">Localidad </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="location" name="location" placeholder="Localidad"/>
					</div>
					<div>
						<label htmlFor="direction">Direccion </label>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="direction" name="direction" placeholder="Direccion"/>
					</div>
					<button type="submit" className="rounded-full border-2 border-orange-500 hover:border-orange-500">Crear</button>		
				</form>

			</div>
		</>
	)
}

export async function getServerSideProps(){

	const tags = await fetch(`${url}/api/getAllTags`)
	 	.then(response => response.json())

	return{
		props:{
			tags
		}
	}

}

export default CreateActivity
