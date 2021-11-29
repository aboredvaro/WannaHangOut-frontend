import React from 'react'

const ReviewItem = ({
    id_review,
    id_activity,
    id_entity,
    title,
    description,
    points,
    deleted
}) => {

    return (
        <>
           <a href={'/review?id=' + id_review} className="bg-gray-100 p-6 rounded-xl">
				<div className="bg-gray-100 p-6 rounded-xl">
                    <h1 className="text-2xl">{title}</h1>
                    <h2 className="text-1xl">{id_entity}</h2>
                    <p>{description}</p>
                    <p>{points}⭐</p>
                </div>
            </a>
        </>
    )

}

export default ReviewItem