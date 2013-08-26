
jQuery Multi-select menu in squares
------

a dead simple multi-select in squares

[Demo](http://s.jiyinyiyong.info/jquery-select-squares-simple/index.html)

### Installation

```
bower install --save jquery-select-squares-simple
```

### Usage

Create a select manu:

```coffee
menu = new SelectSquares
  data:
    a:
      key: 'a'
      value: 'A'
    b:
      key: 'b'
      value: 'B'
  select:
    ['a', 'b']

menu.trigger 'select', ['a']
menu.on 'select', (profile) ->
 console.log profile
```

### License

MIT