import React from "react";
import "./InfoRestaurant.css";
import { useRestaurantData } from '../../data/restaurantData';

function InfoRestaurant() {
  const { restaurantData, loading, error } = useRestaurantData();

  // Afficher un message de chargement pendant la récupération des données
  if (loading) return <div className="containerGlobalInfoRestaurant">Chargement des informations...</div>;
  
  // Gérer les erreurs
  if (error) return <div className="containerGlobalInfoRestaurant">Erreur: Impossible de charger les informations</div>;
  
  // Protection contre null
  if (!restaurantData || !restaurantData.hours) return <div className="containerGlobalInfoRestaurant">Aucune information disponible</div>;

  // Organiser les heures par jour de la semaine (0 = lundi, 6 = dimanche dans votre système)
  const hoursByDay = {};
  restaurantData.hours.forEach(hourData => {
    hoursByDay[hourData.day_of_week] = hourData;
  });

  // Fonction pour formater les heures d'ouverture d'un jour spécifique
  const formatHoursForDay = (dayIndex) => {
    const dayData = hoursByDay[dayIndex];
    
    if (!dayData) {
      return "Information non disponible";
    }
    
    if (dayData.is_closed_all_day) {
      return "Fermé";
    }
    
    let result = "";
    
    // Format pour le déjeuner et le dîner
    if (dayData.is_lunch_closed) {
      result += "M: Fermé";
    } else {
      result += `M: ${formatTime(dayData.lunch_open_time)} - ${formatTime(dayData.lunch_close_time)}`;
    }
    
    result += " | "; // Ajout d'un séparateur entre le déjeuner et le dîner
    
    if (dayData.is_dinner_closed) {
      result += "S: Fermé";
    } else {
      result += `S: ${formatTime(dayData.dinner_open_time)} - ${formatTime(dayData.dinner_close_time)}`;
    }
    
    return result;
  };
  
  // Fonction pour convertir le format de l'heure (ex: "11:45:00" -> "11h45")
  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    return `${hours}h${minutes}`;
  };

  // Fonction pour afficher du texte avec des sauts de ligne
  const formatText = (text) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div className="containerGlobalInfoRestaurant" id="contact">
      <h2 className="titleInfoRestaurant">Où nous trouver</h2>

      <div className="container-info">
        <div className="container-info-hour" id="hours">
          <h2 className="hour-title">Horaires :</h2>
          <div className="opening">
            <div className="days">
              <p className="day">Lundi</p>
              <p className="day">Mardi</p>
              <p className="day">Mercredi</p>
              <p className="day">Jeudi</p>
              <p className="day">Vendredi</p>
              <p className="day">Samedi</p>
              <p className="day">Dimanche</p>
            </div>
            <div className="Hours">
              <p className="hour">{formatText(formatHoursForDay(0))}</p>
              <p className="hour">{formatText(formatHoursForDay(1))}</p>
              <p className="hour">{formatText(formatHoursForDay(2))}</p>
              <p className="hour">{formatText(formatHoursForDay(3))}</p>
              <p className="hour">{formatText(formatHoursForDay(4))}</p>
              <p className="hour">{formatText(formatHoursForDay(5))}</p>
              <p className="hour">{formatText(formatHoursForDay(6))}</p>
            </div>
          </div>
        </div>

        <div className="container-map">
          {restaurantData.address && (
            <iframe 
              width="544" 
              height="496" 
              frameBorder="0" 
              scrolling="no" 
              marginHeight="0" 
              marginWidth="0" 
              id="gmap_canvas" 
              src={`https://maps.google.com/maps?width=544&amp;height=496&amp;hl=fr&amp;q=${encodeURIComponent(
                `${restaurantData.address.street} ${restaurantData.address.city}`
              )}&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`}
              title="Localisation du restaurant"
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
}

export default InfoRestaurant;