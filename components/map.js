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

	return (
		<div className="relative flex flex-col w-full h-full">
			<Map
				google = {google}
				zoom = {zoom}
				mapId = '5790ab52515cbbb9'	// NO FURULA
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