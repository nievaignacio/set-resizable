# Resizable

A small JS library to convert any HTML element into a resizable element.

## Features

* Vanilla JS
* Support images
* Support Shift key to keep ratio

## Demo

Live demo

## Instalation

```
$ npm install resizable --save
```

Or just download the dist file:

[resizable.min.js](https://github.com/nievaignacio/resizable/tree/main/dist)

## Quick Start

### Include:

- **ES6 module import**:

  ```js
  import resizable from 'resizable';
  // ...
   resizable(element, options);
  ```

- **CommonJS module require**:

  ```js
  const resizable = require('resizable');
  // ...
   resizable(element, options);
  ```

- **AMD module require**:

  ```js
  require(['resizable'], function (resizable) {
    // ...
   resizable(element, options);
  });
  ```

- **script tag**:

  ```html
  <!DOCTYPE html>
  <html>
    ...
    <script src="resizable.js"></script>
    <script>
      // ...
     	 resizable(element, options);
    </script>
  </html>
  ```

### Initialize

```
var element = document.querySelector('#element');

Var options = {
	active: true
}

resizable(element, options);
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

