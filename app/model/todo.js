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

    self.edit = function(item) {
        if (!item.name) {
          return self.remove(item.id);
        }

        items[item.id] = item;
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
    self.items = function() {
      console.log('items: ', items);
      return Object.keys(items).map(function(id) {
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

    // Private methods
    function generateId() {
        var keys = Object.keys(items), i = keys.length;
        return (i ? items[keys[i - 1]].id + 1 : i + 1);
    }


    function matchFilter(item, filter) {
        return !filter ||
            filter.toString() === item.id.toString() ||
            filter === (item.done ? 'completed' : 'active');
    }
};