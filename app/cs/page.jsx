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

    return (
        <div className="cs">
            <Title title="Customer Service" />
            <div className="cs__content section__padding">
                <div className="cs__content__menu">
                    {
                        menu.map((item)=>   (

                            <button className="cs__content__menu--button title--sub">
                                {item}
                            </button>

                        ))}
                </div>

                <div className="cs__content__type">

                    <div className="cs__content__type__header">
                        <button className="title--sub cs__content__type__header--button">Rental End User</button>
                        <button className="title--sub cs__content__type__header--button">Rental User</button>
                    </div>

                    <div className="cs__content__type__subHeader">
                        <p className="title--sub">Body</p>
                        <p className="label">Status: </p>
                    </div>

                    <div className="cs__content__type__body">
                        <form onSubmit={handleSubmit}>

                            <div className="cs__content__type__body__field">
                                <label className="label" htmlFor="email">Email</label>
                                <input
                                    className="json--value"
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="cs__content__type__body__field">
                                <label className="label" htmlFor="email">Password</label>
                                <input
                                    className="json--value"
                                    placeholder="Password"
                                />
                            </div>

                            <div className="cs__content__type__body__field">
                                <label className="label" htmlFor="email">Name</label>
                                <input
                                    className="json--value"
                                    placeholder="Name"
                                />
                            </div>

                            <div className="cs__content__type__body__field">
                                <label className="label" htmlFor="email">Surname</label>
                                <input
                                    className="json--value"
                                    placeholder="Password"
                                />
                            </div>


                            <Select placeholder="Select Org" options={options} onChange={(choice) => setChoice(choice)}
                            />


                            {error && <div style={{ color: 'red' }} className="label">{error}</div>}

                            <button type="submit" disabled={!!error}>Submit</button>
                        </form>


                    </div>



                </div>


            </div>
            
        </div>
    );
};

export default Page;