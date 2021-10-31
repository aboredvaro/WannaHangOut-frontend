import React, { useState } from 'react'
import url from '../utils/server.js'
import log from '../utils/log.js'
import ActivityItem from '../components/activity-item.js'

const ActivityPage = ({
	activity
}) => {

	module.exports = {
		async redirects() {
		  return [{
			  source: `${url}/api/deleteActivityById`,
			  destination: `${url}/api/activities`,
			  permanent: true,
			},
		  ]
		},
	  }

	const deleteActivity = async(event, id) => {
		event.preventDefault()

		const response = await fetch(
			`${url}/api/deleteActivityById`,{
				body: JSON.stringify({	
					id_activity: id
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			})
			.then(response => console.log(response))
			.then(response => response.json())

		redirects()
	}

	const modificateActivity = async(event, id) => {

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

					<form className="flex flex-col space-y-4" onSubmit={(event) => this.modificateActivity(event, activity.id_activity)}>
						<button type="submit" className="rounded-full border-2 ">Modificar</button>
					</form>

					<form className="flex flex-col space-y-4" onSubmit={(event) => this.deleteActivity(event, activity.id_activity)}>
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