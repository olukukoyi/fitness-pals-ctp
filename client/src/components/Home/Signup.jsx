import React from 'react'

function Signup() {
  return (
    <>
        <label htmlFor="my_modal_5" className="btn px-10 ">Sign Up</label>
        <input type="checkbox" id="my_modal_5" className="modal-toggle" />
        <div className="modal" role="dialog">
        <div className="modal-box">
        <div className="w-full p-6 m-auto lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center">Fitness Pals</h1>
            <form className="space-y-4">
                <div>
                    <label className="label">
                        <span className="text-base label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Name" className="w-full input input-bordered" />
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Email</span>
                    </label>
                    <input type="text" placeholder="Email Address" className="w-full input input-bordered" />
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Password</span>
                    </label>
                    <input type="password" placeholder="Enter Password"
                        className="w-full input input-bordered" />
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Confirm Password</span>
                    </label>
                    <input type="password" placeholder="Confirm Password"
                        className="w-full input input-bordered" />
                </div>
                <div className="my-10">
                    <button className="btn btn-block my-5">Sign Up</button>
                </div>
                <span>Already have an account ? 
                    <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">Login</a>
                </span>
            </form>
        </div>
            <div className="modal-action">
            <label htmlFor="my_modal_5" className="btn">Close!</label>
            </div>
        </div>
        </div>
    </>
  )
}

export default Signup