import React, { useState } from "react";
import "./DeliveryLinks.css"
import { useRestaurantData } from '../../data/restaurantData';


function DeliveryLinks({show}){
    //const [links, setLinks] = useState(show)
    const { restaurantData, loading, error } = useRestaurantData();

    // Afficher un message de chargement pendant la récupération des données
    if (loading) return <div className="containerGlobalInfoRestaurant">Chargement des informations...</div>;
    
    // Gérer les erreurs
    if (error) return <div className="containerGlobalInfoRestaurant">Erreur: Impossible de charger les informations</div>;
    
    return(
        <div className="containerDeliveryLinks">

            
                {restaurantData.pickup_option && (
                    <a href={`https://platforms.yumco.fr/${restaurantData.id}`}><div className="containerClickAndCollect">
                        <span class="material-symbols-outlined">shopping_bag</span>
                        <p className="text-delivery">CLICK & COLLECT</p>
                    </div></a>
                )}
            
            {(restaurantData.midday_delivery && new Date().getHours() < 16) || (restaurantData.evening_delivery && new Date().getHours() >= 16) && (
                <a target="blank" href={`https://platforms.yumco.fr/${restaurantData.id}`}>
                    <div className="containerLinks">
                        <span className="material-symbols-outlined">directions_bike</span>
                        <p className="text-delivery">LIVRAISON</p>
                    </div>
                </a>
            )}

            {restaurantData.reservation_option && (
                <a href={`https://platforms.yumco.fr/${restaurantData.id}`}>
                    <div className="containerLinks">
                        <span className="material-symbols-outlined">event_seat</span>
                        <p className="text-delivery">RÉSERVATION</p>
                    </div>
                </a>
            )}
        
        </div>
    )
}

export default DeliveryLinks