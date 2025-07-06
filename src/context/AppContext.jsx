import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '₹'
    const backendUrl = 'https://vaxtrackhost.onrender.com'

    // const [doctors, setDoctors] = useState([])
    const [hospitals, setHospitals] = useState([])

    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    const [userData, setUserData] = useState(false)

      // Getting Hospital using API
      const getHospitalsData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/hospital/list')
            if (data.success) {
                setHospitals(data.hospitals)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }
     
    const yeah = ()=>{
        try{
            if(data.sucess){}else{}
        }catch{}
    }




    // Getting User Profile using API
    const loadUserProfileData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })

            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    // useEffect(() => {
    //     getDoctosData()

    // }, [])

    useEffect(() => {
        getHospitalsData()

    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        }
    }, [token])

    const value = {
        hospitals, getHospitalsData,
        currencySymbol,
        backendUrl,
        token, setToken,
        userData, setUserData, loadUserProfileData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider