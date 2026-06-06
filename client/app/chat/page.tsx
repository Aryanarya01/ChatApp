
import clientServer from '@/lib/axios'
import React from 'react'

const page = () => {
    const getMe = async()=>{
        try{
            const {data} = await clientServer.get("/me");
            console.log(data)
        }catch(err){
            console.log(err)
        }
    }
    
  return (
    <div>
        

    </div>
  )
}

export default page