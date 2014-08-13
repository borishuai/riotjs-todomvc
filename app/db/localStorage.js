var storage = function(){
  return {
    setItem: function(id, item) {
      localStorage.setItem(id, JSON.stringify(item));
    },
    getItem: function(id) {
      return JSON.parse(localStorage.getItem(id));
    }
  };
}();