import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import '../../../configureAmplify'

const NavBar = () =>{
    //const [signedUser, setSignedUser] = useState[false]

    return (
        <nav className="flex justify-center pt-3 pb-3 space-x-4 border-b bg-cyan-500  border-gray-300">
            {
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
            }
        </nav>
    )
}

export default NavBar