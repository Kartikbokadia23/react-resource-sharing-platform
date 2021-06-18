import React,{useEffect, useState, createContext} from 'react'
import {auth} from 'firebase/AppFirebase';

export const AuthContext = createContext();
export function UserContext(props) {
    const[currentUser, setCurrentUser] = useState()

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
          if (authUser) {
            setCurrentUser(authUser)
            console.log("login")
          }
          else {
            setCurrentUser(null)
            console.log("logout")
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
