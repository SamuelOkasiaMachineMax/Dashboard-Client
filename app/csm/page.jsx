import React from 'react';

import Title from "@/components /title/title";
import FileUpload from "@/components /fileUpload/fileUpload";

import './page.css'
const Page = () => {
    return (
        <div className="csm">
            <Title title="CSM Overview"/>
            <div className="csm__content section__padding">
                <div className="csm__content__fileupload">
                    <FileUpload />
                </div>
                <div className="csm__content__view">
                </div>
            </div>
        </div>
    );
};

export default Page;