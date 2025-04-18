import React from 'react';
import './LegalNotices.css'; // N'oublie pas d'importer le CSS


const LegalNotices = () => {
  return (
    <div className="mentions-container">
      <h1 className="mentions-title">Mentions légales</h1>

      <section className="mentions-section">
        <h2>Éditeur du site</h2>
        <p>
          Ce site est édité par <strong>YumCo</strong>, dont le siège social est situé au <strong>Paris</strong>.
        </p>
      </section>

      <section className="mentions-section">
        <h2>Contact</h2>
        <p>
          Email : <a href="mailto:contact@votreentreprise.com">contact@yumco.fr</a><br />
        </p>
      </section>

      <section className="mentions-section">
        <h2>Hébergeur</h2>
        <p>
          Le site est hébergé par <strong>HOSTINGER INTERNATIONAL LTD</strong>, situé au <strong>61 Lordou Vironos Street, 6023 Larnaca, Chypre​</strong>.
        </p>
      </section>

      <section className="mentions-section">
        <h2>Données personnelles</h2>
        <p>
          Les données collectées sur ce site sont utilisées uniquement dans le cadre légal prévu en France pour le respect de la vie privée. Aucune information personnelle n'est cédée à des tiers.
        </p>
      </section>

      <section className="mentions-section">
        <h2>Sécurité des données</h2>
        <p>
          Nous prenons la sécurité de vos données très au sérieux et mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos informations personnelles contre tout accès non autorisé.
        </p>
      </section>

      <section className="mentions-section">
        <h2>Vos droits</h2>
        <p>
          Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité des données vous concernant. Vous pouvez exercer ces droits par email à l'adresse ci-dessus.
        </p>
      </section>

      <button className="home-button" onClick={() => window.location.href = '/'}>
        Retour à l'accueil
      </button>
    </div>
  );
};

export default LegalNotices;
