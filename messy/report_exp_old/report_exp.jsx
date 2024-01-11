import React from 'react';
import "./reportEXP.css"

import { BsFileEarmarkExcel } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
const ReportExp = ({customer,name,ssetViewCustomer,ssetViewName}) => {
    return (
        <div className="reportEXP">
            <div className="reportEXP__content">
                <p className="title--sub">{customer}</p>
                <p className="label">{name}</p>
            </div>
            <div className="reportEXP__actions">
                <button className="reportEXP__actions--view" onClick={(e) => {
                    ssetViewCustomer(customer);
                    ssetViewName(name);
                }}>
                    <FaRegEye size={22} color={"#5A6270"}/></button>

                <a href={`http://localhost:5000/reports/${customer}/${name}/download`} download={`${name}.xlsx`}><BsFileEarmarkExcel size={20} color={"#5A6270"}/></a>

            </div>
        </div>
    );
};

export default ReportExp;