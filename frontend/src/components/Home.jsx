import React,{useState,useEffect} from 'react'
import axios from 'axios'

const Home =()=>{
     const [store, setstore] = useState([])
     useEffect(() => {
         const fetchdata=async()=>{
        try{
            const res =await axios.get('/getblogs')
            const data =res.data
            setstore(data)
            }catch(err){
                console.log(err)
            }
         }
         fetchdata()
     }, [])
    return(
        <div>
        <div className='row'>  
        {store.map((item,index)=>{
           return( <div className='card w-25 m-4 col-lg-10 col-sm-10' key={index}>
            {item.blogs}
            </div>)
        })}
        </div> 
        </div>
    )
}
export default Home;