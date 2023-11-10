import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'asset_id', headerName: 'Asset ID', width: 130 },
    { field: 'machine_name', headerName: 'Machine Name', width: 200 },
    { field: 'source_status', headerName: 'Source Status', width: 150 },
    { field: 'battery_voltage', headerName: 'Battery Voltage', width: 150 },
    { field: 'signal_status', headerName: 'Signal Status', width: 130 },
    { field: 'device_model', headerName: 'Device Model', width: 130 },
    // If you want to display customer_id, add this:
    // { field: 'customer_id', headerName: 'Customer ID', width: 100 },
];


const DataTable = ( {data} ) => {
    return (
        <DataGrid
            rows={data}
            columns= {columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
        />
    );
};

export default DataTable;