import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import url from '../utils/server'
import image from 'next/image'

const ActivityItem = ({
	activity
}) => {

	const [entity,setEntity] = useState(null)
	const [address,setAddress] = useState(null)
	//const [score,setScore] = useState(null)
	//const [urlImage, setUrlImage] = useState(null)

	var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
	
	useEffect(() => {
		const getProps = async() => {
			const entityAux = await fetch(`${url}/api/getEntityByID?id_entity=${activity.id_entity_creator}`)
				.then(response => response.json())

			const addressAux = await fetch(`${url}/api/getAddressByID?id_address=${activity.id_address}`)
				.then(response => response.json())

			//const scoreAux = await fetch(`${url}/api/getAverageScoreByEntityCreator?id_entity_creator=${activity.id_entity_creator}`)
			//.then(response => response.json())

			//const imageAux = await fetch(`${url}/api/getImagesOfActivity?id_activity=${3}`)
			//	.then(response => response.json)

			setEntity(entityAux)
			setAddress(addressAux)
			//setUrlImage(image)
		}

		getProps()
	})

	return (
		<>

			<Link href={`/activity?id=${activity.id_activity}`} passHref>
				<div className="flex flex-row w-full p-3 space-x-4 items-center">

					<div className="flex flex-col h-full justify-between">
						
						<div className="flex flex-col pb-3">
							<label className="text-xl font-semibold text-gray-700">{activity.title}</label>
							<label className="text-xs font-regular text-orange-600">{  new Date(activity.dateAct).toLocaleDateString('es-ES', options)}</label>

							<div className="flex flex-row space-x-2">
								<label className="text-xs font-regular text-gray-400">Calle {address && address.direction}</label>
								<label className="text-xs font-bold text-gray-400"> · </label>
								<label className="text-xs font-regular text-gray-700"> {address && address.location}</label>
							</div>
						</div>

						<div className="flex flex-row space-x-2 items-center">
							<div className="flex flex-row space-x-2 ">
								<img className="object-cover w-8 h-8 rounded-full" src={entity && entity.avatar} alt="Foto Perfil"/>
								<div className="flex flex-col">
									<label className="text-xs font-medium text-gray-700">{entity && entity.nick}</label>
									<label className="text-supporting-2 font-regular text-gray-400">3.4 sobre 5.0</label>
								</div>
							</div>

							<div className="flex flex-row space-x-2 items-end">
								{activity.seats < 20 ?
									<div className="flex flex-row px-2 rounded-md bg-purple-50 text-sm font-regular text-purple-600">Últimas plazas</div> :
									<div className="flex flex-row px-2 rounded-md bg-white  text-sm font-regular text-white">Ultimas plazas</div>
								}	
								{activity.price == 0 ? 
									<div className="flex flex-row px-2 items-center justify-center rounded-md bg-gray-50 text-sm font-regular text-gray-500">Gratis</div> :
								 	<div className="flex flex-row px-2 items-center justify-center rounded-md bg-green-50 text-sm font-regular text-green-600">{activity.price}€</div>
								}
							</div>

						</div>

					</div>

					<div>
						{/** FOTO ACT */}
					</div>
				</div>
			</Link>

		</>
	)
}

export default ActivityItem

