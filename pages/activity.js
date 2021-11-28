import React, { useState } from 'react'
import url from '../utils/server.js'
import Link from 'next/link'
import log from '../utils/log.js'
import ActivityItem from '../components/activity-item.js'
import MapContainer from '../components/map'
import {  GoogleApiWrapper } from 'google-maps-react'

const ActivityPage = ({
	activity,
	address
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
			.then(response => {
				window.location.href = 'http://localhost:3001/activities'	// Esto habria que cambiarlo es un poco gitano
			})
	}

	const lat = address.longitude	// Estan al reves 
	const long = address.latitude

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

					<div className="flex flex-col items-center justify-center">
					<MapContainer 
						latitude = {lat}
						longitude = {long}
					/>
					</div>

					<Link href = {{
							pathname:"/modify-activity",
							query: {id : `${activity.id_activity}`},
						}}
					>
						<button className="rounded-full border-2 ">Modificar</button>
					</Link>

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

	const address = await fetch(`${url}/api/getAddressByID?id_address=${activity.id_address}`)
		.then(response => response.json())

	return {
		props: {
			activity,
			address
		}
	}

}

export default ActivityPage