import React, { useState, useEffect } from 'react'
import ActivityItem from '../components/activity-item.jsx'
import url from '../services/server.js'

const Home = (props) => {

	// Creamos const [activities, updateActivities] = useState([])
	//
	// Hacer fetch de ${url}/api/getAllActivities (con useEffect) -> then hace update de un useState (updateActivities)
	// Hacemos mapping del JSON que nos devuelve el fetch -> map(act => { <ActivityItem>})
	// 
	// En el primer render de la página usamos useEffect para cargar todas las actividades, y
	// cuando tengamos el formulario de filtros de actividades entonces hacemos otro
	// fetch pero con filterActivitiesBy(params) para aplicar los filtros deseados.
	// Este ultimo fetch actualiza el mismo useState updateActivities.

	const [activities, updateActivities] = useState([]) 

	useEffect(function (){
		fetch('${url}/api/getAllActivities')
			.then(res => res.json())
			.then(response => {
				const {data} = response
				const activities = data.map(act => {act.title, act.description, act.seats, act.price, act.location, act.dateAct, act.min_duration})
				updateActivities(activities)
			})
	}, [])

	return (
		<>
			<div className="w-full h-screen flex flex-col space-y-12 py-24 items-center font-medium">
        
				<h1 className="text-4xl">Lista de actividades</h1>
				<section className="App-content">
					{
						activities.map(singleActivity => {
							<ActivityItem 
								title={singleActivity.title}
								description={singleActivity.description}
								seats={singleActivity.seats}
								price={singleActivity.price}
								location={singleActivity.location}
								dateAct={singleActivity.dateAct}
								min_duration={singleActivity.min_duration}
							/>
						})
					}
				</section>
			</div>
		</>
	)
}

export default Home