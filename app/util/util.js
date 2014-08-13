var util = (function(){
  var funs = {};
  
  funs.getUniqueId = function() {
    var i = 0;

    return function() {
      return i++;
    };
  }();
  return funs;
})();