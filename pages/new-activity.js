import React, { useState, useEffect, useRef } from 'react'
import url from '../utils/server'
import log from '../utils/log'
import { useRouter } from 'next/router'
import { session, getSession } from '../utils/session'

const CreateActivity = ({
	tags
}) => {

	const router = useRouter()

	const title = useRef()
	const description = useRef()
	const seats = useRef()
	const price = useRef()
	const date = useRef()
	const duration = useRef()
	const postalcode = useRef()
	const actlocation = useRef()
	const direction = useRef()

	const [sessionID, setSessionID] = useState()

	useEffect(() => {
		const getUserSession = async() => {
			!session() && router.push('/') // Redirect user if not logged in

			const userHash = getSession()
			
			setSessionID(await fetch(`${url}/api/getEntityByHash?entityHash=${userHash}`)
				.then(response => response.json())
				.then(response => response.id_entity))
		}
		getUserSession()
	})

	function getSelected(){
		var array = []
		var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

		for(var i = 0; i < checkboxes.length; i++){
			array.push(checkboxes[i].value)
		}

		return array
	}

	const handleSubmit = async () => {

		await fetch(
			`${url}/api/createNewActivity`,{
				body: JSON.stringify({
					id_entity_creator: sessionID,
					title: title.current.value,
					description: description.current.value,
					seats: seats.current.value,
					price: price.current.value,
					dateAct: date.current.value,
					min_duration: duration.current.value,
					tags_act: getSelected(),
					codPos: postalcode.current.value,
					location: actlocation.current.value,
					direction: direction.current.value,
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			}).then(response => {
			// router.push(`/activity?id=${response}`)
			router.push(`/profile?id=${sessionID}`)
		})

	}

	return (
		<div className={`${sessionID ? 'flex' : 'hidden'} flex-col w-full h-screen space-y-12 my-24 items-center`}>

			<h1 className="text-4xl font-medium">Crear Nueva Actividad</h1>

			<form className="flex flex-col space-y-4" id="form">
				<div>
					<label className="text-gray-800"htmlFor="title">Titulo </label>
					<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="title" name="title" placeholder="Titulo" ref={title}/>
				</div>
				<div>
					<label htmlFor="description">Descripcion </label>
					<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="description" name="description" placeholder="Descripcion" ref={description}/>
				</div>
				<div>
					<label htmlFor="seats">Aforo </label>
					<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="seats" name="seats" placeholder="Aforo" ref={seats}/>
				</div>
				<div>
					<label htmlFor="price">Precio </label>
					<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="price" name="price" placeholder="Precio"  ref={price}/>
				</div>
				<div>
					<label htmlFor="date">Fecha </label>
					<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="date" id="date" name="date" ref={date}/>
				</div>
				<div>
					<label htmlFor="duration">Duracion </label>
					<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="duration" name="duration" placeholder="Duracion" ref={duration}/>
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
					<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="postalcode" name="postalcode" placeholder="Codigo Postal" ref={postalcode}/>
				</div>
				<div>
					<label htmlFor="location">Localidad </label>
					<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="location" name="location" placeholder="Localidad" ref={actlocation}/>
				</div>
				<div>
					<label htmlFor="direction">Direccion </label>
					<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="direction" name="direction" placeholder="Direccion" ref={direction}/>
				</div>
				<div onClick={() => handleSubmit()} className="rounded-full border-2 flex flex-row justify-center cursor-pointer border-orange-500 hover:border-orange-500">Crear</div>		
			</form>

		</div>
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
