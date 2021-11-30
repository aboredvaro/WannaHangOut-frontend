import React  from 'react'
import url from '../utils/server.js'
import log from '../utils/log.js'

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
	user,
    score
}) => {

    function AvgScore() {
		if(score == null) {
			return ' Aún no hay reviews'
		}
		else return score
	}

	return (
		<>
			<div className="bg-gray-100 p-6 rounded-xl">
			<a href={'/activity?id=' + id_activity} className="bg-gray-100 p-6 rounded-xl">
				<p className="mb-2 text-3xl font-medium">{title}</p>
				<p className="mb-2 text-xl font-medium">{description}</p>
				<p className="mb-2 text-sm text-orange-500">{new Date(dateAct).toLocaleDateString()}</p>
				<p className="mb-2 text-base text-gray-400">Aforo de {seats} personas</p>
				<p className="mb-2 text-sm text-gray-400">{price}€</p>
			</a>
				<a href={'/profile?id=' + id_entity_host} >
					<p className="text-sm text-gray-400">Entidad creadora: {id_entity_host}</p>
				</a>
				<p className="text-sm text-gray-400">Puntuación media: {AvgScore()}</p>
			</div>
		</>
	)
}
       
export default ActivityItem