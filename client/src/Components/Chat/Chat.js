// import React, { useEffect, useState } from 'react'
// import queryString from 'query-string'
// import io from 'socket.io-client'
// import './chat.css'

// const Chat = ({ location }) => {

//     const [name, setName] = useState('');
//     const [room, setRoom] = useState(''); 
//     const ENDPOINT = 'http://localhost:3001'; 

//     useEffect(() => {
//         const {name, room} = queryString.parse(location.search); 

//         let socket = io(ENDPOINT); 

//         setName(name)
//         setRoom(room)
//     })
//   return (
//     <div className='outside-container'>
//         <div className='inner-container'>
//             <h1> Chat </h1>
//         </div>
//     </div>
//   )
// }

// export default Chat