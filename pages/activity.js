import React, { useState } from 'react'
import url from '../utils/server.js'

const ActivityPage = ({
	activity
}) => {

	return (
		<>
			<div className="w-full h-screen flex flex-col space-y-12 py-24 items-center font-medium">
        
				<h1 className="text-4xl">Página de actividad</h1>

			</div>
		</>
	)
}

export async function getServerSideProps(ctx) {

	/*
	const { id } = ctx.query

	const getAllActivities = async() => {
		return new Promise(resolve => {
			fetch(`${url}/api/getActivityByID/${id}`)
				.then(response => response.json())
				.then(response => {
					resolve(response)
				})
		})
	}

	const activity = await getAllActivities()

	return {
		props: {
			activity
		}
	}
	*/

}

export default ActivityPage
