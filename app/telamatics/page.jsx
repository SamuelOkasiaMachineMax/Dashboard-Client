'use client'

import {useEffect, useState} from 'react';

import Title from "@/components /title/title";
import Metrics from "@/components /metrics/metrics";
import Upload from "@/components /upload/upload";
import './page.css'

import TelematicsTable from "@/components /telamaticsTable/telematicsTable";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';

const Page = () => {
    const [data, setData] = useState([]);
    const [currentCustomer, setCurrentCustomer] = useState("Select Customer");

    const [customers, setCustomers] = useState([]);

    const handleRowSelected = (params) => {
        console.log('Selected Row:', params.name);
        // Perform any other action you want with the selectedRow


    };

    useEffect(() => {
        axios.get(`http://localhost:5000/customers`)
            .then(response => {
/*
                console.log('Customers:', JSON.stringify(response.data, null, 2));
*/
                setCustomers(response.data)
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);  // added dependencies to the useEffect

    const labels = ["Customer", "Total" , "Found", "Not Found"]
    const labelss = ["Asset ID", "Serial" , "Source"]

    {console.log(data.length)}

    const columns = [
        { field: 'name', headerName: 'Customer Name', width: 250 },
        { field: 'telematics', headerName: 'No Telematics', width: 250 }

    ];

    const handleSubmit = async (params) => {

        const response = await fetch(`http://127.0.0.1:5000/search-telematics/${params.name}/${params.orgID}`, {
            method: 'POST',
        });

        const data = await response.json();
        /*
                console.log(data.machines);
        */
        setData(data);
        setCurrentCustomer(params.name)
    };
    return (
        <div className="telamatics">
            <Title title="Telamatics"/>
            <div className="telamatics__header content__padding">
                <Upload onUpload={setData}/>
                <Metrics main_title="Machine reporting no telamatics" main_value={102} sub_title="Last month" sub_value="N/A"/>
            </div>

            <div className="telamatics__content content__padding">
                <div className="telamatics__content__customers">
{/*
                    <Dashboard title="No Telamatics" placeholder="Enter Organisation ID" labels={labels} data={[]} total={0}/>
*/}
                    <DataGrid rows={customers} columns={columns} pageSize={5}  hideCheckboxColumn={true}
                              onRowClick={(params) => { handleSubmit(params.row) }}
                    />

                </div>




                <div className="telamatics__content__machines">
{/*
                    <Dashboard title="Flannery" labels={labelss} data={data} placeholder="Search for machine" total={data.length}/>
*/}

                    <TelematicsTable data={data} customerNmae={currentCustomer}/>


                </div>
            </div>


        </div>

    );
};

export default Page;