import React from "react";
import { useState, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";
import Link from "next/link";
import '../../../configureAmplify'

const NavBar = () =>{
    const [signedUser, setSignedUser] = useState(false)

    useEffect(()=> {
        authListener()
    },[])


    async function authListener(){
        Hub.listen("auth", (data) => {
                                                console.log(data.payload.event)
            switch (data.payload.event) {
                case "signIn":
                    return setSignedUser(true)
                case "signOut":
                    return setSignedUser(false)
            }
        })
        try {
            await Auth.currentAuthenticatedUser()
            setSignedUser(true)
        } catch (error) {
            
        }
    }

    return (
        <nav className="flex justify-center pt-3 pb-3 space-x-4 border-b bg-cyan-500  border-gray-300">
            {
                signedUser && (
                    [
                        ["Home", "/"],
                        ["Create","/create-epub"],
                        ["Profile","/profile"]
                    ].map(([title, url], index) => (
                        <Link href={url} key={index}>
                            <div className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slage-100 hover:text-slate-300">
                                {title}
                            </div>
                        </Link>
                    ))
                )
            }
        </nav>
    )
}

export default NavBar