import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav className='bg-stone-500 font-bold flex justify-around p-6 text-white'>

        <h2>Activité</h2>

        <ul className='flex gap-4'>
            <li>Ajouter une catégorie</li>
            <li>Ajouter une activité</li>
        </ul>
        </nav>
        
      
    </div>
  )
}

export default Navbar
