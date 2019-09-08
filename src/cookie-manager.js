




/**
 *
 *
 * cookie-manager.js
 * simple, easy and lightweight cookie management library
 * 02.01.2018 - version 1.0
 * https://github.com/alperentalaslioglu/cookie-manager-js
 *
 * Copyright 2018 Alperen <alperen.talaslioglu@gmail.com>
 * Released under MIT License
 * {LICENSE URL}
 *
 *
 */


(function(window, document) {
  'use strict';

  var CookieManager = {

    /**
    *
    * Create cookie with given parameters
    * @param {String} name cookie name
    * @param {String} value cookie value
    * @param {Number} [expires] cookie expiration in days
    * @param {String} [domain] cookie domain
    * @param {String} [path] cookie path
    * @param {Boolean} [secure] cookie ssl flag
    *
    */
    set: function(name, value, expires, domain, path, secure) {

      var cookieStr = name + '=' + value;

      if(expires){
        var now = new Date();
        now.setTime(now.getTime() + expires * 24 * 60 * 60 * 1000);
        cookieStr += ';' + 'expires=' + now.toUTCString();
      }

      if(domain){
        cookieStr += ';' + 'domain=' + domain;
      }

      if(path){
        cookieStr += ';' + 'path=' + path;
      }

      if(secure){
        cookieStr += ';' + 'secure';
      }

      // Create Cookie
      document.cookie = cookieStr;
    },

    /**
    *
    * Retrieve the cookie value with given cookie name
    * @param {String} name cookie name
    *
    */
    get: function(name) {
      var cookies = document.cookie.split(';').map(function(cookie) {
        return cookie.trim();
      })

      for(var i = 0; i < cookies.length; i++){
        var cookie = cookies[i].split('=');
        var key = cookie[0];
        var value = cookie[1];

        if(key === name){
          return value;
        }
      }

      return undefined;
    },

    /**
    *
    * Update cookie with given parameters
    * @param {String} name cookie name
    * @param {String} value cookie value
    * @param {Number} [expires] cookie expiration in days
    * @param {String} [domain] cookie domain
    * @param {String} [path] cookie path
    * @param {Boolean} [secure] cookie ssl flag
    *
    */
    update: function(name, value, expires, domain, path, secure) {
      this.set(name, value, expires, domain, path, secure);
    },

    /**
    *
    * Remove the cookie with given cookie name
    * @param {String} name cookie name
    *
    */
    remove: function(name) {
      this.set(name, '', -1);
    },

    /**
    *
    * Retrieve all cookies
    *
    */
    getAll: function() {
      var cookies = document.cookie.split(';').map(function(cookie) {
        return cookie.trim();
      })

      var cookiesList = [];

      for(var i = 0; i < cookies.length; i++){
        var cookie = cookies[i].split('=');
        var key = cookie[0];
        var value = cookie[1];
        cookiesList.push({key: key, value: value});
      }

      return cookiesList;
    },

    /**
    *
    * Clear all cookies
    *
    */
    clear: function() {
      var cookies = document.cookie.split(';').map(function(cookie) {
        return cookie.trim();
      })

      for(var i = 0; i < cookies.length; i++){
        var cookie = cookies[i].split('=');
        var key = cookie[0];
        var value = cookie[1];
        this.remove(key);
      }
    }

  };

  // AMD support
  if (typeof define === 'function' && define.amd) {
      define(function () {
        return CookieManager;
      });
  // CommonJS and Node.js module support.
  } else if (typeof exports !== 'undefined') {
      // Support Node.js specific `module.exports` (which can be a function)
      if (typeof module !== 'undefined' && module.exports) {
          exports = module.exports = CookieManager;
      }
      // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
      exports.CookieManager = CookieManager;
  } else {
      window.CookieManager = CookieManager;
  }


})(window, document);
