import React, { useState, useEffect } from 'react';
import './Menu.css';
import { fetchRestaurantData } from '../utils/api';
import textJson from "../TextJson/TextJson.json";
import { useRestaurantData } from '../../data/restaurantData';

function Menu({itemMin, itemMax, menuHome}) {
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartUpdated, setCartUpdated] = useState(false);
  const nameRestaurant = textJson.refRestaurant;
  const showImages = textJson.showMenuImages || false; // Nouvelle propriété pour gérer l'affichage des images
  const { restaurantData, loading, error } = useRestaurantData();


  useEffect(() => {
    const fetchFoodsAndCategories = async () => {
      try {
        const { success, products, categories, error } = await fetchRestaurantData(nameRestaurant);
        if (!success) throw new Error(error);
        const filteredProducts = products.filter(product => !product.is_deleted);
        setCategories(categories);
        setFoods(filteredProducts);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchFoodsAndCategories();
  }, [nameRestaurant]);

  useEffect(() => {
    const handleResize = () => setItemsPerPage(getItemsPerPage());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) return <div className="containerGlobalInfoRestaurant">Chargement des informations...</div>;
  
  if (error) return <div className="containerGlobalInfoRestaurant">Erreur: Impossible de charger les informations</div>;

  function getItemsPerPage() {
    return window.innerWidth <= 1062 ? itemMin : itemMax;
  }

  const filterItems = (items) => {
    if (filter === 'all') return items;
    return items.filter(item => item.category_id === categories.find(cat => cat.name === filter)?.id);
  };

  const filteredItems = filterItems(foods);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, document.getElementById('menu').offsetTop);
  };

  const pageNumbers = Array.from(
    { length: Math.ceil(filteredItems.length / itemsPerPage) },
    (_, i) => i + 1
  );

  const addToLocalStorage = (food) => {
    let storedFoods = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingFoodIndex = storedFoods.findIndex(item => item.id === food.id);

    if (existingFoodIndex !== -1) {
      storedFoods[existingFoodIndex].quantity += 1;
    } else {
      storedFoods.push({ ...food, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(storedFoods));
    alert(`Ajouté au panier: ${food.name}`);
    setCartUpdated(!cartUpdated);
  };

  return (
    <div className="containerGlobalMenu" id="menu">
      <div className="lineMenu"></div>
      <h2 className="titleMenu">MENU</h2>
      
      <div className="filter">
        <select 
          id="category-filter" 
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">Tous</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <h2 className={`categoryTitle ${filter === 'all' ? 'allProducts' : ''}`}>
        {filter === 'all' ? 'Tous nos produits' : filter.charAt(0).toUpperCase() + filter.slice(1)}
      </h2>

      <div className={`menu ${showImages ? 'menu-with-images' : ''}`}>
        {filteredItems.length > 0 ? (
          currentItems.map((item) => (
            <div key={item.id} className={`menu-item ${showImages ? 'with-image' : ''}`}>
              {showImages && item.image_url && (
                <div className="item-image-container">
                  <img 
                    src={item.image_url} 
                    alt={item.name}
                    className="item-image"
                    onError={(e) => {
                      e.target.src = '/placeholder-food.jpg'; // Image par défaut si l'URL est invalide
                    }}
                  />
                </div>
              )}
              
              <div className="item-content">
                <div className="titlePriceProduct">
                  <div className="item-name">{item.name}</div>
                  <div className="item-price">{item.price.toFixed(2)} €</div>
                </div>
                
                <div className="item-description" data-full-description={item.description}>
                  {item.description}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Aucun produit à afficher.</p>
        )}
      </div>

      <div className="pagination">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={number === currentPage ? 'active' : ''}
          >
            {number}
          </button>
        ))}

      </div>
      <div className="btnplateforme">
          <a href={`https://platforms.yumco.fr/${restaurantData.id}`}>
            Commander
          </a>
        </div>
    </div>
  );
}

export default Menu;