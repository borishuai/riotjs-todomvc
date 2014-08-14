'use strict';

function Todo() {
  var self = riot.observable(this);
  var items = {};
        
  self.add = function(name) {
    var id = util.getUniqueId();
    var item = {
      id: id,
      name: name,
      completed: false
    };
    items[id] = item;
    storage.setItem(id, item);
    self.trigger('add', item);
  };

    self.edit = function(id, name) {
        var item = items[id];
        item.name = name;
        self.trigger('edit', item);
    };

    self.remove = function(id) {
        delete items[id];

        self.trigger('remove', id);
    };

    self.toggle = function(id) {
      items[id].completed = !items[id].completed;
      self.trigger('toggle', id);
    };

    self.toggleAll = function(status) {
      self.items().forEach(function(item) {
        item.completed = status;
      });

      self.trigger('toggleAll', status);
    };

    // @param filter: <empty>, id, 'active', 'completed'
    self.items = function(filterState) {
      return Object.keys(items).filter(function(id) {
        return matchFilter(items[id], filterState);
      }).map(function(id) {
        return items[id];
      });
    };

    self.isDone = function(){
        return self.items('active').length == 0;
    };

    // sync database
    self.on('add remove toggle edit', function() {
        //storage.put(items);
    });

    function matchFilter(item, filter) {console.log('item: ', item);
      return !filter || filter === 'all' || (filter === 'active' && !item.completed) || (filter === 'completed' && item.completed);
    }
};