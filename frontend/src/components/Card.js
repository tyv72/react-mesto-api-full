import React from 'react';
import CurrentUserContext from './../contexts/CurrentUserContext';

function Card(props) {
  const card = props.card;
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__trash darkling-button ${isOwn ? '' : 'card__trash_invisible'}`
  ); 
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `card__like-button darkling-button ${isLiked ? 'card__like-button_liked' : ''}`
  ); 

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleCardDelete() {
    props.onCardDelete(props.card);
  }

  return (
    <figure className="card">
      <img className="card__image" src={card.link} alt={card.name} onClick={handleClick}/>  
      <button className={cardDeleteButtonClassName} onClick={handleCardDelete}></button>
      <figcaption className="card__caption">
        <p className="card__description">{card.name}</p> 
        <div className="card__likes">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="card__likes-count">{card.likes.length}</p>
        </div>           
      </figcaption>        
    </figure>
  );
}

export default Card;