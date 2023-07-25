import React, { useContext } from 'react'
import "./Join.css";
import logo from '../../images/logo.jpg'
import { Link } from 'react-router-dom';
import { myContext } from '../../App';

const Join = () => {
    
  const{user,setUser}=useContext(myContext);
 
  return (
    <div className='JoinPage'>
        <div className='JoinContainer'>
            <img src={logo} alt='txt'/>
            <h1>Chat App</h1>
            <input type='text' 
            placeholder='Enter your name' 
            value={user}
            onChange={(e)=>{
                setUser(e.target.value)
                
            }}
             id='joinInput'/>
           <Link to='/chat'> <button className='joinbtn'>Login</button> </Link>
        </div>
    </div>
  )
}

export default Join
