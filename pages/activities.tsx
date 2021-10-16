import React, { useState, useEffect } from 'react'
import url from '../js/server.js'

const Home = (props) => {

	// Creamos const [activities, updateActivities] = useState([])
	//
	// Hacer fetch de ${url}/api/getAllActivities (con useEffect) -> then hace update de un useState (updateActivities)
	// Hacemos mapping del JSON que nos devuelve el fetch -> map(act => { <ActivityItem></ActivityItem> })
	// 
	// En el primer render de la página usamos useEffect para cargar todas las actividades, y
	// cuando tengamos el formulario de filtros de actividades entonces hacemos otro
	// fetch pero con filterActivitiesBy(params) para aplicar los filtros deseados.
	// Este ultimo fetch actualiza el mismo useState updateActivities.

	return (
		<>
			<div className="w-full h-screen flex flex-col space-y-12 py-24 items-center font-medium">
        
				<h1 className="text-4xl">Lista de actividades</h1>

			</div>
		</>
	)
}

export default Home