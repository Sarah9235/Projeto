import React from 'react';
import bannerImage from '../assets/parceria.png'; // Substitua pelo caminho correto

const Parceria = () => {
  const handleClick = () => {
    // Adicione o caminho do link aqui
    window.location.href = 'https://www.exemplo.com';
  };

  return (
    <div style={{ width: '100%', height: '400px', overflow: 'hidden' }}>
      <a 
        href="https://www.exemplo.com" // Substitua pelo caminho correto
        onClick={handleClick} // Opcional: se você precisar de lógica adicional no clique
        style={{ display: 'block', height: '100%' }}
      >
        <img 
          src={bannerImage} 
          alt="Banner" 
          style={{ width: '100%', height: 'auto', display: 'block' }} 
        />
      </a>
    </div>
  );
};

export default Parceria;
