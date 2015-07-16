import Qajax from 'qajax'

const baseUrl = "http://berezovskiy.fr";
//const baseUrl = "http://localhost:9000";

export default {
  save: function (bookmark) {
    return Qajax({
      url: baseUrl + '/bookmarks',
      method: 'POST',
      data: bookmark
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  },

  getTags: function () {
    return Qajax({
      url: baseUrl + '/bookmarks/tags',
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  },

  getCategories: function () {
    return Qajax({
      url: baseUrl + '/categories',
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  },

  isConnected: function () {
    return Qajax({
      url: baseUrl + '/users/connected',
      method: 'GET'
    })
    .then(Qajax.filterSuccess);
  },

  isExist: function (url) {
    return Qajax({
      url: baseUrl + '/bookmarks/exist',
      method: 'GET',
      params: {
        url: url
      }
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  },
};
