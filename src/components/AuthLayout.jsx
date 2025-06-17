import React, {useState//useState is a Hook that allows functional components to manage state. State refers to data that can change over time and affect the component's rendering.
     ,useEffect, } from 'react'//useEffect is a React Hook that allows functional components to perform side effects. Side effects are operations that interact with the outside world, such as data fetching, DOM manipulation, and timers.
import { useSelector } from 'react-redux' // The useSelector hook in React Redux is used to extract data from the Redux store within functional components. It subscribes to the store and re-renders the component whenever the selected data changes.
import { useNavigate } from 'react-router-dom'// useNavigate is a hook provided by React Router that allows you to programmatically navigate between routes within your application. It's primarily used in functional components to trigger navigation based on user interactions or application logic


export default function Protected({children , authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])


  return loader ? <h1> Loading </h1> : <>{children}</>// the purpose of the loader state is to prevent rendering of protected content until the authentication check is complete.

}

