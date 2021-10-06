/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'

const Home = (props) => {
  return (
    <>
      <div className="w-full h-screen flex flex-col space-y-12 py-24 items-center font-medium">
        
        <h1 className="text-4xl">Wanna Hang Out</h1>

        <div className="flex flex-col space-y-2 items-center">
          <a href="login" className="text-xl text-orange-500">Log in</a>
          <a href="signup" className="text-xl text-orange-500">Sign up</a>
          <a href="discover" className="text-xl text-orange-500">Activity search</a>
          <a href="new" className="text-xl text-orange-500">Create new activity</a>
        </div>

      </div>
    </>
  )
};

export default Home;
  