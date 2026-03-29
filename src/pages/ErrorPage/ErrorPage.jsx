
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='text-center space-y-2'>

        <h1 className='font-semibold text-2xl'>This page isn't available right now</h1>
        <p className='text-'>This may be because of a technical error that we're working <br /> to get fixed. Try reloading this page.</p>
        <button onClick={()=>navigate(-1)} className=' px-4 py-2 rounded-md btn-bg-greadient cursor-pointer active:scale-95 transition-all'>Reload Page</button>
      </div>
    </div>
  )
}

export default ErrorPage