import React  from 'react'
import url from '../utils/server.js'
import log from '../utils/log.js'

const ReviewItem = ({

}) => {
	return (
		<>
			<div className="w-full h-screen flex flex-col space-y-12 py-24 items-center font-medium">
				<div>
					<label className="text-gray-800"htmlFor="title">Titulo: </label>
					<input className="rounded-lg border border-gray-600 focus:border-gray-600"type="text" id="title" name="title" placeholder="Titulo"/>
				</div>
				<div>
					<div><label className="text-gray-800">Descripción: </label></div>
					<textarea className="resize-y rounded-lg border border-gray-600 focus:border-gray-600"id="description" name="description" placeholder=" Descripción"/>
				</div>
			</div>
		</>
	)
}

export default ReviewItem