import React from 'react'
import Layout from '../components/Layout'

const Application = () => {
  return (
    <Layout>
        <div className='flex flex-col items-center min-h-[400px] w-full justify-center gap-4'>
          <h2 className='message text-6xl'>¡Bienvenido!</h2>
          <h2 className='message text-gray-500'>Te encuentras autenticado como</h2>
          <span className='message'>John Hernandez</span>
        </div>
    </Layout>
  )
}

export default Application