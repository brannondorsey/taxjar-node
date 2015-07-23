'use strict';

var Request = require('./util/request');

function Taxjar(key) {
  if (!(this instanceof Taxjar)) {
    return new Taxjar(key);
  }

  this._api = {
    host: 'https://api.taxjar.com'
  }

  if (key) {
    this.setApiConfig('key', key);
    this.request = new Request(this);
  } else {
    throw new Error('Please provide a TaxJar API key');
  }
}

Taxjar.prototype = {

  getApiConfig: function(index) {
    return this._api[index];
  },

  setApiConfig: function(index, value) {
    this._api[index] = value;
  },

  categories: function() {
    return this.request.api({
      method: 'get',
      url: '/v2/categories'
    });
  },

  ratesForLocation: function(zip, params) {
    return this.request.api({
      method: 'get',
      url: '/v2/rates/' + zip,
      data: params
    });
  },

  taxForOrder: function(params) {
    return this.request.api({
      method: 'post',
      url: '/v2/taxes',
      data: params
    });
  },

  listOrders: function(params) {
    return this.request.api({
      method: 'get',
      url: '/v2/transactions/orders',
      data: params
    });
  },

  showOrder: function(transactionId) {
    return this.request.api({
      method: 'get',
      url: '/v2/transactions/orders/' + transactionId
    });
  },

  createOrder: function(params) {
    return this.request.api({
      method: 'post',
      headers: { 'content-type': 'application/json' },
      url: '/v2/transactions/orders',
      data: JSON.stringify(params)
    });
  },

  updateOrder: function(params) {
    return this.request.api({
      method: 'put',
      headers: { 'content-type': 'application/json' },
      url: '/v2/transactions/orders/' + params.transaction_id,
      data: JSON.stringify(params)
    });
  },

  deleteOrder: function(transactionId) {
    return this.request.api({
      method: 'del',
      url: '/v2/transactions/orders/' + transactionId
    });
  },

  listRefunds: function(params) {
    return this.request.api({
      method: 'get',
      url: '/v2/transactions/refunds',
      data: params
    });
  },

  showRefund: function(transactionId) {
    return this.request.api({
      method: 'get',
      url: '/v2/transactions/refunds/' + transactionId
    });
  },

  createRefund: function(params) {
    return this.request.api({
      method: 'post',
      headers: { 'content-type': 'application/json' },
      url: '/v2/transactions/refunds',
      data: JSON.stringify(params)
    });
  },

  updateRefund: function(params) {
    return this.request.api({
      method: 'put',
      headers: { 'content-type': 'application/json' },
      url: '/v2/transactions/refunds/' + params.transaction_id,
      data: JSON.stringify(params)
    });
  },

  deleteRefund: function(transactionId) {
    return this.request.api({
      method: 'del',
      url: '/v2/transactions/refunds/' + transactionId
    });
  }
};

module.exports = Taxjar;