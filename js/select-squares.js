
(function () {
  var SelectSquares = function (options) {
    this.profiles = options.data;
    this.select = options.select;
    this.eventsInside = {
      select: []
    };
    this.eventsOutside = {
      select: []
    };
    this.init();
  };
  
  var fn = SelectSquares.prototype;
  
  // four methods on events
  
  fn.emit = function(eventName, data) {
    var self = this;
    if (this.eventsOutside[eventName] != null) {
      $.each(this.eventsOutside[eventName], function(index, callback) {
        callback.call(self, data);
      });
    };
  };
  
  fn.on = function(eventName, callback) {
    if (eventName != null && (typeof callback) == 'function') {
      if (! (callback in this.eventsOutside[eventName])) {
        this.eventsOutside[eventName].push(callback);
      }
    }
  };
  
  fn.trigger = function(eventName, data) {
    var self = this;
    if (this.eventsInside[eventName] != null) {
      $.each(this.eventsInside[eventName], function(index, callback) {
        callback.call(self, data);
      });
    };
  };
  
  fn.bind = function(eventName, callback) {
    if (eventName != null && (typeof callback) == 'function') {
      if (! (callback in this.eventsInside[eventName])) {
        this.eventsInside[eventName].push(callback);
      }
    }
  };
  
  // methods for rendering HTML

  fn.template = function() {
    this.el = $('<div>').addClass('select-squares');
    var html = $.map(this.profiles, function(item) {
      var square = '<div class="select-item" '
        + 'data-key="' + item.key + '">'
        + item.value + '</div>';
      return square;
    }).join('');
    this.el.html(html);
  };
  
  // methods for dealing with data
  
  fn.checkData = function() {
    if (!this.profiles.length) throw new Error('no data given');
    if (this.select.length == null) throw new Error('wrong selection');
  };
  
  // bootstrap this object

  fn.init = function() {
    this.checkData();
    this.template();
    this.markSelected();
    this.bindEvents();
  };
  
  fn.markSelected = function() {
    var self = this;
    $.each(this.profiles, function(i, item) {
      var query = 'div[data-key="' + item.key +'"]';
      if (self.has(self.select, item.key)) {
        $(self.el).find(query).addClass('item-selected');
      } else {
        $(self.el).find(query).removeClass('item-selected');
      }
    });
  };
  
  fn.bindEvents = function() {
    this.bindClick();
    this.bind('select', this.onSelect.bind(this));
  };
  
  // events handlers

  fn.onSelect = function(selection) {
    this.select = selection;
    this.markSelected();
  };
  
  fn.bindClick = function() {
    var self = this;
    $(this.el).on('click', '.select-item', function(event) {
      var item = $(event.target);
      var key = item.attr('data-key');
      if (self.has(self.select, key)) {
        self.select = self.minus(self.select, key);
        item.removeClass('item-selected');
      } else {
        self.select.push(key);
        item.addClass('item-selected');
      }
      self.markSelected();
      self.emit('select', self.select);
    });
  };
  
  // utils
  
  fn.minus = function(list, x) {
    var ret = [];
    $.map(list, function(item) {
      if (x != item) ret.push(item);
    });
    return ret;
  };
  
  fn.has = function(list, x) {
    var ret = false;
    $.map(list, function(item) {
      if (item == x) ret  = true;
    });
    return ret;
  };

  window.SelectSquares = SelectSquares;
})();