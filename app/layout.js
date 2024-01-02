import './globals.css'
import Nav from "@/components /nav/nav";
import Head from 'next/head';

export const metadata = {
  title: 'MM Dashboard',
  description: 'MachineMax Internal Dashboard',
  icon: '/public/assets/favicon.ico'

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body>
            <Head>
                <title>Your Page Title</title>
                <link rel="icon" href="/public/assets/favicon.ico" />
            </Head>
            <main className="main__div">
                <Nav/>
                {children}
            </main>
        </body>
    </html>
  )
}
