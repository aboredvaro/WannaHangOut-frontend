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
			<a href={'/activity?id=' + id_activity} className="bg-gray-100 p-6 rounded-xl">
				<p className="mb-2 text-2xl font-medium">{title} </p>
				<p className="mb-2 text-sm text-orange-500">{dateAct}</p>
				<p className="text-sm text-gray-400">{location}</p>
				<p className="mb-2 text-sm text-gray-400">{price}€</p>
			</a>
            <a href={'/profile?id=' + id_entity_host} className="bg-gray-100 p-6 rounded-xl">
                <p className="text-sm text-gray-400">Entidad creadora: {id_entity_host}</p>
            </a>
            <p className="text-sm text-gray-400">Puntuación media: {AvgScore()}</p>
		</>
	)
}
       
export default ActivityItem