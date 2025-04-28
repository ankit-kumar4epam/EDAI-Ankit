import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Cards from "../../atoms/Cards";
import { Link } from "react-router-dom";
import "./css/PopularCars.css";
import PopCars from "../../../../public/popularCars.json";

const PopularCars = () => {
  const isLarge = useMediaQuery({ minWidth: 1025 });
  const isDesktop = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  const [popularCars, setPopularCars] = useState<any[]>([]);

  useEffect(() => {
    const fetchPopularCars = async () => {
      try {
        let carsToDisplay = PopCars.slice(0, 4);

        if (isLarge) {
          carsToDisplay = carsToDisplay.slice(0, 4);
        } else if (isDesktop) {
          carsToDisplay = carsToDisplay.slice(0, 3);
        }
        setPopularCars(carsToDisplay);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchPopularCars();
  }, [isLarge, isDesktop]);
  return (
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
  );
};

export default PopularCars;
