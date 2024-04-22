# Resizable

Make any HTML element resizable.

* Supports Images.
* Supports any display property value that accepts width and height.
* Supoorts Shift key for keep ratio.

## Instalation

```
$ npm install resizable --save
```

## Quick Start

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
      // Global function
     	 resizable(element, options);
    </script>
  </html>
  ```

## Demo

Live Demo

## Options


| Parameter   | Default | Description                                         |
| :---------- | ------- | --------------------------------------------------- |
| active      | false   | Auto enable resizing.                               |
| activeEvent | "click" | Event to listen for enable resizing.                |
| color       | "blue"  | set CSS color property for accent element.                     |
| info        | true    | Visibility of width and height data values.         |
| minSize     | "40px"  | Minimun value for width and height resize.          |
| overflow     | "auto"  | Set CSS overflow property for element.       |


