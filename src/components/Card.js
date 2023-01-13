import React from 'react';
import './Card.css';
function Card ({ repo })  {
    const { owner, name, description, language } = repo;
    return (
      <div className="card">
       <article>
       
          <img className='image'  src={owner.avatar_url} alt={name} />
        
        <div className="user-info">
          <h3>{name}</h3>
          <small>{description}</small>
          <small>Language : {language}</small>
        </div>
        </article>
      </div>
    );
  };

export default Card