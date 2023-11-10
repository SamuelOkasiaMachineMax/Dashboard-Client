import React from 'react';

import './metrics.css'
const Metrics = ({main_title, main_value, sub_title, sub_value}) => {
    return (
        <div className="metrics">
            <div className="metrics__main content__sub__padding">
                <p className="metrics__main--title title--sub">{main_title}</p>
                <p className="metrics__main--value">{main_value}</p>
            </div>
            <div className="metrics__sub content__sub__padding">
                <p className="metrics__sub--value">{sub_title}</p>
                <p className="metrics__sub--title">{sub_value}</p>
            </div>
        </div>
    );
};

export default Metrics;