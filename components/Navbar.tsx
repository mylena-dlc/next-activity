"use client"

import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { SignedOut, SignedIn, UserButton} from '@clerk/nextjs'


const Navbar = () => {
  return (
    <div>
        <nav className='bg-color2 font-bold flex justify-around p-6 text-white'>
          <Link href="/"> 
            <Image src="/LOGO_ACTIVITES.png" alt="Logo Activités" width={150} height={75} priority />
          </Link>

          <div className='flex flex-col justify-between'>
            <SignedIn>
            </SignedIn>
              <SignedOut>
                  <a href='/sign-in'>
                      <button className='text-color1 bg-color5 border-0 p-2 focus:outline-none hover:bg-color4 rounded text-base mr-4'>
                        Connexion
                      </button>
                  </a>
                  <a href='/sign-up'>
                      <button className='text-color1 bg-color5 border-0 p-2 focus:outline-none hover:bg-color4 rounded text-base'>
                        Inscription
                      </button>
                  </a>
              </SignedOut>
              <SignedIn>
                  <div className='ml-4'>
                      <UserButton afterSignOutUrl='/' />
                  </div>
              </SignedIn>
          </div>
        </nav>
    </div>
  )
}

export default Navbar
