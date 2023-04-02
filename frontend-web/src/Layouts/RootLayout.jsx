import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from "../Components/Navbar"
import Navbar2 from '../Components/Navbar2'

export default function RootLayout() {
  return (
    <main>
        <Navbar />
        <Navbar2 />
        <Outlet />
    </main>
  )
}
