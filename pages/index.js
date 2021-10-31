import React from 'react'

const Home = (props) => {
	return (
		<>
			<div className="w-full h-screen flex flex-col space-y-12 py-24 items-center font-medium">
        
				<h1 className="text-4xl">Wanna Hang Out</h1>

				<div className="flex flex-col space-y-2 items-center">
					<a href="login" className="text-xl text-orange-500">Log in</a>
					<a href="signup" className="text-xl text-orange-500">Sign up</a>
					<a href="profile" className="text-xl text-orange-500">Profile</a>
					<a href="activities" className="text-xl text-orange-500">Activities list</a>
					<a href="new-activity" className="text-xl text-orange-500">Create new activity</a>
				</div>

			</div>
		</>
	)
}

export default Home