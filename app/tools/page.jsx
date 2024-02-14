'use client'

import { useState } from 'react';
import Title from "@/components /title/title";
import "./page.css"

import Geofence_formatter from "@/components_tools/geofence_formatter/geofence_formatter";
import Subgroup_filter from "@/components_tools/subgroup_filter/subgroup_filter";
import Zeppelin_subgroup_filter from "@/components_tools/zeppelin_subgroup_filter/zeppelin_subgroup_filter";
import {useRouter} from "next/navigation";
const Page = () => {

    const router = useRouter();
    const [showPage, setShowPage] = useState(false);

    const toolsList = ["GeoFence Formatter", "Sub Org Filter"];
    const [selectedTool, setSelectedTool] = useState(null);

    const [selectedButton, setSelectedButton] = useState(null);

    // Function to handle button click
    const handleButtonClick = (buttonId) => {
        setSelectedButton(buttonId);
    };

    // A helper function to determine the button's style
    const getButtonClass = (buttonId) => {
        return buttonId === selectedButton ? 'button button-selected title--sub' : 'button title--sub';
    };

    const renderSelectedTool = () => {
        switch (selectedTool) {
            case 'GeoFence Formatter':
                return <Geofence_formatter />;
            case 'Sub Org Filter':
                return <Subgroup_filter />;


            default:
                return <div className="title--title">Select a tool from the list</div>;
        }
    };

    return (
        <div className="tools">
            <Title title="Tools"/>
            <div className="tools__content section__padding">
                <div className="tools__content__menu">
                    {toolsList.map((buttonId) => (
                        <button
                            key={buttonId}
                            className={getButtonClass(buttonId)}
                            onClick={() => {
                                handleButtonClick(buttonId);
                                setSelectedTool(buttonId);
                            }}
                        >
                            {buttonId}
                        </button>
                    ))}
                </div>
                <div className="tools__content__window">
                    {renderSelectedTool()}
                </div>
            </div>
        </div>
    );
};

export default Page;