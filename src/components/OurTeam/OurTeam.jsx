/**
 * React component displaying team members.
 * 
 * Renders a section showcasing team members' names, positions, and profile images.
 * Utilizes Framer Motion for hover animations on social media icons.
 */


import React from 'react'
import './OurTeam.css';
import abdo from '../../assets/images/abdo.jpg';
import ghita from '../../assets/images/ghita.jpg';
import amine from '../../assets/images/amine.jpg';
import omar from '../../assets/images/omar.jpg';
import { motion } from 'framer-motion';
import HelmetComponent from '../CustomHook/HelmeComponentt';



export default function OurTeam() {

    const teamMembers = [
        {
            imgUrl: abdo,
            name: 'Abderrahman Idhamoue',
            position: 'Fullstack Developer'
        },

        {
            imgUrl: amine,
            name: 'Amine Mham',
            position: 'Fullstack Developer'
        },

        {
            imgUrl: omar,
            name: 'Omar Achbani',
            position: 'Fullstack Developer'
        },

        {
            imgUrl: ghita,
            name: 'Ghita Attouf',
            position: 'Fullstack Developer'
        },
    ]
    return (
        <>

            <HelmetComponent title="Meet Our Team" />
            <section className='our__team'>
                <div className='container'>
                    <div className='team__content'>
                        <h6 className='subtitle'>Our Team</h6>
                        <h2>
                            Join With <span className='highlight'>Our Team</span>
                        </h2>
                    </div>
                    <div className='team__wrapper'>
                        {
                            teamMembers.map((item, index) => (
                                <div className='team__item' key={index}>
                                    <div className='team__img'>
                                        <img src={item.imgUrl} alt='' />
                                    </div>
                                    <div className='team__details'>
                                        <h4>{item.name}</h4>
                                        <p className='description' style={{ color: "white" }}>{item.position}</p>

                                        <div className='team__member-social'>
                                            <motion.span whileHover={{ scale: 1.2 }}><i className='ri-linkedin-line'></i></motion.span>
                                            <motion.span whileHover={{ scale: 1.2 }}><i className='ri-github-line'></i></motion.span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}