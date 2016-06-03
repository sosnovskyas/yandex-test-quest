'use strict';
import './styles.scss'
// import Form from './components/form'
import CardsList from './components/cardList'

const cardsList = new CardsList({
  elem: document.querySelector('.result')
});
