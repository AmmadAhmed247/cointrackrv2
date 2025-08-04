import axios from "axios"


const BybitUrl='https://api.bybit.com';
export const fethcBybitData=async(endPoint ,params={})=>{
    try {
        const response=await axios.get(`${BybitUrl}${endPoint}`,{
            params:{
                timeout:10000,
                header:{
                    'Content-Type':'application/json'
                }
            }
        })
        return response.data
    } catch (error) {
        console.error(error.message);
        throw new Error("Failed to fetch Data from Bybit error:",error.message)
        
    }
}