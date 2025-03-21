
import './globals.css'

export const metadata = {
  title: 'Simple MongoDB Entry Creator',
  description: 'A simple app to create MongoDB entries',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
