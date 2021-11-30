import React, { useState, useEffect } from 'react'
import {getSession} from '../utils/session.js'
import url from '../utils/server.js'
import log from '../utils/log.js'
import { useRouter } from 'next/router'


const CreateReviewItem = ({
	id_activity_prop
}) => {
	var userHash
	const router = useRouter()

	const [photoValue, setPhoto] = useState('')
	const [photoBox, setPhotoBox] = useState('')

	useEffect(() => {userHash = getSession()})

	const handleSubmit = async event => {
		event.preventDefault() 

		var loggedUser = await fetch(`${url}/api/getEntityByHash?entityHash=${userHash}`)
			.then(response => response.json())

		const res = await fetch(
			`${url}/api/createNewReview`,{
				body: JSON.stringify({	
					id_activity: id_activity_prop,
					id_entity: loggedUser.id_entity,
					points: event.target.select.value,
					title: event.target.title.value,
					description: event.target.description.value,
					img_review: photoValue
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			})
		if(res.ok){
			alert("Se ha añadido tu review")
			router.reload(window.location.pathname)
		}
		
	}

	return (
		<>
			<div >
				<div className="bg-gray-100 p-6 rounded-xl">
					<h1 className="text-2xl mb-4">Deje aquí qué le ha parecido: </h1>

					<form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
						<div>
							<label className="text-gray-800"htmlFor="title">Titulo: </label>
							<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="title" name="title" placeholder="Titulo"/>
						</div>
						<div>
							<div><label className="text-gray-800">Descripción: </label></div>
							<textarea className="resize-y rounded-lg border border-gray-600 focus:border-gray-600"id="description" name="description" placeholder=" Descripción"/>
						</div>
						<div>
							<label className="text-gray-800"htmlFor="title">Puntuación: </label>
							<select name="select">
								<option value="0" defaultValue>0</option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
							</select>
						</div>
						<div>
							<label className="text-gray-800"htmlFor="img">Imagen: </label>
							<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="avatar" name="photo" placeholder=" URL Foto"
								value={photoBox}
								onChange={(e) => setPhotoBox(e.target.value)}
							/>		
							<button type="button" onClick={
								(e) => {
									if(photoValue === '')setPhoto(photoBox)
									else setPhoto(photoValue + ',' + photoBox)
									setPhotoBox('')
								}
							}>Añadir foto</button>
						</div>

						{photoValue.split(",").map((image) => {
							return (
								<img className="object-cover w-16 h-16 mr-2 rounded-full" src={image} alt="Imagen review"/>
							)})
						}
						<button type="submit" className="rounded-full border-2 border-orange-500 hover:border-orange-500">Crear Review</button>
					</form>
				</div>
			</div>
		</>
	)

}

export default CreateReviewItem