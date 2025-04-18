import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.png";
import banner from "../../Assets/banner.png";
import "./Navbar.css";
import TextJson from "../TextJson/TextJson.json";
import bannerLaptop from "../../Assets/1.png"
import bannerMobile from "../../Assets/bannerMobile.png"
import { useRestaurantData } from '../../data/restaurantData';


function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { restaurantData, loading, error } = useRestaurantData();

    
    const navigate = useNavigate();

    const handleAnchorClick = (anchor) => {
        navigate('/');
        setTimeout(() => {
            const element = document.getElementById(anchor);
            if (element) {
                const offset = -80; // Ajustez cette valeur selon la hauteur de votre barre de navigation
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = element.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition + offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }, 100);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const formatText = (text) => {
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    const isPanierPage = location.pathname === '/panier';

    if (loading) return <div>Chargement...</div>;
  
    // Gérer les erreurs
    if (error) return <div>Erreur de chargement des données</div>;

    return (
        <div className="containerGlobalNavbar" id="home" style={{ height: isPanierPage ? '130px' : '100vh' }}>
            {!isPanierPage && <div className="shadowNavbar"></div>}
            {!isPanierPage && (
                <img className="imgNavbar" src={window.innerWidth <= 1200 ? bannerMobile : (window.innerWidth <= 1500 ? bannerLaptop : banner)} alt="" />
            )}
            
            <div className="containerTitle">
                {!isPanierPage && <h1>{restaurantData.name}</h1>}
                {!isPanierPage && <div className="mouse-container">
                    <div className="mouse">
                        <div className="scroll-wheel"></div>
                    </div>
                </div>}
            </div>
            <div className={`menu-icon ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <nav className={`containerNavbar ${isOpen ? 'open' : ''}`}>
                <div></div>
                <div className="containerImgNavbar">
                    <img className="logoNavbar" src={logo} alt="" />
                </div>
                <div className="listNavbar">
                    <Link className="itemListNavbar" style={{ color: isPanierPage ? 'black' : '#fff' }} to="/" onClick={() => handleAnchorClick('home')}><p>{formatText(TextJson.nav1)}</p></Link>
                    <Link className="itemListNavbar" style={{ color: isPanierPage ? 'black' : '#fff' }} to="/" onClick={() => handleAnchorClick('menu')}><p>{formatText(TextJson.nav2)}</p></Link>
                    <Link className="itemListNavbar" style={{ color: isPanierPage ? 'black' : '#fff' }} to="/" onClick={() => handleAnchorClick('contact')}><p>{formatText(TextJson.nav3)}</p></Link>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
