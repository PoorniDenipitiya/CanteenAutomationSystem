import React from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Canteen() {
    let query = useQuery();
    let canteenName = query.get("name");

    return (
        <div>
            <h1>{canteenName}</h1>
            <p>Displaying items for {canteenName}</p>
            {/* Add your filter logic here */}
        </div>
    );
}

export default Canteen;