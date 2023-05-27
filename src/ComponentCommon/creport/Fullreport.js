import React from 'react'
import CustomerSatisfaction from './CustomerSatisfaction'
import ProjectCompleted from './ProjectCompleted'
import YearsMarket from './YearsMarket'
import HappyCustomer from './HappyCustomer'

export default function Fullreport() {
  return (
    <div className=' text-black flex justify-center flex-wrap my-3'>
        <CustomerSatisfaction/>
        <ProjectCompleted/>
        <YearsMarket/>
        <HappyCustomer/>
    </div>
  )
}
