import React, { useState } from 'react'
import { useRouter } from 'next/router'
import url from '../utils/server.js'
import Link from 'next/link'
import log from '../utils/log.js'
import ActivityItem from '../components/activity-score-item.js'
import CreateReviewItem from'../components/create-review-item.js'
import ReviewItem from '../components/review-item.js'

const ActivityPage = ({
	activity,
	actScore,
	reviewsList
}) => {
	const router = useRouter()
	
	console.log(reviewsList)

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

	return (
		<>
			<div className="w-full h-screen flex flex-col space-y-12 my-24 items-center">
        
				<h1 className="text-4xl font-medium">Actividad</h1>

				<div className="flex flex-col space-y-4">
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
					<Link
						href = {{
							pathname: '/modify-activity',
							query: {id : `${activity.id_activity}`},
						}}
					>
						<button className="rounded-full border-2 ">Modificar</button>
					</Link>

					<form className="flex flex-col space-y-4" onSubmit={deleteActivity}>
						<button type="submit" className="rounded-full border-2 ">Borrar</button>
					</form>

					<CreateReviewItem id_activity_prop={activity.id_activity}/>

					
					{
						reviewsList.map(review => {
							return (	// añadir mensaje si no hay ninguna actividad
								<ReviewItem
									key={review.id_review}
									id_activity={review.id_activity}
    								id_entity={review.id_entity}
    								title={review.title}
    								description={review.description}
    								points={review.points}
    								deleted={review.deleted}
								/>
							)
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

	const actScore = await fetch(`${url}/api/getAverageScoreByActivities?id_activity=${id}`)
		.then(response => response.json())
	console.log(actScore)

	const reviewsList = await fetch(`${url}/api/getAllReviewByActivityID?id_activity=${id}`)
		.then(response => response.json())

	return {
		props: {
			activity,
			actScore,
			reviewsList
		}
	}

}

export default ActivityPage