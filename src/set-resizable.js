// for webpack

import "./set-resizable.css";
export default function setResizable(element, options = {}) {

// for browser    
// function resizable(element, options = {}) {

    if(!(element instanceof HTMLElement)) return console.error('Element not provided');

    var active = options.active;
    var activeEvent = options.activeEvent || "click";
    var info = options.info != null? options.info : true;
    var color = options.color || "Blue";
    var minSize = options.minSize || "40px";
    var overflow = options.overflow || "auto";
    var nodes = options.nodes != null? options.nodes : true;

    var display = window.getComputedStyle(element, null).display;
    if(display == "inline") display = "inline-block";    

    var position = element.style.position;

    var frame = document.createElement('div');
    frame.classList.add("resizable"); // add class styles

    element.addEventListener(activeEvent, function () {

        document.querySelector(':root').style.setProperty('--resizable-color', color);
        document.querySelector(':root').style.setProperty('--resizable-display', display);
        document.querySelector(':root').style.setProperty('--resizable-min-size', minSize);

        if(info) info = `<span class='info'> ${element.offsetWidth} &#215;  ${element.offsetHeight} px</span>`;

        element.replaceWith(frame);

        frame.innerHTML = `
            <table class='control ${nodes?"nodes":""}'>
                <tr>
                    <td class="n w"></td>
                    <td class="n"></td>
                    <td class="n e"></td>
                </tr>
                <tr>
                    <td class="w"></td>
                    <td class="c">${info}</td>
                    <td class="e"></td>
                </tr>
                <tr>
                    <td class="s w"></td>
                    <td class="s"></td>
                    <td class="s e"></td>
                </tr>
            </table>
        `;

        frame.prepend(element);
        
        frame.style.width = element.offsetWidth + "px";
        frame.style.height = element.offsetHeight + "px";

    });

    if(active) {
        element.dispatchEvent(new Event(activeEvent));
        active = false;
    }

    var selected, shift = false;
    var x, y, w, h, r = 0;


    function startResize(className, clientX, clientY){
        x = clientX;
        y = clientY;
        w = frame.offsetWidth;
        h = frame.offsetHeight;
        r = w / h;
        selected = className;
        if(display=="table") element.style.position = "absolute";
    }

    function onResize(clientX, clientY){
        if (selected) {

            if(nodes)frame.querySelector('.control').classList.remove('nodes');
           
            if (selected.indexOf("e")>-1) {
                frame.style.width = (w + clientX - x) + "px";
                if (shift) frame.style.height = (frame.offsetWidth / r) + "px";
            }
            if (selected.indexOf("s")>-1) {
                frame.style.height = (h + clientY - y) + "px";
                if (shift) frame.style.width = (frame.offsetHeight * r) + "px";
            }
            if (selected.indexOf("n")>-1) {
                frame.style.height = (h - clientY + y) + "px";
                frame.querySelector('.control').style.top = (clientY - y) + "px";
                if (shift) {
                    frame.style.width = (frame.offsetHeight * r) + "px";
                    frame.querySelector('.control').style.left = (clientY - y) * r + "px";
                }
            }
            if (selected.indexOf("w")>-1) {
                frame.style.width = (w - clientX + x) + "px";
                frame.querySelector('.control').style.left = (clientX - x) + "px";
                if (shift) {
                    frame.style.height = (frame.offsetWidth / r) + "px";
                    frame.querySelector('.control').style.top = (clientX - x) / r + "px";
                }
            }

            if(info){
                info = `<span class='info'> ${frame.offsetWidth} &#215;  ${frame.offsetHeight} px</span>`;
                frame.querySelector('.control .c').innerHTML = info;
            } 
            
        }
    }

    function endResize(event){
        if (selected) {
            selected = false;
            if(nodes) frame.querySelector('.control').classList.add('nodes');
            frame.querySelector('.control').style.top = 0 + "px";
            frame.querySelector('.control').style.left = 0 + "px";
            element.style.boxSizing = 'border-box';
            element.style.overflow = overflow;
            element.style.width = frame.offsetWidth + "px";
            element.style.height = frame.offsetHeight + "px";
            element.style.position = position;
        }
    }



    document.addEventListener('keydown', function (event) {
        if (event.shiftKey) {
            shift = true;
        }
    });

    document.addEventListener('keyup', function (event) {
        if (event.key == "Shift") {
            shift = false;
        }
    });

    frame.onmousedown = function (event) {
        startResize(event.target.className, event.clientX, event.clientY);
    }

    document.addEventListener('mousemove', function (event) {
        event.preventDefault();
        onResize(event.clientX, event.clientY);
    });

    document.addEventListener('mouseup', function (event) {
        endResize(event);
    });

    frame.ontouchstart = function (event) {
        startResize(event.targetTouches[0].target.className, event.touches[0].clientX, event.touches[0].clientY);
    }

    document.addEventListener('touchmove', function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
        onResize(event.touches[0].clientX, event.touches[0].clientY);
    }, { passive: false });

    document.addEventListener('touchend', function (event) {
        endResize(event);
    });

    document.addEventListener('click', function (event) {
        if (!frame.contains(event.target)) {
            frame.replaceWith(element);
        }
    });

}

