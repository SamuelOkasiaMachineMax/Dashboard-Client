'use client'

import React, {useEffect, useState} from 'react';
import "./page.css"
import Metrics from "@/components /metrics/metrics";
import dashboard from "@/components /dashboard/dashboard";
import Dashboard from "@/components /dashboard/dashboard";
import Title from "@/components /title/title";
const Page = () => {

    useEffect(() => {
        // Check if the user is authenticated
        const auth = localStorage.getItem('auth');
        if (!auth) {
            // If not authenticated, redirect to the login page
            router.push('/login');
        }
        else {
            setShowPage(true)
        }
    }, [router]);

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        // Fetch customers on component mount
        fetch('http://127.0.0.1:5000/customers')
            .then(res => res.json())
            .then(data => setCustomers(data))
            .catch(error => console.error('Error fetching customers:', error));
    }, []);

    console.log(customers)

    const labels = ["Total Machines", "To be billed" , "No API Call", "Utilisation", 'Actions']

    return (
        <div className="billing">
            <Title title="Billing"/>
            <div className="billing__content content__padding">
                <div className="billing__content__metrics">
                    <Metrics main_title='Machines not in platform' main_value='147' sub_title='Last Month' sub_value='12'/>
                    <Metrics main_title='Machines to be billed' main_value='147' sub_title='Last Month' sub_value='12'/>
                    <Metrics main_title='Machines pulling no data' main_value='147' sub_title='Last Month' sub_value='12'/>
                </div>
                <Dashboard title={"Billing Report"} labels={labels} data={[]}/>

            </div>
        </div>
    );
};

export default Page;