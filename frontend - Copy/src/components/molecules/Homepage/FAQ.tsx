import axios from "axios";
import { useEffect, useState } from "react";
import "./css/FAQ.css";
import FAQItem from "../../atoms/Homepage/FAQItem";

const FAQ = () => {
  const [faq, setFaq] = useState<any[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Track the index of the open FAQ

  const toggleIsOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the clicked FAQ
  };

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const resp = await axios.get("http://localhost:8080/api/v1/home/faq");

        if (Array.isArray(resp.data.content)) {
          setFaq(resp.data.content);
        } else {
          setFaq(["Page Not Loaded"]);
        }
      } catch (error) {
        console.error("Error fetching About Data:", error);
      }
    };
    fetchAbout();
  }, []);

  return (
    <section id="faq">
      <div className="subheadings">(FAQ)</div>
      <div id="faq-container">
        {faq.map((item, index) => (
          <FAQItem
            key={index}
            index={index}
            question={item.question}
            answer={item.answer}
            toggleIsOpen={toggleIsOpen}
            openIndex={openIndex}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
