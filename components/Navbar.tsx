import React from 'react'
import Image from "next/image";
import Link from "next/link";


const Navbar = () => {
  return (
    <div>
        <nav className='bg-color2 font-bold flex justify-center p-6 text-white'>
        <Link href="/"> 
          <Image src="/LOGO_ACTIVITES.png" alt="Logo Activités" width={150} height={75} priority />
        </Link>
        </nav>
    </div>
  )
}

export default Navbar
