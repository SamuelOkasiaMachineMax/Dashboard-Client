import { Button } from '@mui/material';



const FilterPanel = ( {onApplyFilters} ) => {
    const handleApply = () => {
        // Logic to handle the filter conditions
        // onApplyFilters(filteredData);
    };

    return (
        <div>
            {/* Add Input fields for filters */}
            <Button onClick={handleApply}>Apply Filters</Button>
        </div>
    );
};

export default FilterPanel;