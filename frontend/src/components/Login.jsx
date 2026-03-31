import { useState } from 'react'
import ospar1Logo from '../assets/ospar1logo.png'
import nursesdoctor from '../assets/nursesdoctor.png'
import loginscreen from '../assets/loginscreen.jpg'

const Login = () => {

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
  }

  const handleContextMenu = (e) => {
  e.preventDefault(); // Prevents the default right-click menu
  };

  return (
    <div onContextMenu={handleContextMenu} className='flex justify-center items-center w-full h-screen py-12 px-4 sm:px-6 lg:px-8'>
        {/* <img src={loginscreen} alt="Login Screen" className='absolute w-auto object-cover' /> */}
        <div className='max-w-md w-full space-y-8'>
            <div className="text-center">
                <img src={ospar1Logo} alt="ospar front" className='mx-auto h-16 w-auto mt-5 object-cover rounded-l-2xl' />
                <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
                  Sign in to iHOMIS
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  Hospital Information Management System
                </p>
                <form className='mt-6 max-w-md mx-auto space-y-6'
                onSubmit={handleSubmit}>
                    <div>
                      <div>
                        <label htmlFor='username' className="sr-only">Username</label>
                        <input 
                            id="username"
                            name="username"
                            type="text" 
                            required
                            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm' 
                            placeholder='Username' />
                      </div>
                      <div>
                        <label htmlFor='username' className="sr-only">Username</label>
                        <input 
                            id="password"
                            name="password"
                            type="password" 
                            required
                            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-50 focus:border-blue-500 focus:z-10 sm:text-sm' 
                            placeholder='Password' />
                      </div>
                    </div>
                    <div>
                      <button
                        type='submit'
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                      >
                        { loading ? 'Signing in...' : 'Sign In' }
                      </button>
                    </div>
                </form>
            </div>
            
        <p onContextMenu={handleContextMenu} className='text-center text-xs text-gray-300 font-semibold select-none'>Developed by: IT-DEPARTMENT</p>
        </div>
    </div>
  )
}

export default Login
