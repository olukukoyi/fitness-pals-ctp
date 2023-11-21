import React from 'react'
import pic1 from './assets/pic1.jpg'
import pic2 from './assets/pic2.jpg'
import pic3 from './assets/pic3.jpg'

function Home() {
  return (
    // Need to add a hero picture for the Home Page
    <div className='Home'>
      <div className="hero min-h-[60vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Fitness Pals</h1>
            <p className="py-6">The only app you'll need, for all your gym essential needs</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
      {/* Need to add photos for each card */}
      <div className="flex flex-row justify-evenly py-10">

        <div className="card w-96 bg-base-200 shadow-x1">
          <figure><img src={pic1} alt="Calorie Tracker" /></figure>
          <div className="card-body">
            <h2 className="card-title">Calorie Tracker</h2>
            <p>Check your current calorie intake and calorie goals!</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Go</button>
            </div>
          </div>
        </div>

        <div className="card w-96 bg-base-200 shadow-xl">
          <figure><img src={pic2} alt="Diary" /></figure>
          <div className="card-body">
            <h2 className="card-title">Diary</h2>
            <p>Check your personalized notes on your progress and calorie intake!</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Go</button>
            </div>
          </div>
        </div>

        <div className="card w-96 bg-base-200 shadow-xl">
          <figure><img src={pic3} alt="Blog" /></figure>
          <div className="card-body">
            <h2 className="card-title">Blog</h2>
            <p>Chat and discuss gym related topics with other Gym goers!</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Go</button>
            </div>
          </div>
        </div>
        
      </div>
      {/* Need footer, will wait to see what group thinks */}
    </div>
  )
}

export default Home