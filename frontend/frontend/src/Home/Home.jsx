/*import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bakery1 from "../Assets/bakery.jpg";
import bakery2 from "../Assets/bakery1.jpeg";
import beverages from "../Assets/beverages.jpeg";
import burger from "../Assets/burger.jpeg";
import cake from "../Assets/cake.jpeg";
import pizza from "../Assets/pizza.jpeg";
import crape from "../Assets/crape.jpeg";
import pizza1 from "../Assets/pizza1.jpeg";
import sandwitch from "../Assets/sandwitch.jpeg";
import HomeCanteenMenu from "./HomeCanteenMenu";
import GodaUda from "../Assets/Goda Uda canteen.jpg";
import GodaYata from "../Assets/Goda Yata.jpeg";
import Wala from "../Assets/Wala Canteen.jpg";
import SentraCourt from "../Assets/Sentra Court.jpeg";
import LCanteen from "../Assets/L Canteen.jpg";
import CivilCanteen from "../Assets/Civil Canteen.jpeg";


function Home() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [selectedCanteen, setSelectedCanteen] = useState(null);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      try {
        const { data } = await axios.post(
          'http://localhost:3002/verify-cookie',
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
        setUsername(user);
        if (status) {
          console.log("Success message ");
          toast(`Hello ${user}`, {
            position: "top-right",
          });
        } else {
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Network Error", error);
        removeCookie("token");
        navigate("/login");
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);



  const handleCanteenClick = (canteen) => {
    setSelectedCanteen(canteen);
  };

  const renderMenu = () => {
    if (!selectedCanteen) {
      return <p>Please select a canteen to see today's menu.</p>;
    }

    const menu = {
      "Goda Canteen": ["Item Goda 1", "Item 2", "Item 3"],
      "Canteen 2": ["Item A", "Item B", "Item C"],
      "Canteen 3": ["Item X", "Item Y", "Item Z"],
      "Canteen 4": ["Item M", "Item N", "Item O"],
    };

    return (
      <div>
        <h2>{selectedCanteen} - Today's Menu</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Food Item</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {menu[selectedCanteen].map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item}</td>
                <td>{item}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
    

      <div>
        <Carousel interval={3000}>
          <Carousel.Item>
            <img
              className="d-block w-100 custom-carousel-img"
              src={bakery1}
              alt="Slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Sample Description</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 custom-carousel-img"
              src={bakery2}
              alt="Slide"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Sample Description</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 custom-carousel-img"
              src={beverages}
              alt="Slide"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Sample Description</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 custom-carousel-img"
              src={burger}
              alt="Slide"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Sample Description</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 custom-carousel-img"
              src={cake}
              alt="Slide"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Sample Description</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 custom-carousel-img"
              src={crape}
              alt="Slide"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Sample Description</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 custom-carousel-img"
              src={pizza}
              alt="Slide"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Sample Description</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 custom-carousel-img"
              src={pizza1}
              alt="Slide"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Sample Description</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 custom-carousel-img"
              src={sandwitch}
              alt="Slide"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Sample Description</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <center>
          <h1 style={{ marginTop: "50px", marginBottom: "30px" }}>
        Canteens
          </h1>
        </center>
        <div className="box-container">
          <div className="box" onClick={() => handleCanteenClick("Goda Canteen ")}>
            <div className="box-text">Goda Uda Canteen</div>
          // <img src={bakery1} alt="Goda Canteen" className="box-img" /> 
            <img src={GodaUda} alt="Goda Uda Canteen" className="box-img" />
          </div>
          <div className="box" onClick={() => handleCanteenClick("Canteen 2")}>
            <div className="box-text">Goda Yata Canteen</div>
          //  <img src={bakery2} alt="Canteen 2" className="box-img" /> 
            <img src={GodaYata} alt="Goda Yata Canteen" className="box-img" />
          </div>
          <div className="box" onClick={() => handleCanteenClick("Canteen 3")}>
            <div className="box-text">Wala Canteen</div>
           // <img src={beverages} alt="Canteen 3" className="box-img" />
            <img src={Wala} alt="Wala Canteen" className="box-img" />
          </div>
          <div className="box" onClick={() => handleCanteenClick("Canteen 4")}>
            <div className="box-text">Sentra Court</div>
           // <img src={burger} alt="Canteen 4" className="box-img" />
            <img src={SentraCourt} alt="Sentra Court" className="box-img" />
          </div>
          <div className="box" onClick={() => handleCanteenClick("Canteen 4")}>
            <div className="box-text">L Canteen</div>
           // <img src={burger} alt="Canteen 4" className="box-img" />
            <img src={LCanteen} alt="L Canteen" className="box-img" />
          </div>
          <div className="box" onClick={() => handleCanteenClick("Canteen 4")}>
            <div className="box-text">Civil Canteen</div>
           // <img src={burger} alt="Canteen 4" className="box-img" /> 
            <img src={CivilCanteen} alt="Civil Canteen" className="box-img" />
          </div>

        </div>
        {renderMenu()}
      </div>
      <ToastContainer />
    </>
  );
}

export default Home;

*/



import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bakery1 from "../Assets/bakery.jpg";
import bakery2 from "../Assets/bakery1.jpeg";
import beverages from "../Assets/beverages.jpeg";
import burger from "../Assets/burger.jpeg";
import cake from "../Assets/cake.jpeg";
import pizza from "../Assets/pizza.jpeg";
import crape from "../Assets/crape.jpeg";
import pizza1 from "../Assets/pizza1.jpeg";
import sandwitch from "../Assets/sandwitch.jpeg";
import HomeCanteenMenu from "./HomeCanteenMenu";
import GodaUda from "../Assets/Goda Uda canteen.jpg";
import GodaYata from "../Assets/Goda Yata.jpeg";
import Wala from "../Assets/Wala Canteen.jpg";
import SentraCourt from "../Assets/Sentra Court.jpeg";
import LCanteen from "../Assets/L Canteen.jpg";
import CivilCanteen from "../Assets/Civil Canteen.jpeg";
import staff from "../Assets/staff canteen.jpeg";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);
  const [selectedCanteen, setSelectedCanteen] = useState(null);
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const { data } = await axios.post(
          'http://localhost:3002/verify-cookie',
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
        if (status) {
          login(user);
          console.log("User verified:", user);
          if (!sessionStorage.getItem('welcomeMessageShown')) {
            console.log("Showing toast message");
            toast(`Hello ${user}`, {
              position: "top-right",
            });
            sessionStorage.setItem('welcomeMessageShown', 'true');
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Network Error", error);
        navigate("/login");
      }
    };
    verifyCookie();
  }, [login, navigate]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/categories');
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/foods');
        setFoods(data);
      } catch (error) {
        console.error("Error fetching foods", error);
      }
    };
    fetchFoods();
  }, []);

  const handleCanteenClick = (canteen) => {
    setSelectedCanteen(canteen);
  };

  const renderMenu = () => {
    if (!selectedCanteen) {
      return <p>Please select a canteen to see today's menu.</p>;
    }

    const groupedCategories = categories.reduce((acc, category) => {
      if (!acc[category.category]) {
        acc[category.category] = [];
      }
      acc[category.category].push(category);
      return acc;
    }, {});

    const filteredFoods = foods.filter(food => food.canteen === selectedCanteen);

    return (
      <div>
        <h2>{selectedCanteen} - Today's Menu</h2> <br></br>
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
             {/* <th>Description</th> */}
              <th>Image</th>
              <th>Food name</th>
              <th>Price(Rs.)</th>
              <th>Available Time</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedCategories).map((category, index) => (
             /* <React.Fragment key={index}>
                <tr>
                  <td rowSpan={groupedCategories[category].length}>{category}</td>
                  <td>{groupedCategories[category][0].description}</td>
                  <td>
                    <img
                      src={`https://ucfpbbcfacgrehcoscar.supabase.co/storage/v1/object/public/canteenz/${groupedCategories[category][0].image}`}
                      alt={groupedCategories[category][0].image}
                      width="100"
                    />
                  </td>
                  <td>{filteredFoods.find(food => food.category === category)?.food || ''}</td>
                  <td>{filteredFoods.find(food => food.category === category)?.price || ''}</td>
                  <td>{filteredFoods.find(food => food.category === category)?.time || ''}</td>
                </tr>
                {groupedCategories[category].slice(1).map((item, subIndex) => (
                  <tr key={subIndex}>
                    <td>{item.description}</td>
                    <td>
                      <img
                        src={`https://ucfpbbcfacgrehcoscar.supabase.co/storage/v1/object/public/canteenz/${item.image}`}
                        alt={item.image}
                        width="100"
                      />
                    </td>
                    <td>{filteredFoods.find(food => food.category === category)?.food || ''}</td>
                    <td>{filteredFoods.find(food => food.category === category)?.price || ''}</td>
                    <td>{filteredFoods.find(food => food.category === category)?.time || ''}</td>
                  </tr>
                ))}
              </React.Fragment>*/
              <React.Fragment key={index}>
              {filteredFoods
                .filter(food => food.category === category)
                .map((food, subIndex) => (
                  <tr key={subIndex}>
                    {subIndex === 0 && (
                      <td rowSpan={filteredFoods.filter(f => f.category === category).length}>
                        {category} <br></br> <br></br>
                        <img
                      src={`https://ucfpbbcfacgrehcoscar.supabase.co/storage/v1/object/public/canteenz/${groupedCategories[category][0].image}`}
                      alt={groupedCategories[category][0].image}
                      width="100"
                    />
                      </td>
                    )}
                   {/* <td>{food.description}</td> */}
                    <td>
                      <img
                        src={`https://ucfpbbcfacgrehcoscar.supabase.co/storage/v1/object/public/canteenz/${food.image}`}
                        alt={food.image}
                        width="100"
                      />
                    </td>
                    <td>{food.food}</td>
                    <td>{food.price}</td>
                    <td>{food.time}</td>
                  </tr>
                ))}
            </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <div>
        <Carousel interval={3000}>
          <Carousel.Item>
            <img
              className="d-block w-100 custom-carousel-img"
              src={bakery1}
              alt="Slide"
            />
        {   /* <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Sample Description</p>
            </Carousel.Caption>*/}
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 custom-carousel-img"
              src={bakery2}
              alt="Slide"
            />
           {   /*   <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Sample Description</p> 
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 custom-carousel-img"
              src={beverages}
              alt="Slide"
            />
         {   /*     <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Sample Description</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 custom-carousel-img"
              src={burger}
              alt="Slide"
            />
        {   /*      <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Sample Description</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 custom-carousel-img"
              src={cake}
              alt="Slide"
            />
         {   /*     <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Sample Description</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 custom-carousel-img"
              src={crape}
              alt="Slide"
            />
       {   /*       <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Sample Description</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 custom-carousel-img"
              src={pizza}
              alt="Slide"
            />
     {   /*         <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Sample Description</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 custom-carousel-img"
              src={pizza1}
              alt="Slide"
            />
       {   /*       <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Sample Description</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 custom-carousel-img"
              src={sandwitch}
              alt="Slide"
            />
      {   /*        <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Sample Description</p>
            </Carousel.Caption> */}
          </Carousel.Item>
        </Carousel>

        <center>
          <h1 style={{ marginTop: "50px", marginBottom: "30px" }}>
            Canteens
          </h1>
        </center>
        <div className="box-container">
          <div className="box" onClick={() => handleCanteenClick("Goda Uda Canteen")}>
            <div className="box-text">Goda Uda Canteen</div>
            <img src={GodaUda} alt="Goda Uda Canteen" className="box-img" />
          </div>
          <div className="box" onClick={() => handleCanteenClick("Goda Yata Canteen")}>
            <div className="box-text">Goda Yata Canteen</div>
            <img src={GodaYata} alt="Goda Yata Canteen" className="box-img" />
          </div>
          <div className="box" onClick={() => handleCanteenClick("Wala Canteen")}>
            <div className="box-text">Wala Canteen</div>
            <img src={Wala} alt="Wala Canteen" className="box-img" />
          </div>
        { /* <div className="box" onClick={() => handleCanteenClick("Sentra Court")}>
            <div className="box-text">Sentra Court</div>
            <img src={SentraCourt} alt="Sentra Court" className="box-img" />
          </div> */}
          <div className="box" onClick={() => handleCanteenClick("L Canteen")}>
            <div className="box-text">L Canteen</div>
            <img src={LCanteen} alt="L Canteen" className="box-img" />
          </div>
          <div className="box" onClick={() => handleCanteenClick("Civil Canteen")}>
            <div className="box-text">Civil Canteen</div>
            <img src={CivilCanteen} alt="Civil Canteen" className="box-img" />
          </div>
          <div className="box" onClick={() => handleCanteenClick("Staff Canteen")}>
            <div className="box-text">Staff Canteen</div>
            <img src={staff} alt="Staff Canteen" className="box-img" />
          </div>
        </div>
        {renderMenu()} 
      </div>
      <ToastContainer />
    </>
  );
}

export default Home;