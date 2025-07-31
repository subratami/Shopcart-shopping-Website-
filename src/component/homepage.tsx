import { motion } from "framer-motion";
import { useTheme } from "./themeContext";
import Advertisment from "./w69uo7lk.png";
import './homepage.css';
import computers from "./laptop & computer.png";
import homeKitchen from "./home Appliances.png";
import TV from "./TV & speakers.png";
import smartphone from "./Smartphone.jpg";
import { Link } from "react-router-dom";
import samsungtv from "./samsungTV.png";
import samsungtv1 from "./samsungtv1 (1).jpg";
import lgwashing from "./lg washing machine.png";
import lgwashing1 from "./lg washing machine2.jpg";
import refigerator from "./whirpool refrigirator.gif";
import refigerator1 from "./whirpool refrigirator1.gif";
import { useState, useEffect } from "react";

function Homepage() {
  const { darkMode } = useTheme();
  const images: string[] = [
    samsungtv,lgwashing,refigerator
  ];
  const image: string[] = [
    samsungtv1,lgwashing1,refigerator1
  ];
const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

     return () => clearInterval(interval);
  }, []);

    // Manual navigation
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Dot navigation
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (<>
    <div className={`homepage ${darkMode ? "dark" : "light"}`}>
      <motion.div className="desktop-banner"
      initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}>
        <button className="goToPrevious"
          onClick={goToPrevious}>
          ◀
        </button>
      <motion.img
        className="banner-img"
        src={images[currentIndex]}
        alt="Banner Text"/>
        {/* Manual Buttons */}
        
        <button className="goToNext"
          onClick={goToNext}>
          ▶
        </button>
        {/* Dots */}
        <div className="Dots">
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: currentIndex === index ? '#333' : '#ccc',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </motion.div>
      <motion.div className="mobile-banner">
      <motion.img
        className="banner-img"
        src={image[currentIndex]}
        alt="Banner Text"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      />
        {/* Manual Buttons */}
        <button className="goToPrevious"
          onClick={goToPrevious}
        >
          ◀
        </button>
        <button className="goToNext"
          onClick={goToNext}>
          ▶
        </button>
        {/* Dots */}
        <div className="Dots">
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: currentIndex === index ? '#333' : '#ccc',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </motion.div>

      <motion.img
        className="banner-Adv"
        src={Advertisment}
        alt="Banner Add"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      <div className="categories">
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <strong>Shop by Categories</strong>
        </motion.span>
        <hr />

        <ul className="categories-list">
          <motion.li
            className="electronics"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
              <motion.img
                src={computers}
                alt="Computer & Laptop"
                title="Computer & Laptop"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              />
          </motion.li>

          <motion.li
            className="home-kitchen"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.img
              src={homeKitchen}
              alt="Home Appliances"
              title="Home Appliances"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          </motion.li>

          <motion.li
            className="TV & Speakers"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.img
              src={TV}
              alt="TV & Speakers"
              title="TV & Speakers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
          </motion.li>

          <motion.li
            className="Smartphone"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to={"/search"}>
            <motion.img
              src={smartphone}
              alt="Smartphone"
              title="Smartphone"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            />
            </Link>
          </motion.li>
        </ul>
      </div>
    </div>
    </>
  );
}

export default Homepage;
