'use strict';
import './cardList.scss'
import template from './cardList.jade'

export default class CardList {
  constructor({elem}) {
    this._link = 'http://localhost:3000/api/data';

    elem.innerHTML = 'loading...';
    
    this.getData(res=> {
      let first = res[0];
      let result = [];

      // sort
      for (let i = 0; i < res.length; i++) {
        for (let j = 0; j < res.length; j++) {
          if (res[j].to == first.from) {
            first = res[j];
          }
        }
      }

      result.push(first);
      for (let i = 0; i < res.length; i++) {
        for (let j = 0; j < res.length; j++) {

          if(result[result.length-1].to == res[j].from){
            result.push(res[j]);
          }
        }
      }

      console.log('result:', result);

      // console.log(pairs);
      elem.innerHTML = template({cards: result});
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
