import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


const WriterData = ()=>{
    const [writerstore,setwriterstore] = useState([])
    useEffect(() => { 
        const fetchdata=async()=>{
       try{
           const writerdata = await axios.get('/getwriter'
           ,{
            headers:{
                Accept:"appllication/json",
            },
              credentials:"include"
            }
            )
           const wtrdata = writerdata.data
           setwriterstore(wtrdata)

           }catch(err){
               console.log(err)
           }
        }
        fetchdata()
    }, [])
    return(
        <div>
        <div className='row'>  
        {writerstore.map((item,index)=>{
           return(<div className='card w-25 m-4 col-lg-10 col-sm-10' key={index}>
            {`name =${item.name} .. email=${item.email} ..  password = ${item.password} `}
        </div>)
        })}
        </div> 
        <div>
        <Link to='/adminhome'>
        <button className='btn btn-primary'>Back</button>
        </Link>
        </div>
        </div>
    )
}

export default WriterData;