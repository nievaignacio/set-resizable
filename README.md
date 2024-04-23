# setResizable

A small JS library to convert any HTML element into a resizable element.

## Features

* Vanilla JS
* Support images
* Support Shift key to keep ratio

## Demo

Live demo

## Instalation

```
$ npm install set-resizable --save
```

Or just download the dist file:

[set-resizable.min.js](https://github.com/nievaignacio/resizable/tree/main/dist)

## Quick Start

### Include:

- **ES6 module import**:

  ```js
  import setResizable from 'set-resizable';
  // ...
   setResizable(element, options);
  ```

- **CommonJS module require**:

  ```js
  const setResizable = require('set-resizable');
  // ...
   setResizable(element, options);
  ```

- **AMD module require**:

  ```js
  require(['setResizable'], function (set-resizable) {
    // ...
   setResizable(element, options);
  });
  ```

- **script tag**:

  ```html
  <!DOCTYPE html>
  <html>
    ...
    <script src="set-resizable.min.js"></script>
    <script>
      // ...
     	 setResizable(element, options);
    </script>
  </html>
  ```

### Initialize

```
var element = document.querySelector('#element');

var options = {
	active: true
}

setResizable(element, options);
```

## Options


| Parameter   | Default | Description                                         |
| :---------- | ------- | --------------------------------------------------- |
| active      | false   | Auto enable resizing.                               |
| activeEvent | "click" | Event to listen for enable resizing.                |
| color       | "blue"  | Set CSS color property for accent element.                     |
| info        | true    | Visibility of width and height data values.         |
| minSize     | "40px"  | Minimun value for width and height resize.          |
| overflow     | "auto"  | Set CSS overflow property for element.       |

