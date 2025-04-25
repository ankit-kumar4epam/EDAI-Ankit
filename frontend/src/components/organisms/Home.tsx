import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import "./css//Home.css";
import SecInputBtn from "../atoms/SecInputBtn";
import { Link } from "react-router-dom";
import Cards from "../atoms/Cards";
import axios from "axios";
import AboutItem from "../atoms/Homepage/AboutItem";

const Home = () => {
  const [popularCars, setPopularCars] = useState<any[]>([]);
  const [aboutUs, setAboutUs] = useState<any[]>([]);
  useEffect(() => {
    const fetchPopularCars = async () => {
      try {
        const response = await axios.get(
          "https://car-rental-server-vh0t.onrender.com/api/v1/popularCars"
        );

        if (Array.isArray(response.data.content)) {
          setPopularCars(response.data.content.slice(0, 4));
        } else {
          console.error("Error: Data is not an array");
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchPopularCars();
  }, []);
  // useEffect(() => {
  //   console.log(popularCars);
  // }, [popularCars]);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const resp = await axios.get(
          "https://car-rental-server-vh0t.onrender.com/api/v1/home/about-us"
        );

        // console.log("respose", resp);
        if (Array.isArray(resp.data.content)) {
          setAboutUs(resp.data.content);
        } else {
          setAboutUs(["Page Not Loaded"]);
        }
      } catch (error) {
        console.error("Error fetching About Data:", error);
      }
    };
    fetchAbout();
  }, []);
  // useEffect(() => {
  //   console.log("about us", aboutUs);
  // }, [aboutUs]);

  return (
    <Layout>
      <main id="homepage">
        <div>Filter will be coming here</div>
        {/* Popular Cars */}
        <section id="popular-cars">
          <div className="subheadings">(POPULAR CARS)</div>
          <div className="popularCars">
            {popularCars.map((car, index) => {
              return (
                <Cards
                  key={index}
                  carRating={car.carRating}
                  model={car.model}
                  img={car.images[0]}
                  location={car.location}
                  status={car.status}
                  pricePerDay={car.pricePerDay}
                />
              );
            })}
          </div>
          <div id="go-to-car">
            <Link to="/cars">View all cars</Link>
          </div>
        </section>
        {/* Section About us */}
        <section id="about-us">
          <div className="subheadings" id="about-subhead">
            (ABOUT US)
          </div>
          {aboutUs.map((elem, key) => {
            return (
              <AboutItem
                key={key}
                head={elem.title}
                value={elem.numericValue}
                desc={elem.description}
              />
            );
          })}
        </section>

        {/* Section Maps */}
        <section id="map">
          <div className="subheadings">(OUR LOCATIONS)</div>
          <div className="map-container">
            <div className="map-locations">
              <div className="map-item">
                <div className="map-location-place">Location 1</div>
                <div className="map-location-description">
                  Location Description 1
                </div>
              </div>
              <div className="map-item">
                <div className="map-location-place">Location 2</div>
                <div className="map-location-description">
                  Location Description 2
                </div>
              </div>
              <div className="map-item">
                <div className="map-location-place">Location 3</div>
                <div className="map-location-description">
                  Location Description 3
                </div>
              </div>
              <div className="map-item">
                <div className="map-location-place">Location 4</div>
                <div className="map-location-description">
                  Location Description 4
                </div>
              </div>
              <div className="map-item">
                <div className="map-location-place">Location 5</div>
                <div className="map-location-description">
                  Location Description 5
                </div>
              </div>
              <div className="map-item">
                <div className="map-location-place">Location 6</div>
                <div className="map-location-description">
                  Location Description 6
                </div>
              </div>
            </div>
            <div className="map-box">
              <div id="map-view">Map</div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Home;
