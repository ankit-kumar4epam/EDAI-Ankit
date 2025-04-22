import React, { useEffect } from "react";
import Layout from "./Layout";
import "./css//Home.css";
import SecInputBtn from "../atoms/SecInputBtn";
import { Link } from "react-router-dom";
import Cards from "../atoms/Cards";
import axios from "axios";

const Home = () => {
  // const [popularCars, setPopularCars] = useState({});
  // useEffect(() => {
  //   const response = axios.get("");
  //   setPopularCars();

  //   return () => {
  //     second;
  //   };
  // }, [third]);

  return (
    <Layout>
      <main id="homepage">
        <div>Filter will be coming here</div>
        {/* Popular Cars */}
        <section id="popular-cars">
          <div className="subheadings">(POPULAR CARS)</div>
          <div className="popularCars">
            <Cards />
            <Cards />
            <Cards />
            <Cards />
          </div>
          <div id="go-to-car">
            <Link to="/cars">View all cars</Link>
          </div>
        </section>
        {/* Section About us */}
        <section id="about-us">
          <div className="subheadings">(ABOUT US)</div>
          <div className="about-item"></div>
          <div>about2</div>
          <div>about3</div>
        </section>
      </main>
    </Layout>
  );
};

export default Home;
