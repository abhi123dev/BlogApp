
import { useState,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Header , Footer } from './components'

function App() {
  // console.log(process.env.REACT_APP_APPWRITE_URL); //THIS will work for create reactapp not for vite

  const[loading ,setloading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setloading(false))

  }, [])
  
  return !loading ? (
    <div className='mim-h-screen flex flex-wrap content-between bg-gray-400' >
      <div className='w-full block' >
        <Header />
        <main>
          {/* <Outlet/> */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null

  
}

export default App
