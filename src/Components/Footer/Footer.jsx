import React from "react";
import "./Footer.css"
import TextJson from "../TextJson/TextJson.json"
import { useRestaurantData } from '../../data/restaurantData';

function Footer(){
    const { restaurantData, loading, error } = useRestaurantData();

    // Afficher un message de chargement pendant la récupération des données
    if (loading) return <div className="containerGlobalInfoRestaurant">Chargement des informations...</div>;
    
    // Gérer les erreurs
    if (error) return <div className="containerGlobalInfoRestaurant">Erreur: Impossible de charger les informations</div>;

    const formatText = (text) => {
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    return(
        <div className="containerGlobalFooter">
            <h2 className="titleFooter">A bientôt</h2>
            <div className="lineFooter"></div>

            <div className="containerContentFooter">

                <div className="contentFooterInfoRestaurant">
                    <p className="titleContent">Informations</p>
                    <p className="phoneRestaurant">{restaurantData.phone.replace(/(\d{2})(?=\d)/g, '$1 ')}</p>
                    {restaurantData.email && <p className="emailRestaurant">{restaurantData.email}</p>}
                    <p className="addressRestaurant">{restaurantData.address.street}, {restaurantData.address.postal_code} {restaurantData.address.city}</p>
                </div>

                <div className="contentFooterInfoRestaurant ">
                    <p className="makeTo">Réalisé par <span>YumCo</span></p>
                </div>

                <div className="contentFooterInfoRestaurant">
                    <p className="titleContent"></p>
                    <a href="/legalNotices" className="legalNoticeButton">Mentions légales</a>
                    <p className="footerTrademark">{restaurantData.name} © 2025</p>
                </div>

            </div>
        </div>
    )
}

export default Footer