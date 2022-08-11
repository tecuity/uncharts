import React from 'react'
import { ResponsiveContext } from '../components/ResponsiveProvider/ResponsiveProvider'

export const useResponsive = () => {
  const responsive = React.useContext(ResponsiveContext)
  return responsive
}
