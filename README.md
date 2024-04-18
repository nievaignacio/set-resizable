# Resizable

Advanced resize for images and HTML elements.

* Supports any display that accepts width and height.
* Keep ratio with Shift key.

## Demo

Link

## Usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resizable</title>
    
    <link rel="stylesheet" href="resizable.css">
    
</head>
<body>
    
    <img id="element" src="img/64743063.jpg" width="300" height="227"> 
    
    <script src="resizable.js"></script>
    
    <script>
        resizable(document.querySelector('#element'),{active:true});
    </script>
    
</body>
</html>
```

## Options


| Parameter | Default | Description                                         |
| :---------- | --------- | ----------------------------------------------------- |
| active | false | Auto enable resizing. |
| color      | "blue"  | CSS color value for accent.                         |
| info | true | Boolean visibility of width and height data values. |
| minSize    | "40px"  | Minimun value for width and height resize.          |
| selectMode | "click" | Event to listen for enable resizing.                |

