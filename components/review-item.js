import React from 'react'

const ReviewItem = ({
    id_review,
    id_activity,
    id_entity,
    title,
    description,
    points,
    deleted,
    userId
}) => {

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

    var reviewIsMine = parseInt(userId) == id_entity
    console.log(reviewIsMine)

    function showModifyDelete() {
        if(reviewIsMine) {
            return(
                <>
                    <a
						href = {'/modify-review?id='+ id_review}
						className="flex flex-col space-y-4"
					>
						<button className="rounded-full border-2 ">Modificar</button>
					</a>

					<form className="flex flex-col space-y-4" onSubmit={deleteReview}>
						<button type="submit" className="rounded-full border-2 ">Borrar</button>
					</form>
                </>
            )
        }
    }

    return (
        <>
           <div className="bg-gray-100 p-6 rounded-xl">
				<div className="bg-gray-100 p-6 rounded-xl">
                    <h1 className="text-2xl">{title}</h1>
                    <h2 className="text-1xl">{id_entity}</h2>
                    <p>{description}</p>
                    <p>{points}⭐</p>
                </div>
                {showModifyDelete()}
            </div>
        </>
    )

}

export default ReviewItem