import React, {useState} from 'react';

const ZeppelinSubgroupFilter = () => {
    const [filename, setFilename] = useState("");

    const API_URL_dev = "http://localhost:8080/"
    const API_URL_prod = "https://toolsapp-bc0cf2c81289.herokuapp.com/"

    const API_URL_dev_ext = "http://192.168.0.87:8080/"

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        console.log(formData)


        const response = await fetch(API_URL_dev+'api/upload', {
            method: 'POST',
            body: formData,
        });

        console.log(Array.from(formData.values()));

        const data = await response.json();
        setFilename(data.filename);
    };

    return (
        <div className='geofence'>
            <div className="geofence__content">
                <div className='geofence__content__file'>
                    <input
                        id="fileUpload"
                        className="fileInput"
                        type="file"
                        onChange={handleUpload}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="fileUpload" className="geofence__content__file--label title--sub button__box">Upload File +
                    </label>


                    {filename && <a className="geofence__content__file--download label" href={`${API_URL_dev}api/download/${filename}`} download>Download Processed File</a>}
                </div>
            </div>



        </div>
    );
};

export default ZeppelinSubgroupFilter;