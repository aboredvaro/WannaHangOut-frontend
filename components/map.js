import React, { useState } from 'react'
import { Map, GoogleApiWrapper, InfoWindow,Marker } from 'google-maps-react'

const MapContainer = ({
	google,
	latitude,
	longitude
}) => {

	const mapStyles = {
		width: '100%',
		height: '100%'
	}

	const containerStyle = {
		position: 'relative',
		width: '600px',
		height: '400px'
	}

	const center = {
		lat: latitude,
		lng: longitude
	  }

	return (
		<div>
			<Map
				google = {google}
				zoom = {16}
				style = {mapStyles}
				initialCenter = {{
					lat: latitude, 
					lng: longitude	
				}}
				containerStyle = {containerStyle}
			>
				<Marker
					position = {{
						lat: latitude, 
						lng: longitude	
					}}
				/>

			</Map>
		</div>
		
	)
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyBQZ23z4oVQQOIPu7xZ6J8QWbgi7hspy2M',
	language: 'ES'
})(MapContainer)