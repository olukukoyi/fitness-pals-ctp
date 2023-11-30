import React from 'react'

function Login() {
  return (
    <>
        <label htmlFor="my_modal_6" className="btn btn-ghost px-10 ">Login</label>
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal" role="dialog">
        <div className="modal-box">
        <div class="w-full p-6 m-auto lg:max-w-xl">
            <h1 class="text-3xl font-semibold text-center">Fitness Pals</h1>
            <form class="space-y-4">
                <div>
                    <label class="label">
                        <span class="text-base label-text">Email</span>
                    </label>
                    <input type="text" placeholder="Email Address" class="w-full input input-bordered" />
                </div>
                <div>
                    <label class="label">
                        <span class="text-base label-text">Password</span>
                    </label>
                    <input type="password" placeholder="Enter Password"
                        class="w-full input input-bordered" />
                </div>
                <div className="my-10">
                    <button class="btn btn-block my-5">Login</button>
                </div>
                <span> 
                    <a href="#" class="text-blue-600 hover:text-blue-800 hover:underline">Forgot Password ?</a>
                </span>
            </form>
        </div>
            <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">Close!</label>
            </div>
        </div>
        </div>
    </>
  )
}

export default Login