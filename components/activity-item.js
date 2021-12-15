import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const ActivityItem = ({
	activity
}) => {
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

	return (
		<div className="py-4">
			<Link href={`/activity?id=${activity.id_activity}`} passHref>
				<div className="flex flex-row w-full p-3 space-x-4 justify-between">

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
				</div>
			</Link>
		</div>
	)
}

export default ActivityItem
