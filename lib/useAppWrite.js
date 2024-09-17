import { useState, useEffect } from "react";
import { Alert } from "react-native";
const useAppwrite = (fn) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const results = await fn();
        setData(results)
 
      }
      catch(error){
        Alert.alert('Error', error.message)
      }
      finally {
        setIsLoading(false)
      }
  } // This is cause you cant create ansync code in use effect
    useEffect(()=> {
      
     
      fetchData();
    }, [])

    const refetch = () => fetchData();
    return {data, refetch, isLoading};
}

export default useAppwrite;