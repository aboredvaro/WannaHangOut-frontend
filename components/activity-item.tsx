import React  from 'react'

const ActivityItem = (props) => {
	
	return (
		<>
			<div>
				<h1> 
					Activity: {props.title} </h1>
					Description: {props.description}
					Seats: {props.seats}
					Price: {props.price}
					Location: {props.location}
					Date: {props.dateAct}
					Duration (min): {props.min_duration}
			</div>
		</>
	)
}

export default ActivityItem

