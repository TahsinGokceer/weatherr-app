import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext()

export const CitiesProvider = ({children}) => {
    const [cities, setCities] = useState([])  
    
    useEffect(() => {
        axios("https://turkiyeapi.cyclic.app/api/v1/provinces").then(res => setCities((res.data.data)))   
    }, [])
    
    const values = {cities, setCities}  
    
    return <CitiesContext.Provider value={values}>{children}</CitiesContext.Provider>
}

export const useCities = () => useContext(CitiesContext)