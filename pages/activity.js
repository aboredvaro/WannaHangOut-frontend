import React, { useState } from 'react'
import url from '../utils/server.js'
import log from '../utils/log.js'
import ActivityItem from '../components/activity-item.js'

const ActivityPage = ({
	activity
}) => {

	const deleteActivity = async event => {
		event.preventDefault()

		const res = await fetch(
			`${url}/api/deleteActivityById`,{
				body: JSON.stringify({	
					id_activity: activity.id_activity
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			})
			.then(response => console.log(response))
		//	.then(response => {
		//		window.location.href = 'http://localhost:3001/activities'	// Esto habria que cambiarlo es un poco gitano
		//	})
	}

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
					
					<form className="flex flex-col space-y-4">
						<button type="submit" className="rounded-full border-2 ">Modificar</button>
					</form>

					<form className="flex flex-col space-y-4" onSubmit={deleteActivity}>
						<button type="submit" className="rounded-full border-2 ">Borrar</button>
					</form>
					
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps(ctx) {

	const { id } = ctx.query

	const res = await fetch(`${url}/api/getActivityByID?id_activity=${id}`)
	 	.then(response => response.json())
	const activity = res
	
	return {
		props: {
			activity
		}
	}

}

export default ActivityPage