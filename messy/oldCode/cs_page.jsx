'use client'

import { useState } from 'react';
import Select from 'react-select';

import Title from "@/components /title/title";

import "./page.css"
import {TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import TokenTab from "@/components_cs/tokenTab/tokenTab";
import UserTab from "@/components_cs/userTab/userTab";
import SourceTab from "@/components_cs/sourceTab/sourceTab";
import ManufacturerTab from "@/components_cs/manufacturerTab/manufacturerTab";
import ApiTab from "@/components_cs/apiTab/apiTab";

const Page = () => {

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

                <div>
                    <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
                        <Tab label="Token" value="Token" />
                        <Tab label="User" value="User" />
                        <Tab label="Source" value="Source" />
                        <Tab label="Manufacturer" value="Manufacturer" />
                        <Tab label="API" value="API" />
                    </Tabs>

                    {selectedTab === 'Token' && <TokenTab />}
                    {selectedTab === 'User' && <UserTab />}
                    {selectedTab === 'Source' && <SourceTab />}
                    {selectedTab === 'Manufacturer' && <ManufacturerTab />}
                    {selectedTab === 'API' && <ApiTab />}
                </div>

            </div>

        </div>
    );
};

export default Page;