import React from 'react';
import './dashboard.css'
const Dashboard = ({title,labels, data, placeholder, total}) => {
    return (
        <div className='dashboard'>
            <div className='dashboard__header content__sub__padding'>
                <p className='dashboard__header--title title--sub'>{title}</p>
                <div className='dashboard__header__search'>
                    <p className="dashboard__header__search--search">{placeholder}</p>
                </div>
                <p className="dashboard__header--total title--sub">{total}</p>
            </div>
            <div className="dashboard__header__labels content__sub__padding">
                <input type="checkbox" className="dashboard__header__labels--checkbox"/>
                {labels.map((label, index) => (
                    <p key={index}>{label}</p>
                ))}
            </div>
            <div className="dashboard__header__data">
                {data.map((item, index) => (
                        <div className="dashboard__header__data__row content__sub__padding">
                            <input type="checkbox" className="dashboard__header__labels--checkbox"/>
                            <p className="spare">{item['Serial Platform']}<br/><p className="dashboard__header__data__row--serial-postman">{item['Serial Postman']}</p></p>
                            <p className="spare">{item['Asset ID Platform']}<br/><p className="dashboard__header__data__row--serial-postman">{item['Asset ID Platform']}</p></p>
                            <p className="spare">{item['Source']}</p>
                        </div>
                ))}
            </div>

        </div>
    );
};

export default Dashboard;