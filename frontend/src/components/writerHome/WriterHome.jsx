import axios from 'axios'
import React, { useState ,useEffect} from 'react'


const WriterHome =()=>{
    const [value,setvalue] =useState({
        blogs:''
    })
    const [store, setstore] = useState([])
    const handlevent=(e)=>{
        const data = e.target.value
        const name = e.target.name;
        setvalue({...value,[name]:data})

    }
    const submitBlogs =async()=>{
        try{
            const res = await axios.post('/api/addblog',value)
            if(res.status === 422){
                console.log("invalid blogs")
            }else{
                alert('blog inserted')
                setvalue({blogs:""})
            }
        }catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
        const fetch=async()=>{
            try{
             const res = await axios.get('/getuserblog')
             const data =await res.data
             setstore(data)
            }catch(err){
                console.log(err)
            }
        }
        fetch()
    }, [value])
    return(
        <div>
        <h4>Add Blogs</h4>
        <div className='card m-2 p-4'>
        <textarea value={value.blogs} 
        name='blogs'
        onChange={handlevent} placeholder='write your blog her'></textarea>
        <button onClick={submitBlogs}>Submit</button>
        </div>   
        <div>
        <h5>Blogs</h5></div>
        {store.map((item,index)=>{
            return( <div className='card w-25 m-4 col-lg-10 col-sm-10' key={index}>
             {item.blogs}
             </div>)
            })
        }
        </div>
    )
}

export default WriterHome;