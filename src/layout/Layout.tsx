import React from 'react'
import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar/NavBar'

export const Layout = (): JSX.Element => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="xl" sx={{ mt: 1 }}>
        <NavBar />
      </Container>
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </Box>
  )
}

export default Layout
