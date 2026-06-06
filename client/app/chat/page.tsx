
import clientServer from '@/lib/axios'
import React, { useEffect } from 'react'

const page = () => {
    const getMe = async()=>{
        try{
            const {data} = await clientServer.get("/me");
            console.log(data)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getMe();
    },[])
  return (
    <div>
        

    </div>
  )
}

export default page