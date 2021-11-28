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
            <div className="w-full h-screen flex flex-col space-y-12 py-24 items-center font-medium">
				<div className="bg-gray-100 p-6 rounded-xl">
                    <h1 className="text-2xl">{title}</h1>
                    <h2 className="text-1xl">{id_entity}</h2>
                    <p>{description}</p>
                    <p>{points}⭐</p>
                </div>
            </div>
        </>
    )

}

export default ReviewItem