import { motion } from "framer-motion";
import { useTheme } from "./themeContext";
import banner from "./pexels-fauxels-3183132.jpg";
import Advertisment from "./w69uo7lk.png";
import './homepage.css';
import computers from "./laptop & computer.png";
import homeKitchen from "./home Appliances.png";
import TV from "./TV & speakers.png";
import smartphone from "./Smartphone.jpg";
import { Link } from "react-router-dom";

function Homepage() {
  const { darkMode } = useTheme();
  return (
    <div className={`homepage ${darkMode ? "dark" : "light"}`}>
      <motion.img
        className="banner-img"
        src={banner}
        alt="Banner Text"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      />

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
  );
}

export default Homepage;
