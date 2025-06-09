/*import React, { useState } from 'react';
import { menuData } from '../Home/HomeCanteenMenu';
import './Order.css';
import cake from '../Assets/cake.jpeg'; // Ensure the correct path to the default image

const Order = () => {
    const [selectedCanteen, setSelectedCanteen] = useState('Canteen 1');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleCanteenChange = (event) => {
        setSelectedCanteen(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredMenu = menuData[selectedCanteen].filter(item => {
        return (selectedCategory === 'All' || item.category === selectedCategory) &&
               item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="order-container">
            <div className="sidebar">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="canteen-filter">
                    <label htmlFor="canteen">Select Canteen: </label>
                    <select id="canteen" value={selectedCanteen} onChange={handleCanteenChange}>
                        <option value="Canteen 1">Canteen 1</option>
                        <option value="Canteen 2">Canteen 2</option>
                        <option value="Canteen 3">Canteen 3</option>
                        <option value="Canteen 4">Canteen 4</option>
                    </select>
                </div>
                <div className="category-filter">
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
            </div>
            <div className="menu-section">
                <div className="card-container">
                    {filteredMenu.map((item, index) => (
                        <div className="card" key={index}>
                            <div className="card-icons">
                                <i className="fas fa-heart heart-icon"></i>
                                <i className="fas fa-cart-plus cart-icon"></i>
                            </div>
                            <img src={ cake} alt={item.name} className="card-image" />
                            <div className="card-content">
                                <h3>{item.name}</h3>
                                <p>{item.category}</p>
                                <p>{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Order;
*/






import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Order.css';
import cake from '../Assets/cake.jpeg'; // Default image

const Order = () => {
    const [selectedCanteen, setSelectedCanteen] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [canteens, setCanteens] = useState([]);
    const [categories, setCategories] = useState(['All']);
    const [foods, setFoods] = useState([]);
    const [filteredMenu, setFilteredMenu] = useState([]);

    const [cart, setCart] = useState([]); // State to store the user's cart

    // Function to fetch the cart
    const fetchCart = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3002/api/cart`);
            setCart(data); // Update the cart state with the fetched data
            console.log("Cart fetched successfully:", data);
        } catch (error) {
            console.error("Error fetching cart details", error);
        }
    };

    const addToCart = async (item) => {
        const existingCarts = JSON.parse(localStorage.getItem("carts")) || [];
        const currentCart = existingCarts.find(cart => cart.canteenName === selectedCanteen);

        const orderId = localStorage.getItem("currentOrderId") || generateOrderId();
        const cartItem = { ...item, quantity: 1 };
      
        try {
            if (currentCart) {
          await axios.post("http://localhost:3002/api/cart", {
            orderId: currentCart.orderId,
            canteenName: selectedCanteen,
            items: [cartItem],
        }, { withCredentials: true }); // Add withCredentials to send cookies
        } else {
            // Create a new cart for the selected canteen
            const orderId = generateOrderId();
            await axios.post("http://localhost:3002/api/cart", {
                orderId,
                canteenName: selectedCanteen,
                items: [cartItem],
            }, { withCredentials: true }); // Add withCredentials to send cookies

            // Add the new cart to local storage
            existingCarts.push({ orderId, canteenName: selectedCanteen });
            localStorage.setItem("carts", JSON.stringify(existingCarts));
        }
          alert("Item added to cart!");
          fetchCart(); // Refresh the cart after adding an item
        } catch (error) {
          console.error("Error adding item to cart", error);
        }
      };
      
      const generateOrderId = () => {
        return `ORD-${Date.now()}`;   // Unique order ID - # milliseconds elapsed since January 1, 1970 (Unix Epoch).
      };

      

    // Fetch canteens, categories, and foods on component mount
    useEffect(() => {
        const fetchCanteens = async () => {
            try {
                // List of canteens from your Home.jsx
                const canteenList = [
                    "Goda Uda Canteen",
                    "Goda Yata Canteen",
                    "Wala Canteen",
                    "L Canteen",
                    "Civil Canteen",
                    "Staff Canteen"
                ];
                setCanteens(canteenList);
                
                // Set default selected canteen
                if (canteenList.length > 0) {
                    setSelectedCanteen(canteenList[0]);
                }
            } catch (error) {
                console.error("Error setting up canteens", error);
            }
        };

        const fetchCategories = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/categories');
                const uniqueCategories = ['All', ...new Set(data.map(category => category.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };

        const fetchFoods = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/foods');
                setFoods(data);
            } catch (error) {
                console.error("Error fetching foods", error);
            }
        };

        fetchCanteens();
        fetchCategories();
        fetchFoods();
        fetchCart(); // Fetch the user's cart on component mount
    }, []);

    // Update filtered menu when dependencies change
    useEffect(() => {
        if (selectedCanteen && foods.length > 0) {
            let filtered = foods.filter(food => food.canteen === selectedCanteen);
            
            if (selectedCategory !== 'All') {
                filtered = filtered.filter(food => food.category === selectedCategory);
            }
            
            if (searchTerm) {
                filtered = filtered.filter(food => 
                    food.food.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
            
            // Transform to match the expected structure
            const transformedMenu = filtered.map(food => ({
                name: food.food,
                category: food.category,
                price: food.price,
                image: food.image,
                time: food.time
            }));
            
            setFilteredMenu(transformedMenu);
        } else {
            setFilteredMenu([]);
        }
    }, [selectedCanteen, selectedCategory, searchTerm, foods]);

    const handleCanteenChange = (event) => {
        setSelectedCanteen(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="order-container">
            <div className="sidebar">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="canteen-filter">
                    <label htmlFor="canteen">Select Canteen: </label>
                    <select id="canteen" value={selectedCanteen} onChange={handleCanteenChange}>
                        {canteens.map((canteen) => (
                            <option key={canteen} value={canteen}>
                                {canteen}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="category-filter">
                    <label htmlFor="category">Select Category: </label>
                    <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="menu-section">
                <div className="card-container">
                    {filteredMenu.map((item, index) => (
                        <div className="card" key={index}>
                            <div className="card-icons">
                                <i className="fas fa-heart heart-icon"></i>
                                <i className="fas fa-cart-plus cart-icon" onClick={() => addToCart(item)}></i>
                            </div>
                            <img 
                                src={item.image ? 
                                    `https://ucfpbbcfacgrehcoscar.supabase.co/storage/v1/object/public/canteenz/${item.image}` : 
                                    cake
                                } 
                                alt={item.name} 
                                className="card-image" 
                            />
                            <div className="card-content">
                                <h3>{item.name}</h3>
                                <p>{item.category}</p>
                                <p>Rs.{item.price}.00</p>
                                {item.time && <p>Avaiable time:{item.time}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Order;