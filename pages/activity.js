import React, { useState } from 'react'
import url from '../utils/server.js'

const ActivityPage = ({
	activity
}) => {

	return (
		<>
			<div className="w-full h-screen flex flex-col space-y-12 py-24 items-center font-medium">
        
				<h1 className="text-4xl">Página de actividad</h1>
				<p className="mb-2 text-2xl font-medium">{activity.title} </p>
				<p className="mb-2 text-sm text-orange-500">{activity.date}</p>
				<p className="text-sm text-gray-400">{activity.location}</p>
				<p className="mb-2 text-sm text-gray-400">{activity.price}€</p>
				<p>Creado por {activity.id_entity_host} </p>

			</div>
		</>
	)
}

export async function getServerSideProps(ctx) {

	const { id } = ctx.query

	const getActivityByID = async() => {
		return new Promise(resolve => {
			fetch(`${url}/api/getActivityByID/${id}`)
			//	.then(res => console.log(res))
				.then(response => response.json())
				.then(response => {
					resolve(response)
				})
		})
	}

	const activity = await getActivityByID()

	return {
		props: {
			activity
		}
	}

}

export default ActivityPage

// Cosas que intentado entre otras 

/*
	const getActivityByID = async() => {
		return new Promise(resolve => {
			fetch(`${url}/api/getActivityByID/${id}`)
			//	.then(res => console.log(res))
				.then(response => response.json())  .text?
				.then(response => {
					resolve(response)
				})
		})
	}

	const activity = await getActivityByID()
*/

// - - - - - - - -

/*
 	const res = await fetch(`${url}/api/getActivityByID/${id}`)
	const activity = await res.json()

*/

// - - - - - - - - 

/**

const getFetch = async (invoicesUrl, params) => {
	return fetch(invoicesUrl, params)
}

export async function getServerSideProps(ctx) {

	const { id } = ctx.query

	const invoicesUrl = `${url}/api/getActivityByID/${id}`
  	const params = {
    	method: 'get', // post?
    	headers: {
     	 Accept: 'application/json',
    	'Content-Type': 'application/json',
    	}
  	}
  	
     	const activity = await getFetch(invoicesUrl, params)
     		console.log('Data Json: ', activity)

  	return { props: { activity } }

}
 */
