import React, { useState, useEffect } from 'react'
import ActivityItem from '../components/activity-item'
import log from '../utils/log.js'
import url from '../utils/server.js'

const Activities = ({
	activities
}) => {

	return (
		<>
			<div className="w-full h-screen flex flex-col space-y-12 my-24 items-center">
        
				<h1 className="text-4xl font-medium">Lista de actividades</h1>

				<div className="flex flex-col space-y-4">
					{
						activities.map(activity => {
							return (

								<ActivityItem
									key={activity.id_activity}
									id_activity={activity.id_activity}
									title={activity.title}
									description={activity.description}
									id_entity_host={activity.id_entity_creador}
									seats={activity.seats}
									price={activity.price}
									location={activity.location}
									dateAct={activity.dateAct}
									min_duration={activity.min_duration}
								/>

							)
						})
					}
				</div>

			</div>
		</>
	)
}

export async function getServerSideProps() {

	const getAllActivities = async() => {
		return new Promise(resolve => {
			fetch(`${url}/api/getAllActivities`)
				.then(response => response.json())
				.then(response => {
					resolve(response)
				})
		})
	}

	const activities = await getAllActivities()

	return {
		props: {
			activities
		}
	}

}

export default Activities