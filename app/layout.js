import './globals.css'
import Nav from "@/components /nav/nav";

export const metadata = {
  title: 'MM Dashboard',
  description: 'MachineMax Internal Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body>
            <main className="main__div">
                <Nav/>
                {children}
            </main>
        </body>
    </html>
  )
}
