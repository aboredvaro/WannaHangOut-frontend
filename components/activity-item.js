import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const ActivityItem = ({
	activity
}) => {

	// const [entity,setEntity] = useState(null)
	// const [address,setAddress] = useState(null)
	//const [score,setScore] = useState(null)
	//const [urlImage, setUrlImage] = useState(null)

	var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
	
	useEffect(() => {
		const getProps = async() => {
			
			//const imageAux = await fetch(`${url}/api/getImageByIdActivity?id_activity=${3}&?cant=${1}`)
			//	.then(response => response.json())

			//console.log(imageAux)

			// const entityAux = await fetch(`${url}/api/getEntityByID?id_entity=${activity.id_entity_creator}`)
			// 	.then(response => response.json())

			// const addressAux = await fetch(`${url}/api/getAddressByID?id_address=${activity.id_address}`)
			// 	.then(response => response.json())

			//const scoreAux = await fetch(`${url}/api/getAverageScoreByEntityCreator?id_entity_creator=${activity.id_entity_creator}`)
			//.then(response => response.json())

			// setEntity(entityAux)
			// setAddress(addressAux)
			//setScore(scoreAux[1])
			//setUrlImage(imageAux)
		}

		getProps()
	})

	return (
		<div className="py-4">
			<Link href={`/activity?id=${activity.id_activity}`}>
				<a className="flex flex-row w-full p-3 space-x-4 justify-between">

					<div className="flex flex-col w-full justify-between">
						
						<div className="flex flex-col pb-3">
							<span className="text-2xl font-semibold text-gray-700">{activity.title}</span>
							<span className="text-sm font-regular text-orange-600">{  new Date(activity.dateAct).toLocaleDateString('es-ES', options)}</span>

							<div className="flex flex-row flex-wrap">
								<span className="text-sm font-regular text-gray-400 mr-2">Calle {activity && activity.direction}</span>
								<span className="text-sm font-bold text-gray-400 mr-2"> · </span>
								<span className="text-sm font-regular text-gray-400"> {activity && activity.location}</span>
							</div>
						</div>

						<div className="flex flex-row space-x-2 justify-between items-center">
							<Link href={`/profile?id=${activity.id_entity_creator}`}>
								<a className="flex flex-row space-x-2 items-center">
									<img className="object-cover w-8 h-8 rounded-full" src={activity && activity.avatar} alt="Foto Perfil"/>
									<div className="flex flex-col">
										<span className="text-sm font-medium text-gray-700">{activity && activity.name}</span>
										<span className="text-xs font-regular text-gray-400">3.4 sobre 5.0</span>
									</div>
								</a>
							</Link>

							<div className="flex flex-row space-x-2 items-end">
								{activity.ocupation > 0.75 && (
									<div className="flex flex-row items-center h-8 px-4 rounded-md bg-purple-100 bg-opacity-60 text-sm font-regular text-purple-600">Últimas plazas</div>
								)}	
								{activity.price === 0 && (
									<div className="flex flex-row items-center h-8 px-4 rounded-md bg-gray-100 text-sm font-regular text-gray-500">Gratis</div>
								)}
							</div>

						</div>

					</div>

					<div>
						<img className="object-cover w-96 h-auto rounded" src={activity && activity.urlPath} alt="Foto Actividad"/>
					</div>
				</a>
			</Link>
		</div>
	)
}

export default ActivityItem
