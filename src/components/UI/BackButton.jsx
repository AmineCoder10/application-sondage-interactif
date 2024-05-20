import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const BackButton = ({ style }) => {
    const navigate = useNavigate();

    return (
        <motion.button
            className="collect-btn"
            whileHover={{ scale: 1.08 }}
            onClick={() => navigate('/home')}
            style={style}
        >
            <i class="ri-arrow-left-line" style={{ marginRight: "15px" }}></i>
            Back
        </motion.button>
    );
};

export default BackButton;
