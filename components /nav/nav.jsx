import React from 'react';
import './nav.css'
import Link from 'next/Link'

import { BiHomeAlt2 } from "react-icons/Bi"
import { HiOutlineDocumentReport } from "react-icons/Hi"
import { TbDatabaseOff,TbReportSearch } from "react-icons/Tb"
import { LiaToolsSolid } from "react-icons/Lia"
import { FaToolbox } from "react-icons/Fa"
const Nav = () => {
    return (
        <div className="nav section__padding">
            <div className="nav__title">
                <h1 className="nav__title--title">MM Tools</h1>
            </div>
            <div className="nav__menu">
                    <Link href="./" style={{ textDecoration: 'none' }}>
                        <p><BiHomeAlt2 size={20}/>Home</p>
                    </Link>
                    <Link href="/billing" style={{ textDecoration: 'none' }}>
                        <p><HiOutlineDocumentReport size={22}/>Billing</p>
                    </Link>
                    <Link href="/telamatics" style={{ textDecoration: 'none' }}>
                        <p><TbDatabaseOff size={21}/>Telamatics</p>
                    </Link>
                    <Link href="/reports" style={{ textDecoration: 'none' }}>
                        <p><TbReportSearch size={21}/>Reports</p>
                    </Link>

                    <Link href="/tools" style={{ textDecoration: 'none' }}>
                        <p><LiaToolsSolid size={21}/>Tools</p>
                    </Link>

                    <Link href="/FFTools" style={{ textDecoration: 'none' }}>
                        <p><FaToolbox size={21}/>FFTools</p>
                    </Link>
            </div>
        </div>
    );
};

export default Nav;