import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import url from '../utils/server.js'
import Link from 'next/link'
import log from '../utils/log.js'
import ActivityItem from '../components/activity-score-item.js'
import MapContainer from '../components/map'
import CreateReviewItem from'../components/create-review-item.js'
import ReviewItem from '../components/review-item.js'
import { session, getSession } from '../utils/session.js'

const ActivityPage = ({
	activity,
	actScore,
	reviewsList,
	address
}) => {
	const router = useRouter()

	var addressList = []	// array para que pueda usarse el mapa
	addressList.push(address)

	const containerStyle = {
		position: 'relative',
		width: '600px',
		height: '400px'
	}

	const center = {
		lat: address.latitude,
		lng: address.longitude
	}

	const [isLogged, setIsLogged] = useState(false)
	const [sessionID, setSessionID] = useState()

	useEffect(() => {
		const getUserSession = async() => {
			setIsLogged(session())

			const userHash = getSession()
			const userID = await fetch(`${url}/api/getEntityByHash?entityHash=${userHash}`)
				.then(response => response.json())
				.then(response => response.id_entity)
			
			setSessionID(userID)
		}
		getUserSession()
	}, [])

	const [participated, setParticipated] = useState(false)

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
			.then(router.push('/activities'))
	}

	function pastDate() {
		const today = new Date()
		return ((new Date(activity.dateAct)) < today)
	}

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
							id_entity_host={activity.id_entity_creator}
							seats={activity.seats}
							price={activity.price}
							location={activity.location}
							dateAct={activity.dateAct}
							min_duration={activity.min_duration}
							score={actScore[0].media}
						/>
					}

					<div className="flex flex-col items-center justify-center">
						<MapContainer 
							containerStyle={containerStyle}
							center={center}
							zoom={15}
							addressList={addressList}
						/>
					</div>

					{(sessionID === activity.id_entity_creator) &&
						<>
							<Link href={`/modify-activity?id=${activity.id_activity}`}>
								<a className="rounded-full border-2 text-center cursor-pointer">Modificar</a>
							</Link>
							<form className="flex flex-col space-y-4" onSubmit={deleteActivity}>
								<button type="submit" className="rounded-full border-2 ">Borrar</button>
							</form>
						</>
					}
					
					{
						(isLogged && participated && pastDate()) && (
							<CreateReviewItem 
								id_activity_prop={activity.id_activity}
							/>
						)
					}

					{reviewsList.map(review => {
						return (
							<ReviewItem
								key={review.id_review}
								id_review={review.id_review}
								id_activity={review.id_activity}
								id_entity={review.id_entity}
								title={review.title}
								description={review.description}
								points={review.points}
								deleted={review.deleted}
								userId={sessionID}
							/>)
					})
					}
					
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps(ctx) {

	const {id} = ctx.query

	const res = await fetch(`${url}/api/getActivityByID?id_activity=${id}`)
	 	.then(response => response.json())
	const activity = res

	const address = await fetch(`${url}/api/getAddressByID?id_address=${activity.id_address}`)
		.then(response => response.json())
	
	const actScore = await fetch(`${url}/api/getAverageScoreByActivities?id_activity=${id}`)
		.then(response => response.json())

	const reviewsList = await fetch(`${url}/api/getAllReviewByActivityID?id_activity=${id}`)
		.then(response => response.json())

	return {
		props: {
			activity,
			address,
			actScore,
			reviewsList
		}
	}

}

export default ActivityPage