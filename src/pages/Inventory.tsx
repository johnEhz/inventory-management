import React from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'

const Inventory = () => {
  const { inventoryId } = useParams()
  return (
    <Layout>
        <div>
          Inventory with ID = {inventoryId}
        </div>
    </Layout>
  )
}

export default Inventory