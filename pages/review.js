import React, { useState, useEffect } from 'react'
import { useRouter} from 'next/router'
import url from '../utils/server.js'
import Link from 'next/link'
import log from '../utils/log.js'
import ReviewItem from '../components/review-item.js'
import { getSession } from '../utils/session.js'

const ReviewPage = ({
	review,
	fotos
}) => {
	const router = useRouter()

	console.log(fotos)

	const deleteReview = async event => {
		event.preventDefault()

		const res = await fetch(
			`${url}/api/deleteReviewById`,{
				body: JSON.stringify({	
					id_review: review.id_review
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			})
			.then(response => console.log(response))
			.then(router.push('/'))
	}

	return (
		<>
			<div className="w-full h-screen flex flex-col space-y-12 my-24 items-center">
        
				<h1 className="text-4xl font-medium">Review</h1>

				<div className="flex flex-col space-y-4">
                    <ReviewItem
                        key={review.id_review}
                        id_activity={review.id_activity}
                        id_entity={review.id_entity}
                        title={review.title}
                        description={review.description}
                        points={review.points}
                        deleted={review.deleted}
                    />
					{fotos.map((image) => {
						return (
							<img className="object-cover w-24 h-24 mr-2 " src={image.urlPath} alt="Imagen review"/>
						)})
					}
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps(ctx) {

	const {id} = ctx.query

	const review = await fetch(`${url}/api/getReviewByID?id_review=${id}`)
	 	.then(response => response.json())
	
	const fotos = await fetch(`${url}/api/getImageByIdReview?id_review=${id}`)
		.then(response => response.json())

	return {
		props: {
			review,
			fotos
		}
	}

}

export default ReviewPage