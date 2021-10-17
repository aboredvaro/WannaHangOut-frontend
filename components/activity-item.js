import React  from 'react'

const ActivityItem = ({
	id_activity,
	title,
	description,
	seats,
	price,
	location,
	dateAct,
	min_duration,
	id_entity_host
}) => {
	
	return (
		<>
			<a href={'/activity?id=' + id_activity} className="bg-gray-100 p-6 rounded-xl">
				<p className="mb-2 text-2xl font-medium">{title} </p>
				<p className="mb-2 text-sm text-orange-500">{dateAct}</p>
				<p className="text-sm text-gray-400">{location}</p>
				<p className="mb-2 text-sm text-gray-400">{price}€</p>
				<p>Creado por {id_entity_host} </p>
			</a>
		</>
	)
}

export default ActivityItem

