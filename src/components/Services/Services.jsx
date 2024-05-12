import React from 'react';
import './Services.css';
import {motion} from 'framer-motion';
import servicesData from '../../components/../data/ServicesData';


function Services() {
    return (
        <section className="services">

            {
                servicesData.map((item, index) => {
                    return (
                        <motion.div  whileHover={{scale: 1.1}}className="service__item" key={index} style={{background:`${item.bg}`}}>
                            <div className="icon__service">
                                <span><i className={item.icon}></i></span>
                            </div>
                            <div className="content__service">
                                <h3>{item.title}</h3>
                                <p>{item.subtitle}</p>
                            </div>
                        </motion.div>
                    )
                })
            }


        </section>
    )
}

export default Services;