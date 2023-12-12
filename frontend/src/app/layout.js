import React from 'react'
import "../styles/home-globals.css"
import "../styles/inv-style.css"

export const metadata = {
  title: 'Inventario',
}

export default function RootLayout ({ children }) {
  return (
      <html lang='es'>
        <body>
          {children}
        </body>
      </html>
  )
}
