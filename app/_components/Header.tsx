"use client"

import React from 'react'
import Image from "next/image";
import { UserButton, useUser, SignInButton } from '@clerk/nextjs';
import { Button } from '@base-ui/react';

const header = () => {
  const {user} = useUser();
  return (
    <div className='flex items-center justify-between p-4'>
        <div className='flex gap-2 items-center'>
            <Image src={"/logo.png"} alt="logo" width={50} height={50}/>
            <h2 className='text-xl font-bold'><span className='text-primary'>Vid</span>Course</h2>
        </div>
            <ul className='flex gap-8  items-center'>
                <li className='cursor-pointer text-lg font-medium hover:text-primary'>Home</li>
                <li className='cursor-pointer text-lg font-medium hover:text-primary'>Prices</li>
            </ul>
            {user ?
            <UserButton/>:
            <SignInButton mode="modal">
              <Button>
                Get Started
              </Button>

                
            </SignInButton>
            }
    </div>
  )
}

export default header