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
		<div className="relative flex flex-col w-full h-full">
			<Map
				google = {google}
				zoom = {zoom}
				style = {mapStyles}
				mapId = {process.env.APIKEY_GOOGLE_MAP_ID}
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
						/>
					))
				}

			</Map>
		</div>
		
	)
}

export default GoogleApiWrapper({
	apiKey: process.env.NEXT_PUBLIC_APIKEY_GOOGLE,
	language: 'ES'
})(MapContainer)