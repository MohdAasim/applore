import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const AdminHome =()=>{
    const [store, setstore] = useState([])
    const [edit,setedit]=useState(true)
    const [editvalue,seteditvalue] = useState([])
    const [uid,setid] = useState()

const getblog=async (id)=>{
    const data = store.find(item=>item._id===id)
    seteditvalue(data)
    setedit(false)
  }

const adddata =(e)=>{
    const id = e.target.id
    if(id){
    setid(id)
    }
    const value = e.target.value
    seteditvalue({value:value})
  }
  const approve =async(id)=>{
   try{ const res =await axios.post('/updateblog',{"id":id,"approve":true})  
    console.log(res)
    alert("approved")
    }catch(e){
        console.log(e)
    }
    setedit(true)
  }
const updatedata =async()=>{
   try{ const res =await axios.post('/updateblog',{"id":uid,"blogs":editvalue.value})  
    console.log(res)
    }catch(e){
        console.log(e)
    }
    setedit(true)
}
const deletefunc = async(id)=>{
    try{ const res =await axios.post('/deleteblog',{"id":id})  
    alert("deleted")
    console.log(res)
    }catch(e){
        console.log(e)
    }
    setedit(true)
}
useEffect(() => { 
   const fetchdata=async()=>{
   try{
       const res =await axios.get('/getallblogs')  
       const data =await res.data
       setstore(data)
       }catch(err){
           console.log(err)
       }
    }
    fetchdata()
},[edit])
    return(
       <div>
       <div>
       <Link to='/addwriter'>
       <button className='btn btn-primary' >Add Writer</button>
       </Link>
       </div>
      <br></br>
       <Link to='/writerData'>
       <button className='btn btn-primary' >Writer Data</button>
       </Link>
      
        <div className='mt-5'> 
        <strong >Blogs</strong>
        <br></br>
        <div className='row'>  

        {   edit?
            store.map((item,index)=>{
           return( <div className='card w-25 m-4 col-lg-10 col-sm-10' key={index}>
            {item.blogs}
            <div>
            <button className='btn btn-primary mt-4' onClick={()=>getblog(item._id)}>Edit</button>
            <button className='btn btn-success ml-4 mt-4' onClick={()=>approve(item._id)}>Approve</button>
            <button className='btn btn-danger ml-4 mt-4' onClick={()=>deletefunc(item._id)}>Delete</button>
            </div>
        </div>)
        }):<div className='card w-25 m-4 col-lg-10 col-sm-10'>
            <textarea value={editvalue.blogs} onChange={adddata} id={editvalue._id}/>
             <button className='btn btn-success' onClick={updatedata}>Submit</button>
         </div>
        }
        </div> 
        </div>
        </div>
    )
}

export default AdminHome