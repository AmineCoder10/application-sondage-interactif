import React from 'react';
import './Footer.css';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import logo from "../../assets/checkee.png";


function Footer() {
    const year = new Date().getFullYear();
    return (
        <div className="footer__wrapper">
            <Container>
                <Row>
                    <Col lg='7'>
                        <div className="footer__logo d-flex align-items-center ">
                            <div>
                                <NavLink to="/home" className="nav__logo">
                                    <img src={logo} alt="logo" />
                                    <p style={{ color: "white" }}>POLLMASTER</p>
                                </NavLink>
                            </div>
                        </div>

                        <p className="footer__text mt-4">
                            HELLO, Create customized surveys tailored to your needs. Gather
                            valuable insights, make informed decisions, and engage with your
                            audience like never before.
                        </p>
                    </Col>

                    <Col lg="3">
                        <div className="footer__quick-links" >
                            <h4 className="quick__links-title">Contact</h4>
                            <ListGroup className="footer__contact">
                                <ListGroupItem className='border-0 ps-0 d-flex align-items-center gap-2'>
                                    <span><i className="ri-map-pin-line"></i></span>
                                    <p> Université Internationale de Rabat Technopolis Rabat-Salé</p>
                                </ListGroupItem>
                                <ListGroupItem className='border-0 ps-0 d-flex align-items-center gap-2'>
                                    <span><i className="ri-phone-line"></i></span>
                                    <p>+123 456 789</p>
                                </ListGroupItem>
                                <ListGroupItem className='border-0 ps-0 d-flex align-items-center gap-2'>
                                    <span><i className="ri-mail-line"></i></span>
                                    <p>PollMaster@gmail.com</p>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>
                    <Col lg="12">
                        <p className="footer__copyright">
                            Copyright © {year} developed by<Link to="/ourteam" style={{textDecoration: "underline"}}>OurTeam</Link>. All right reserved.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer;