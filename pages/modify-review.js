import React, {useState} from 'react'
import url from '../utils/server'
import log from '../utils/log'

const ModifyReview = ({
	review
}) => {

    const [titleValue, setTitle] = useState(review.title)
    const [descriptionValue, setDescription] = useState(review.description)
    const [pointsValue, setPoints] = useState(review.points)
    const [photoValue, setPhoto] = useState('')

    const handleSubmit = async event => {
		event.preventDefault()	

        console.log('Modificando...')

		const res = await fetch(
			`${url}/api/updateReview`,{
				body: JSON.stringify({	
					id_review: review.id_review,
                    id_activity: review.id_activity,
                    points: pointsValue,
                    title: titleValue,
                    description: descriptionValue
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			})
			

	}
    
    return (
		<>
			<div >
				<div className="bg-gray-100 p-6 rounded-xl">
					<h1 className="text-2xl">Deje aquí qué le ha parecido: </h1>

					<form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
						<div>
							<label className="text-gray-800"htmlFor="title">Titulo: </label>
							<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text"
                                name="title"
                                value={titleValue}
                                onChange={ (event) => setTitle(event.target.value)}
                            />
						</div>
						<div>
							<div><label className="text-gray-800">Descripción: </label></div>
							<textarea className="resize-y rounded-lg border border-gray-600 focus:border-gray-600"id="description"
                                name="title"
							    value={descriptionValue}
							    onChange={ (event) => setDescription(event.target.value)}
                            />
						</div>
						<div>
							<label className="text-gray-800">Puntuación: </label>
							<select name="select" 
                                value = {pointsValue}
							    onChange = { (e) => setPoints(e.target.value)}
                            >
								<option value="0">0</option>
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
								value = {photoValue}
								onChange = { (e) => setPhoto(e.target.value)}
							/>		
						</div>
						<img className="object-cover w-16 h-16 mr-2 rounded-full" src={photoValue} alt="Imagen review"/>
						<button type="submit" className="rounded-full border-2 border-orange-500 hover:border-orange-500">Modificar Review</button>
					</form>
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps(ctx) {

	const {id} = ctx.query

	const review = await fetch(`${url}/api/getReviewByID?id_review=${id}`)
	 	.then(response => response.json())
	
	return {
		props: {
			review
		}
	}

}

export default ModifyReview