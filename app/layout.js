'use client'

import './globals.css'
import Nav from "@/components /nav/nav";
import Head from 'next/head';
import {useEffect, useState} from "react";
import {useRouter, usePathname} from "next/navigation";

// export const metadata = {
//   title: 'MM Dashboard',
//   description: 'MachineMax Internal Dashboard',
//   icon: '/public/assets/favicon.ico'
//
// }

export default function RootLayout({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    const pathname = usePathname()
    const [showPage, setShowPage] = useState(false);
    const isLoginPage = pathname === '/login';

    // useEffect(() => {
    //     const authToken = localStorage.getItem('auth');
    //     if (authToken) {
    //         setIsLoggedIn(true);
    //     } else {
    //         if (pathname !== '/login') {
    //             router.push('/login');
    //         }
    //     }
    // }, [router]);

    useEffect(() => {
        if (pathname === '/login') {
            setShowPage(false)
        }
        else {
            setShowPage(true)
        }
    }, [pathname]);

  return (
    <html lang="en">
        <body>
            <Head>
                <title>Your Page Title</title>
                <link rel="icon" href="/public/assets/favicon.ico" />
            </Head>
            <main className="main__div">

                {showPage && <Nav />}
                {children}
            </main>
        </body>
    </html>
  )
}
