import React from 'react';
import './nav.css'
import Link from 'next/link'

import { AiFillHome } from "react-icons/ai"
import { GrDocumentMissing } from "react-icons/gr"
import { TbDatabaseOff,TbReportSearch } from "react-icons/tb"
import { LiaToolsSolid } from "react-icons/lia"
import { FaToolbox } from "react-icons/fa"
import { RiTeamLine } from "react-icons/ri";
import { RiBillLine, RiCustomerService2Line } from "react-icons/ri";

const Nav = () => {
    return (
        <div className="nav section__padding">
            <div className="nav__title">
                <h1 className="nav__title--title">MM Tools</h1>
            </div>
            <div className="nav__menu">
                    <Link href="./" style={{ textDecoration: 'none' }}>
                        <p><AiFillHome size={20}/>Home</p>
                    </Link>
                    <Link href="/billing" style={{ textDecoration: 'none' }}>
                        <p><RiBillLine size={22}/>Billing</p>
                    </Link>
                    <Link href="/telamatics" style={{ textDecoration: 'none' }}>
                        <p><TbDatabaseOff size={21}/>Telematics</p>
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

                    <Link href="/csm" style={{ textDecoration: 'none' }}>
                        <p><RiTeamLine size={21}/>CSM</p>
                    </Link>

                    {/*<Link href="/cs" style={{ textDecoration: 'none' }}>*/}
                    {/*    <p><RiCustomerService2Line size={21}/>CS</p>*/}
                    {/*</Link>*/}

            </div>
        </div>
    );
};

export default Nav;