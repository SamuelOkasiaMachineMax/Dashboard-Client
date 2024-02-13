'use client'

import React, {useState, useEffect} from "react";
import {usePathname, useRouter} from 'next/navigation';

import axios from 'axios';

import "./page.css"

import Title from "@/components /title/title";
import Alerts from "@/components /alerts/alerts";
import BatterySummary from "@/components /batterySummary/batterySummary";
import VoltageSummary from "@/components /voltageSummary/voltageSummary";




export default function Home() {
    const router = useRouter();
    const pathname = usePathname();
    const [showPage, setShowPage] = useState(false);


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

    const API_URL = "http://127.0.0.1:5000";  // Adjust according to your backend URL
    const API_URL_dev = "http://127.0.0.1:5000/"
    const API_URL_prod= "https://samuelokasiamachinemax.pythonanywhere.com/"

    const API_URL_IN_USE = API_URL_prod


    const [data, setData] = useState([]);
    const [batteryData, setBatteryData] = useState([]);
    const [voltageData, setVoltageData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL_IN_USE}/alerts`);
                return response.data;
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(true);
                setLoading(false);
            }
        };

        setLoading(true);
        fetchData()
            .then((data) => {
                if (data) {
                    setData(data.alerts); // Assuming 'alerts' field in response
                    setBatteryData(data.battery_overview);
                    setVoltageData(data.voltage_overview);
                }
                setLoading(false);
            });
    }, []);


  return (
    <div className="home">
        { showPage &&
            <>
              <Title title = "Home"/>
                <div className="home__content section__padding">
                    <Alerts data={data} loading={loading}/>
                    <div className="home__content__content">
                        <BatterySummary data={batteryData} loading={loading}/>
                        <VoltageSummary data = {voltageData} loading={loading}/>
                    </div>
            </div>
            </>
        }

    </div>
  )
}
