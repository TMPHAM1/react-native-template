import { useState, useEffect } from "react";
const useAppwrite = (fn) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(()=> {
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
     
      fetchData();
    }, [])

    const refetch = () => fetchData();
    console.log('THIS IS RESULTS', data)
    return {data, refetch, isLoading};
}

export default useAppwrite;