import { Link } from "react-router-dom";

import './HomePage.css'
import { motion } from "framer-motion";
import img from '../../assets/checked.png';
import CardGallery from '../../Pages/CardGallery';


function HomePage() {
  const year = new Date().getFullYear();

  return (
    <>
      <section className="hero__section">
        <div className="hero__content">
          <p className="hero__subtitle">best Pool plateform in {year}</p>
          <h2>Make Your Survey</h2>
          <p>
            {" "}
            HELLO, Create customized surveys tailored to your needs. Gather 
            valuable insights, make informed decisions, and engage with your
            audience like never before.
          </p>
          <br />
          <motion.button className="startSbutton" whileHover={{ scale: 1.1 }}>
            <Link to="/create">START</Link>
          </motion.button>

          <a href="#cards" style={{ marginLeft: "30px" }}>
            <motion.button className="startSbutton" whileHover={{ scale: 1.1 }}>
              SURVIES
            </motion.button>
          </a>
        </div>

        <div className="hero__image">
          <img src={img} alt="hero_image" style={{ width: "130%" }} />
        </div>
      </section>

      <div className="card-container" id="#cards">
        <div className="card-group">
          <CardGallery />
        </div>
      </div>
    </>
  );
}

export default HomePage;
