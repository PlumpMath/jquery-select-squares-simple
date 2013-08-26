
var menu = new SelectSquares({
  data: [
    {key: 'a', value: 'Mon'},
    {key: 'b', value: 'Tue'},
    {key: 'c', value: 'Wed'}
  ],
  select: ['a', 'b']
});

$('.control .one').click(function() {
  menu.trigger('select', ['a', 'c']);
});

$('.control .two').click(function() {
  menu.trigger('select', ['b']);
});

$('.area').append(menu.el);

menu.on('select', function(profile) {
  console.log(profile)
});

