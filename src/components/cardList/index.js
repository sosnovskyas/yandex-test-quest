'use strict';
import './cardList.scss'
import template from './cardList.jade'

export default class CardList {
  constructor({elem}) {
    this._link = 'http://localhost:3000/api/data';

    elem.innerHTML = 'loading...';
    
    this.getData(res=> {
      elem.innerHTML = template({cards: res});
    })
  }

  getData(callback) {
    if (typeof callback != 'function') {
      throw new Error('need callback');
    }

    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${this._link}`, true);
    xhr.send();

    xhr.onreadystatechange = () => {
      if (xhr.readyState != 4) return;
      if (xhr.status != 200) {
        this._errorHandler(xhr.response, 'get error', callback);
      } else {
        callback(JSON.parse(xhr.responseText));
      }
    }
  }

  _errorHandler(response, message, callback) {
    callback(JSON.parse(response));
    console.warn('cardList: ', JSON.parse(response).errors);
    throw new Error('cardList: ' + message);
  }
}
