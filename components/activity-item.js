import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import url from '../utils/server'

const ActivityItem = ({
	activity
}) => {

	const [entity,setEntity] = useState(null)
	const [address,setAddress] = useState(null)
	//const [score,setScore] = useState(null)

	useEffect(() => {
		const getProps = async() => {
			const entityAux = await fetch(`${url}/api/getEntityByID?id_entity=${activity.id_entity_creator}`)
				.then(response => response.json())

			const addressAux = await fetch(`${url}/api/getAddressByID?id_address=${activity.id_address}`)
				.then(response => response.json())

			//const scoreAux = await fetch(`${url}/api/getAverageScoreByEntityCreator?id_entity_creator=${activity.id_entity_creator}`)
			//.then(response => response.json())

			setEntity(entityAux)
			setAddress(addressAux)
		}

		getProps()
	})

	return (
		<>

			<Link href={`/activity?id=${activity.id_activity}`} passHref>
				<div className="flex flex-row w-full p-3 space-x-4 items-center bg-orange-100">

					<div className="flex flex-col h-full justify-between">
						
						<div className="flex flex-col">
							<label className="text-xl font-semibold text-gray-700">{activity.title}</label>
							<label className="text-xs font-regular text-orange-600">{new Date(activity.dateAct).toLocaleDateString()}</label>

							<div className="flex flex-row space-x-2">
								<label className="text-xs font-regular text-gray-400">Calle {address && address.direction}</label>
								<label className="text-xs font-bold text-gray-400"> · </label>
								<label className="text-xs font-regular text-gray-700"> {address && address.location}</label>
							</div>
						</div>

						<div className="flex flex-row">
							<img className="object-cover w-8 h-8 mr-2 rounded-full" src={entity && entity.avatar} alt="Foto Perfil"/>
							<div className="flex flex-row">
								<div className="flex flex-col">
									<label className="text-xs font-medium text-gray-700">{entity && entity.nick}</label>
									<label className="text-supporting-1 font-regular text-gray-400">3.4 sobre 5.0</label>
								</div>
							</div>

							<div className="flex flex-row">
								<div></div>
								<div></div>
							</div>

						</div>

					</div>

					<div>{/** FOTO ACTIVIDAD*/} </div>
				</div>
			</Link>

		</>
	)
}

export default ActivityItem

