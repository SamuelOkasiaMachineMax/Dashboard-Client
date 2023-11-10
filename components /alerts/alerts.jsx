'use client'

import React, {useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./alerts.css"
const Alerts = () => {

    const columns = [
        { field: 'customer', headerName: 'Customer', width: 100 },
        {
            field: 'alert',
            headerName: 'Alert',
            width: 400,
            renderCell: (params) => (
                <div title={params.value}>
                    <p className="MuiDataGrid-cellContent-alerts">{params.value}</p>
                </div>
            )
        }
    ];

    const rows = [
        { id: 1, customer: 'Zeppelin', alert: '12 Sensors will need a battery replacement soon' },
        { id: 2, customer: 'Flannery', alert: '8 Sensors will need a battery replacement now' },
        { id: 3, customer: 'Flannery', alert: '8 Sensors are likely in a area with low signal' },
        { id: 4, customer: 'US Sugar', alert: '8 Sensors have likely been connected to the wrong power source' },
        { id: 5, customer: 'Imery', alert: '2 Sensors have been disconnected' }
    ];

    return (
        <div className="alerts">
            <div className='alerts__header content__sub__padding'>
                <p className='alerts--title title--sub'>Alerts</p>
                <div className='alerts__header__search'>
                    <input
                        className="alerts__header__search--search"
                        type="text"
                        placeholder="Search"
                    />
                </div>
            </div>
            <div className="alerts__content">
                <DataGrid rows={rows} columns={columns} pageSize={5} />

            </div>




        </div>
    );
};

export default Alerts;