import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import '../../styles/Join/join.css'

export const Join = () => {

    const [name, setName] = useState(''); 
    const [room, setRoom] = useState(''); 


  return (
    <div className='join-container'>
        <div className='join-inner-container'>
            <h1 className='heading'>Join</h1>
            <div><input placeholder='Name' className='join-input-name' onChange={(e) => {setName(e.target.value)}}/></div>
            <div><input placeholder='Room' className='join-input-room mt-20' onChange={(e) => {setRoom(e.target.value)}}/></div>
            <Link onClick={(e) => (!name || !room) ? e.preventDefault() : <Alert key={'danger'} variant={'danger'}>Please fill out the required fields below</Alert> }to={`/chat?name=${name}&room=${room}`}> <button className='button mt-20' type='submit'> Sign In</button></Link>
        </div>   
    </div>
  )
}

export default Join; 