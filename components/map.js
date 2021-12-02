import React, { useState } from 'react'
import { Map, GoogleApiWrapper, InfoWindow,Marker } from 'google-maps-react'

const MapContainer = ({
	google,
	containerStyle,
	center,
	zoom,
	addressList
}) => {

	//const [selectedActivity, setSelectedActivity] = useState(null)

	const mapStyles = {
		width: '100%',
		height: '100%'
	}

	return (
		<div>
			<Map
				google = {google}
				zoom = {zoom}
				style = {mapStyles}
				initialCenter = {center}
				containerStyle = {containerStyle}
			>
			
				{
					addressList.map(activity => (
						<Marker
							key={activity.id_address}
							position={{
								lat: activity.latitude,
								lng: activity.longitude
							}}
						>
							<div>{console.log(activity.latitude)}</div>
						</Marker>
					))
				}

			</Map>
		</div>
		
	)
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyBQZ23z4oVQQOIPu7xZ6J8QWbgi7hspy2M',
	language: 'ES'
})(MapContainer)