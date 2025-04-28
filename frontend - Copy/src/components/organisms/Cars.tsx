import { useEffect, useState } from "react";
import Layout from "./Layout";
import "./css/Cars.css";
import axios from "axios";
import Filter from "../molecules/Homepage/Filter";
import { useFilter } from "../../context/FilterContext";

const Cars = () => {
  const [carsList, setCarsList] = useState<any[]>([]);
  const { filters } = useFilter();

  useEffect(() => {
    const fetchDefaultCars = async () => {
      const response = await axios.get("http://localhost:8080/api/v1/cars", {
        params: {
          page: 1,
          size: 10,
        },
      });
      console.log(response);
    };
    fetchDefaultCars;
  });
  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Extract the necessary filter values
        const {
          pickUpLoc,
          dropOffLoc,
          pickUpDate,
          dropOffDate,
          category,
          gearbox,
          engine,
          priceMin,
          priceMax,
        } = filters;

        // Make sure the filters are set up correctly
        console.log(filters);

        const response = await axios.get("http://localhost:8080/api/v1/cars", {
          params: {
            pickupLocationId: pickUpLoc,
            dropOffLocationId: dropOffLoc,
            category: category,
            gearBoxType: gearbox,
            fuelType: engine,
            minPrice: priceMin,
            maxPrice: priceMax,
            page: 1,
            size: 10,
          },
        });

        console.log("Fetched cars:", response);

        if (response.data.content) {
          setCarsList(response.data.content);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, [filters]);

  return (
    <Layout>
      <main id="carspage">
        <Filter />
        {/* You can now map over the carsList and display them */}
        <div className="cars-list">
          {carsList.map((car, index) => (
            <div key={index} className="car-item">
              <h3>{car.name}</h3>
              {/* Add other car properties as needed */}
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default Cars;
