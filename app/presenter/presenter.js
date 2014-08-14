'use strict';

$(function() {
  var todo = new Todo(),
      $root = $('#todoapp'),
      filterState = null,
      $todoList = $root.find('#todo-list'),
      template = $("#task-template").html(),
      footerTemplate = $("#footer-template").html();

  $root.on('keypress', '#new-todo', function(event) {
    var value = $(this).val();
    if ((event.which == 13) && value) {
      todo.add(value);
      this.value = '';
    }
  }).on('click', '#toggle-all', function() {
    todo.toggleAll($(this).prop('checked'));
  }).on('click', '.toggle', function() {
    var id = $(this).closest('li').data('task');
    todo.toggle(id);
  }).on('click', '.destroy', function() {
    var id = $(this).closest('li').data('task');
    todo.remove(id);
  }).on('dblclick', '.todo-task label', function() {
    $(this).focus().closest('li').addClass('editing');
  }).on('blur', '.edit', function() {console.log(3);
    var id = $(this).closest('li').data('task');
    todo.edit(id, $(this).val());
    $(this).closest('li').removeClass('editing');
  })

  riot.route(function(hash) {
    filterState = hash.slice(2);
    todo.trigger('load', filterState);
  });

  todo.on('add remove edit load', reload);
  todo.on('add remove toggle load toggleAll', counts);
  todo.on('toggleAll', toggleAll);
  todo.on('toggle', toggle);

  function load(filter) {
    filterState = filter;
  }

  function toggle(id) {
    $todoList.find('#task_' + id).toggleClass('completed');
    var listLength = $todoList.find('li').length;
    if ($todoList.find('input:checked').length === listLength) {
      $root.find('#toggle-all').prop('checked', true);
    } else {
      $root.find('#toggle-all').prop('checked', false);
    }
  }

  function toggleAll(status) {
    if (status) {
      $todoList.find('li').addClass('completed');
    } else {
      $todoList.find('li').removeClass('completed');
    }

    $todoList.find('input[type=checkbox]').prop('checked', status);
    
  }

  function reload() {
    var items = todo.items(filterState), task;
    $todoList.empty();

    items.forEach(function(item) {
      var task = riot.render(template, item);
      $todoList.append(task);
    });
    
    
  }

  function counts() {
    var items = todo.items(),
        footer, footerParam;
    if (items.length > 0) {
      footerParam = {
        items: items.length,
        completed: items.length
      };

      footer = riot.render(footerTemplate, footerParam);
      $('#footer').html(footer);
    }
  }
});