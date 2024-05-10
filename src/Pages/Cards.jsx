import React, { useState } from "react";
import './Cards.css';
import { motion } from "framer-motion";

export default function Cards({ title, description }) {
  return (
    <div>
      <div className="card" id="cards">
        <div className="text">
          {title}
          <p className="subtitle">{description}</p>
        </div>
        <div className="icons">
          <a className="btn" href="/survey">
            <motion.button
              className="custom-button"
              whileHover={{ scale: 1.08 }}
            >
              Preview
            </motion.button>
          </a>
        </div>

      </div>
      <br />

    </div>
  );
}

