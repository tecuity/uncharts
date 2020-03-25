import React from 'react'

export const ThemeContext = React.createContext()

const defaultTheme = {
  colors: {
    blue: "#3b5578",
    gray: "#7d8185",
    green: "#60cc6a"
  }
}

const getTheme = theme => ({
  ...defaultTheme,
  ...theme
})

export const ThemeProvider = ({ children, theme = {} }) => (
  <ThemeContext.Provider value={getTheme(theme)}>
    {children}
  </ThemeContext.Provider>
)
