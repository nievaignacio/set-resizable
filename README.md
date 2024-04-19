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

### Include

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

## Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resizable</title>
</head>
<body>
    
    <img id="element" src="img/64743063.jpg" width="300" height="227"> 
    
    <script src="resizable.min.js"></script>
    
    <script>
        resizable(document.querySelector('#element'),{active:true});
    </script>
    
</body>
</html>
```

Live Demo

## Options


| Parameter   | Default | Description                                         |
| :---------- | ------- | --------------------------------------------------- |
| active      | false   | Auto enable resizing.                               |
| activeEvent | "click" | Event to listen for enable resizing.                |
| color       | "blue"  | CSS color value for accent.                         |
| info        | true    | Boolean visibility of width and height data values. |
| minSize     | "40px"  | Minimun value for width and height resize.          |



