import React from 'react'
import { useLocation } from 'react-router-dom'

const HandleError = () => {
  const location = useLocation()
  return (
    <div>{location.state}</div>
  )
}

export default HandleError