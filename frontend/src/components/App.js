import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import NavBar from './NavBar';
import InfoToolTip from './InfoToolTip';
import api from './../utils/api';
import * as auth from './../utils/auth';

import CurrentUserContext from './../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState();
  const [deletedCard, setDeletedCard] = React.useState();
  const [currentUser, setCurrentUser] = React.useState({name:'', avatar:'', about:''});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isRegisterError, setIsRegisterError] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const history = useHistory();
  
  React.useEffect(() => {
    handleTokenCheck();  
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn, history]);

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt){      
      auth.checkToken(jwt)
        .then((res) => {
          if (res){
            setLoggedIn(true); 
            setEmail(res.data.email); 
            fillState();        
          }
        })
        .catch((err) => console.log(err)); 
    }
  }

  function fillState() {
    Promise.all([api.getUserInfo(), api.getAllCards()])
      .then(([userData, cardsData]) => {
        setCards(cardsData); 
        setCurrentUser(userData);                     
      })
      .catch((err) => console.log(err));
  }

  function handleRegister(data) {
    const {password, email} = data;
    return auth.register(password, email)
      .then((res) => {      
        if(!res || res.statusCode === 400){
          throw new Error('Ошибка при регистрации');
        }
        setIsRegisterError(false);
        setIsInfoToolTipOpen(true);      
      })
      .catch((err) => {
        setIsRegisterError(true);
        setIsInfoToolTipOpen(true);   
        console.log(err);
      });
  }

  function handleLogin (data){
    const {password, email} = data;
    return auth.authorize(password, email)
      .then((res) => {
        if(!res || res.statusCode === 400){
          throw new Error('Ошибка при авторизации');
        } 
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          setEmail(email);
          fillState();                
        }
      })
      .catch((err) => console.log(err));
  }

  function handleLogout (){
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);    
  }

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick (card) {
    setSelectedCard(card);
  }

  function handleConfirmation (card) {
    setDeletedCard(card);
    setIsConfirmationPopupOpen(true);
  }

  const handleCloseInfoToolTip = () => {
    if (!isRegisterError) {
      history.push('/login');      
    }
    setIsInfoToolTipOpen(false);
  }

  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard();
    setDeletedCard();
  }

  function handleUpdateUser (data) {
    const token = localStorage.getItem('jwt');
    api
      .updateUserInfo(data, token)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar (data) {
    const token = localStorage.getItem('jwt');
    api
      .updateUserAvatar(data, token) 
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlace (data) {
    const token = localStorage.getItem('jwt');
    api
      .addCard(data, token) 
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      const token = localStorage.getItem('jwt');
      
      api.changeLikeCardStatus(card._id, !isLiked, token)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  } 

  function handleCardDelete(card) {
    // TODO Отфильтровать массив карточек и убрать ту, что удалили
    const token = localStorage.getItem('jwt');
    api.deleteCard(card._id, token).then(() => {
      return api.getAllCards(token);
    })
    .then((cards) => {
      setCards(cards);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }
  
  return (
    <div className="page">      
      <CurrentUserContext.Provider value={currentUser}> 
        <Header>
          <NavBar handleLogout={handleLogout} loggedIn={loggedIn} email={email} /> 
        </Header>         
        <Switch>        
          <Route path="/login">            
            <Login handleLogin={handleLogin} handleTokenCheck={handleTokenCheck}/>          
          </Route>

          <Route path="/register">            
            <Register onRegister={handleRegister}/>  
            <InfoToolTip isOpen={isInfoToolTipOpen} isError={isRegisterError} onClose={handleCloseInfoToolTip}/>          
          </Route>

          <ProtectedRoute path="/" loggedIn={loggedIn}>                      
            <Main 
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick} 
              onEditAvatar={handleEditAvatarClick} 
              onCardClick={handleCardClick} 
              cards={cards} 
              onCardLike={handleCardLike} 
              onCardDelete={handleConfirmation}
            />  
            <Footer />

            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>        
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>     
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/>
            <ConfirmationPopup card={deletedCard} isOpen={isConfirmationPopupOpen} onClose={closeAllPopups} onConfirm={handleCardDelete}/>
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>                    
          </ProtectedRoute>      
        </Switch>      
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
