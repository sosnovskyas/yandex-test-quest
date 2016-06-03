'use strict';

import './form.scss'
import template from './form.jade'

export default class Form {
  constructor({
    elem,
    dataId,
    name
  }) {
    elem.innerHTML = template({dataId: dataId, name:name});
  }
};
