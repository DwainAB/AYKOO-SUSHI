import React, {useEffect, useState} from "react";
import History from "../Components/History/History";
import Quote from "../Components/Quote/Quote";
import InfoRestaurant from "../Components/InfoRestaurant/InfoRestaurant";
import Menu from "../Components/Menu/Menu";
import DeliveryLinks from "../Components/DeliveryLinks/DeliveryLinks";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer"
import { RestaurantProvider } from "../data/restaurantData";

function Home(){

    return(
        <div>
            <RestaurantProvider>
                <Navbar/>
                <DeliveryLinks/>
                <History/>
                {/* <Quote/> */}
                <Menu itemMin={6} itemMax={10} menuHome={true} />
                <InfoRestaurant/>
                <Footer/>
            </RestaurantProvider>
        </div>
    )
}

export default Home