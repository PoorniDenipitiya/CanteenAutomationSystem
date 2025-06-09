import React, { useState } from 'react';
import './HomeCanteenMenu.css';

export const menuData = {
    "Canteen 1": [
        { category: 'Beverages', name: 'Item 1', price: 'Rs.200.00', image: 'path/to/image1.jpg' },
        { category: 'Food', name: 'Item 2', price: 'Rs.200.00', image: 'path/to/image2.jpg' },
        { category: 'Dessert', name: 'Item 3', price: 'Rs.200.00', image: 'path/to/image3.jpg' },
        { category: 'Bakery Items', name: 'Item 4', price: 'Rs.200.00', image: 'path/to/image4.jpg' },
        { category: 'Pharmacy Items', name: 'Item 5', price: 'Rs.200.00', image: 'path/to/image5.jpg' },
        { category: 'Stationary Items', name: 'Item 6', price: 'Rs.200.00', image: 'path/to/image6.jpg' }
    ],
    "Canteen 2": [
        { category: 'Beverages', name: 'Item A', price: 'Rs.200.00', image: 'path/to/imageA.jpg' },
        { category: 'Food', name: 'Item B', price: 'Rs.200.00', image: 'path/to/imageB.jpg' },
        { category: 'Dessert', name: 'Item C', price: 'Rs.200.00', image: 'path/to/imageC.jpg' },
        { category: 'Bakery Items', name: 'Item D', price: 'Rs.200.00', image: 'path/to/imageD.jpg' },
        { category: 'Pharmacy Items', name: 'Item E', price: 'Rs.200.00', image: 'path/to/imageE.jpg' },
        { category: 'Stationary Items', name: 'Item F', price: 'Rs.200.00', image: 'path/to/imageF.jpg' }
    ],
    "Canteen 3": [
        { category: 'Beverages', name: 'Item S', price: 'Rs.200.00', image: 'path/to/imageS.jpg' },
        { category: 'Food', name: 'Item T', price: 'Rs.200.00', image: 'path/to/imageT.jpg' },
        { category: 'Dessert', name: 'Item U', price: 'Rs.200.00', image: 'path/to/imageU.jpg' },
        { category: 'Bakery Items', name: 'Item V', price: 'Rs.200.00', image: 'path/to/imageV.jpg' },
        { category: 'Pharmacy Items', name: 'Item W', price: 'Rs.200.00', image: 'path/to/imageW.jpg' },
        { category: 'Stationary Items', name: 'Item X', price: 'Rs.200.00', image: 'path/to/imageX.jpg' }
    ],
    "Canteen 4": [
        { category: 'Beverages', name: 'Item M', price: 'Rs.200.00', image: 'path/to/imageM.jpg' },
        { category: 'Food', name: 'Item N', price: 'Rs.200.00', image: 'path/to/imageN.jpg' },
        { category: 'Dessert', name: 'Item O', price: 'Rs.200.00', image: 'path/to/imageO.jpg' },
        { category: 'Bakery Items', name: 'Item P', price: 'Rs.200.00', image: 'path/to/imageP.jpg' },
        { category: 'Pharmacy Items', name: 'Item Q', price: 'Rs.200.00', image: 'path/to/imageQ.jpg' },
        { category: 'Stationary Items', name: 'Item R', price: 'Rs.200.00', image: 'path/to/imageR.jpg' }
    ]
};

const HomeCanteenMenu = ({ selectedCanteen }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const renderMenu = () => {
        if (!selectedCanteen) {
            return <p className="menu-message">Please select a canteen to see today's menu.</p>;
        }

        const filteredMenu = selectedCategory === 'All'
            ? menuData[selectedCanteen]
            : menuData[selectedCanteen]?.filter(item => item.category === selectedCategory);

        if (!filteredMenu) {
            return <p className="menu-message">No menu available for the selected canteen.</p>;
        }

        return (
            <div className="menu-section">
                <h2 className="canteen-name">{selectedCanteen} - Today's Menu</h2>
                <div className="filter-container">
                    <label htmlFor="category">Select Category: </label>
                    <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="All">All</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Food">Food</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Bakery Items">Bakery Items</option>
                        <option value="Pharmacy Items">Pharmacy Items</option>
                        <option value="Stationary Items">Stationary Items</option>
                    </select>
                </div>
                <table className="menu-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMenu.map((item, index) => (
                            <tr key={index}>
                                <td>{item.category}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td><img src={item.image} alt={item.name} className="item-image" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="menu-container">
            {renderMenu()}
        </div>
    );
};

export default HomeCanteenMenu;