'use client'

import { useState } from 'react';
import Select from 'react-select';

import Title from "@/components /title/title";

import "./page.css"
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
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


        const menu = ['Token', 'API', 'User', 'Manu-\nfacturer', 'Machine', 'Source Check']

        const options = [
            { value: '123', label: 'Flannery' },
            { value: '456', label: 'Plantforce' },
            { value: '679', label: 'PotterPlant' }
        ]

    const createUser = ['email','name','lastname','role','organisation']

    return (
        <div className="cs">
            <Title title="Customer Service" />
            <div className="cs__content section__padding">
                <div className="cs__content__menu">
                    {
                        menu.map((item, index)=>   (

                            <button key={index} className="cs__content__menu--button title--sub">
                                {item}
                            </button>

                        ))}
                </div>



            </div>
            
        </div>
    );
};

export default Page;