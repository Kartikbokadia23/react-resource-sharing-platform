import React,{useEffect, useState, createContext} from 'react'
import {auth} from 'firebase/AppFirebase';

export const AuthContext = createContext();
export function UserContext(props) {
    const[currentUser, setCurrentUser] = useState()

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
          if (authUser) {
            setCurrentUser(authUser)
          }
          else {
            setCurrentUser(null)
          }
        })
      })

    return (
        <AuthContext.Provider value={currentUser}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default UserContext
