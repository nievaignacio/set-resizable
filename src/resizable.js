// for webpack

import "./resizable.css";
export default function resizable(element, options = {}) {

// for browser    
// function resizable(element, options = {}) {

    var active = options.active;
    var activeEvent = options.activeEvent || "click";
    var info = options.info != null? options.info : true;
    var color = options.color || "Blue";
    var minSize = options.minSize || "40px";
    var overflow = options.overflow || "auto";

    var display = window.getComputedStyle(element, null).display;
    if(display == "inline") display = "inline-block";    

    var frame = document.createElement('div');
    frame.classList.add("resizable"); // add class styles

    element.addEventListener(activeEvent, function () {

        document.querySelector(':root').style.setProperty('--resizable-color', color);
        document.querySelector(':root').style.setProperty('--resizable-display', display);
        document.querySelector(':root').style.setProperty('--resizable-min-size', minSize);

        if(info) info = `<span class='info'> ${element.offsetWidth} &#215;  ${element.offsetHeight} px</span>`;

        element.replaceWith(frame);

        frame.innerHTML = `
            <table>
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


    frame.onmousedown = function (event) {
        event.preventDefault();
        //event.stopPropagation();
        //   console.log(event);
        x = event.clientX;
        y = event.clientY;
        w = frame.offsetWidth;
        h = frame.offsetHeight;
        r = w / h;
        selected = event.target.className;
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

    document.addEventListener('mousemove', function (event) {
        event.preventDefault();

        if (selected) {
           
            if (selected.indexOf("e")>-1) {
                frame.style.width = (w + event.clientX - x) + "px";
                if (shift) frame.style.height = (frame.offsetWidth / r) + "px";
            }
            if (selected.indexOf("s")>-1) {
                frame.style.height = (h + event.clientY - y) + "px";
                if (shift) frame.style.width = (frame.offsetHeight * r) + "px";
            }
            if (selected.indexOf("n")>-1) {
                frame.style.height = (h - event.clientY + y) + "px";
                frame.querySelector('table').style.top = (event.clientY - y) + "px";
                if (shift) {
                    if (shift)
                        frame.style.width = (frame.offsetHeight * r) + "px";
                    frame.querySelector('table').style.left = (event.clientY - y) * r + "px";
                }
            }
            if (selected.indexOf("w")>-1) {
                frame.style.width = (w - event.clientX + x) + "px";
                frame.querySelector('table').style.left = (event.clientX - x) + "px";
                if (shift) {
                    if (shift)
                        frame.style.height = (frame.offsetWidth / r) + "px";
                    frame.querySelector('table').style.top = (event.clientX - x) / r + "px";
                }
            }

            if(info){
                info = `<span class='info'> ${frame.offsetWidth} &#215;  ${frame.offsetHeight} px</span>`;
                frame.querySelector('table .c').innerHTML = info;
            } 
        }

    });

    document.addEventListener('mouseup', function (event) {
        if (selected) {
            selected = false;
            frame.querySelector('table').style.top = 0 + "px";
            frame.querySelector('table').style.left = 0 + "px";
            element.style.boxSizing = 'border-box';
            element.style.overflow = overflow;
            element.style.width = frame.offsetWidth + "px";
            element.style.height = frame.offsetHeight + "px";
        }
    });

    document.addEventListener('click', function (event) {
        if (!frame.contains(event.target)) {
            frame.replaceWith(element);
        }
    });

}

