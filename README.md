![npm](https://img.shields.io/npm/v/set-resizable) ![npm bundle size](https://img.shields.io/bundlephobia/min/set-resizable)


# Set Resizable

A small JS library to convert any HTML element into a resizable element.

## Features

* Vanilla JS
* Support images
* Support Shift key to keep ratio
* Support touch events

## Demos

[Live demo](https://nievaignacio.github.io/set-resizable/examples/)

<a href="https://stackblitz.com/edit/vitejs-vite-zkjgpr?file=main.js">
  <img
    width="160"
    alt="Open in StackBlitz"
    src="https://developer.stackblitz.com/img/open_in_stackblitz.svg"
  />
</a>

## Install

**NPM**

```
$ npm install set-resizable --save
```

**CDN**

```
https://cdn.jsdelivr.net/npm/set-resizable/dist/set-resizable.min.js
```

or just download the dist file: [set-resizable.min.js](https://github.com/nievaignacio/resizable/tree/main/dist)

## Usage

**ES6:**

```js
import Resizable from 'set-resizable';

var element = document.querySelector('#element');

var options = {
	active: true
}

var resizable = new Resizable(element, options);
```

**Script tag:**

```html
<!DOCTYPE html>
<html>
  ...
  <script src="https://cdn.jsdelivr.net/npm/set-resizable/dist/set-resizable.min.js"></script>
  <script>
        var element = document.querySelector('#element');
      
        var options = {
            active: true
        }
        
        var resizable = new Resizable(element, options);
  </script>
</html>
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

## Public methods

| Name     | Parameters     | Description                          |
| -------- | -------------- | ------------------------------------ |
| activate | void           | Enable resizing                      |
| deactivate | void           | Disable all instances of Resizable |
| resize   | (width,height) | Apply resizing with input parameters |


## Callbacks

| Name     | Description                                             |
| -------- | ------------------------------------------------------- |
| onactivate | Returns the activated instance |
| onresize | Returns an object with the new width and new height upon completion of the resize. |

#### Example

```javascript
var resizable  = new Resizable(document.querySelector('#image'));

console.log(resizable);

resizable.activate();

resizable.resize(200,200);

resizable.onresize = function(data) {
	console.log("onresize", data);
}
           
```

