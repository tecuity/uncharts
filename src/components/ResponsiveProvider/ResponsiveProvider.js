import React from 'react'

export const ResponsiveContext = React.createContext({page: {width: window.innerWidth, height: window.innerHeight}})

export const ResponsiveProvider = ({children}) => {
  const [pageWidth, setPageWidth] = React.useState(window.innerWidth)
  const [pageHeight, setPageHeight] = React.useState(window.innerHeight)
  React.useEffect(() => {
    const handleWindowResize = e => {
      setPageWidth(window.innerWidth)
      setPageHeight(window.innerHeight)
    }
    window.addEventListener("resize", handleWindowResize)

    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [setPageWidth, setPageHeight])

  return (
    <ResponsiveContext.Provider value={{page: {width: pageWidth, height: pageHeight}}}>
      {children}
    </ResponsiveContext.Provider>
  )
}
