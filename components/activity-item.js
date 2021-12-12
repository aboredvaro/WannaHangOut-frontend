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

			<Link href={`/activity?id=${id_activity}`} passHref>
				<div className="flex flex-row w-full p-3 space-x-4 bg-red-600">

					<div className="flex flex-col">
						
						<div className="flex flex-col">
							<label className="text-xl font-semibold text-gray-700">{title}</label>
							<label className="text-xs font-regular text-orange-600">{new Date(dateAct).toLocaleDateString()}</label>

							<div className="flex flex-row">
								<label className="text-xs font-regular text-gray-400">Calle Ejemplo, 10</label>
								<label className="text-xs font-bold text-gray-400"> * </label>
								<label className="text-xs font-regular text-gray-700">Valencia</label>
							</div>
						</div>

						<div className="flex flex-row">

							<div className="flex flex-row">
								{/** FOTO PERFIL */}

								<div className="flex flex-col">
									<label className="text-xs font-medium text-gray-700">Nombre Creador</label>
									<label className="text-supporting-1 font-regular text-gray-400">Puntuacion Actividad</label>
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

