import React from "react";
import "./About.css"; // Ensure you create this CSS file for styling
import uom from "../Assets/uom.png"; // Ensure you have the UoM image in the same folder

const About = () => {
  return (
    <div className="about-container">
      <div className="about-image">
        <img
          src={uom}
          alt="University of Moratuwa"
        />
      </div>
      <div className="about-text">
        <p>
        <b>Welcome to the Canteen Automation System of the University of Moratuwa</b>, an innovative platform designed to streamline and enhance the canteen experience for everyone on campus. Our system aims to provide a faster, more efficient, and user-friendly solution to simplify daily operations and improve the overall dining experience.

<br></br><br></br>Our primary focus is to assist academic and non-academic staff, students, and canteen owners by offering a seamless, technology-driven solution that reduces wait times, ensures accurate order processing, and enhances service efficiency.

<br></br><br></br>Through this system, users can easily browse menus, place orders, and make cashless payments, while canteen owners benefit from improved order management and real-time tracking. We are committed to fostering a more convenient and modern canteen environment that saves time and enhances satisfaction for the entire university community.

<br></br><br></br>Join us in transforming the traditional canteen experience into a smarter, faster, and more connected future!
        </p>
      </div>
    </div>
  );
};

export default About;