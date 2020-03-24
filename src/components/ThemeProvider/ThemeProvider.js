import React from 'react'

export const ThemeContext = React.createContext()

const defaultTheme = {
  colors: {
    blue: "#3b5578",
    gray: "#7d8185",
    green: "#60cc6a"
  },
  pageWidth: window.innerWidth
}

const getTheme = (theme, pageWidth) => ({
  ...defaultTheme,
  ...theme,
  pageWidth
})

export const ThemeProvider = ({ children, theme = {} }) => {
  const [pageWidth, setPageWidth] = React.useState(window.innerWidth)
  React.useEffect(() => {
    const handleWindowResize = e => {
      setPageWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleWindowResize)

    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [setPageWidth])

  return (
    <ThemeContext.Provider value={getTheme(theme, pageWidth)}>
      {children}
    </ThemeContext.Provider>
  )
}
