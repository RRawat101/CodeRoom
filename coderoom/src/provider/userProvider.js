import React, {createContext,useState} from 'react'

const userContext=createContext();


const UserProvider = ({children,socket}) => {
  
  const [users,setUsers]=useState([]);


  return (
    <userContext.Provider value={
      
        {socket,users,setUsers}
      
      }>
      {children}
    </userContext.Provider>
  )
}

export { UserProvider, userContext };
