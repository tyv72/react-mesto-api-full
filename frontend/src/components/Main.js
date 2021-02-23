import React from 'react';
import Card from './Card.js';
import CurrentUserContext from './../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  
  return (
    <main className="content main-size">
      <section className="profile">
        <div className="profile__avatar" onClick={props.onEditAvatar}>
          <img alt="Аватар пользователя" className="avatar" src={currentUser.avatar} />
        </div>                      
        <div className="profile__info">
          <div className="profile__content">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button darkling-button" onClick={props.onEditProfile}></button>
          </div>                            
          <h2 className="profile__about">{currentUser.about}</h2>                          
        </div>                      
        <button className="profile__add-button darkling-button" onClick={props.onAddPlace}></button>                  
      </section>

      <section className="card-gallery">   
        {props.cards.map((card, i) => (
          <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
        ))}                     
      </section>
    </main>
  );
}

export default Main;