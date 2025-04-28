import axios from "axios";
import { useEffect, useState } from "react";
import AboutItem from "../../atoms/Homepage/AboutItem";
import "./css/About.css";

const About = () => {
  const [aboutUs, setAboutUs] = useState<any[]>([]);
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:8080/api/v1/home/about-us"
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

  return (
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
  );
};

export default About;
