import React from 'react'
import { ResponsiveContext } from '../components/ResponsiveProvider/ResponsiveProvider'

export default () => {
  const responsive = React.useContext(ResponsiveContext)
  return responsive
}
