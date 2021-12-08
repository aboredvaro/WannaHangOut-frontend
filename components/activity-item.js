import React  from 'react'
import Link from 'next/link'

const ActivityItem = ({
	id_activity,
	title,
	description,
	seats,
	price,
	location,
	dateAct,
	min_duration,
	id_entity_host,
	user
}) => {

	return (
		<>
			<a href={'/activity?id=' + id_activity} className="bg-gray-100 p-6 rounded-xl">
				<p className="mb-2 text-3xl font-medium">{title}</p>
				<p className="mb-2 text-xl font-medium">{description}</p>
				<p className="mb-2 text-sm text-orange-500">{new Date(dateAct).toLocaleDateString()}</p>
				<p className="mb-2 text-base text-gray-400">Aforo de {seats} personas</p>
				<p className="mb-2 text-sm text-gray-400">{price}€</p>
				<p className="mb-2 text-sm text-gray-400">{description}</p>
				<p className="mb-2 text-sm text-gray-400">{seats} asientos disponibles</p>
				<p className="mb-2 text-sm text-gray-400">{min_duration} minutos de duración</p>
			</div>
		</Link>
	)
}

export default ActivityItem

