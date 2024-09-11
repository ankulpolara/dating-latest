"use client"
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useSelector } from "react-redux"
import Wraper from "@/app/components/dashboard/Wraper"


const Page = () => {
    const { data, loading, error, isOpenSidebar } = useSelector((state) => state.dashboard);
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            console.log("redirecting to the other /..................");
            redirect("http://localhost:3000/register")
        }
    })
    console.log(isOpenSidebar);

    if (status === "authenticated") {
        // console.log(session, status);
        return <div>
            {/* <p> Signed in as {session.user.email}</p>
            <img className='w-20 h-20 rounded-full' src={session.user.image} alt="" />
            <div onClick={() => signOut()}>log out</div> */}
            <Wraper />


        </div>
    } else {
        return <div  >
            <p onClick={() => signIn()}>login</p>
            <p onClick={() => signIn("google")}>login with google</p>



        </div>
    }


}

export default Page
