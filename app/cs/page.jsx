'use client'

import { useState, useEffect } from 'react';
import Select from 'react-select';

import Title from "@/components /title/title";

import "./page.css"
import {TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {useRouter} from "next/navigation";
const Page = () => {
    const router = useRouter();
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

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const companies = ['Flannery', 'Plantforce'];
    const [choice , setChoice] = useState('');

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);

        // Reset error message
        setError('');

        // Check if email contains multiple company names
        const matchedCompanies = companies.filter(company => emailValue.toLowerCase().includes(company.toLowerCase()));

        if (email.includes('flannery')) {
            setError('Action not allowed: Email address cannot be created with Organisation');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    }

    const [selectedTab, setSelectedTab] = useState('Token');

    const [inputValue, setInputValue] = useState('');
    const generateInitialJson = (fields) => {
        const initialObject = fields.reduce((obj, field) => {
            obj[field] = '';
            return obj;
        }, {});
        return JSON.stringify(initialObject, null, 2);
    };

    useEffect(() => {
        // Update the inputValue when the selectedTab changes
        setInputValue(generateInitialJson(tabData[selectedTab]));
    }, [selectedTab]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };


    const tabData = {
        'Token': ['email', 'username'],
        'User': ['email', 'name', 'lastname', 'role', 'organisation'],
        'Manufacturer': ['manufacturer'],
        'Machine': ['email', 'password'],
        'SourceCheck': ['orgID', 'Source']
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };


    const options = [
            { value: '123', label: 'Flannery' },
            { value: '456', label: 'Plantforce' },
            { value: '679', label: 'PotterPlant' }
        ]

    const Token = ['email', 'username']
    const User = ['email','name','lastname','role','organisation']
    const Manufacturer = ['manufacturer']
    const Machine = ['email', 'password']
    const SourceCheck = ['orgID', 'Source']

    return (
        <div className="cs">
            <Title title="Customer Service" />
            <div className="cs__content section__padding">

                <div className="cs__content__tabHeader">
                    <Tabs value={selectedTab} onChange={handleTabChange}>
                        {Object.keys(tabData).map((tabName) => (
                            <Tab label={tabName} value={tabName} key={tabName} />
                        ))}
                    </Tabs>
                </div>


                <div className="cs__content__tabs">
                    <TextField
                        label={`${selectedTab} Data`}
                        multiline
                        rows={10}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                </div>



            </div>
            
        </div>
    );
};

export default Page;