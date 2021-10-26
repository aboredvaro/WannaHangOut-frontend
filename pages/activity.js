import React, { useState } from 'react'
import url from '../utils/server.js'
import log from '../utils/log.js'
import ActivityItem from '../components/activity-item.js'

const ActivityPage = ({
	activity
}) => {

	return (
		<>
			<div className="w-full h-screen flex flex-col space-y-12 my-24 items-center">
        
				<h1 className="text-4xl font-medium">Actividad</h1>

				<div className="flex flex-col space-y-4">
					{
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
					}
					<button type="submit" className="rounded-full border-2 ">Modificate</button>
					<button type="submit" className="rounded-full border-2 ">Delete</button>
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps(ctx) {

	const { id } = ctx.query

	const res = await fetch(`${url}/api/getActivityByID?id_activity=${id}`)
	 	.then(response => response.json())
	log(res)
	const activity = res
	
	return {
		props: {
			activity
		}
	}

}

export default ActivityPage