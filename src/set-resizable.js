// for webpack

import "./set-resizable.css";
export default class Resizable {

    constructor(element, options = {}) {

        if (!(element instanceof HTMLElement)) return console.error('Element not provided');

        this.element = element;

        this.options = Object.assign({
            active: false,
            activeEvent: 'click',
            color: "Blue",
            info: true,
            minSize: "40px",
            overflow: "auto",
            nodes: true,

        }, options);

        this.data = {
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            r: 0,
            shift: false,
            selected: "",
            position: this.element.style.position,
            display: window.getComputedStyle(element, null).display != "inline" ? window.getComputedStyle(element, null).display : "inline-block",
        }

        this.activeElement = document.createElement('div');
        this.activeElement.classList.add("resizable"); // add class styles

        this.element.addEventListener(this.options.activeEvent, this.activate.bind(this));

        if (this.options.active) {
            this.activate();
            // this.element.dispatchEvent(new Event(this.options.activeEvent));
            // this.element.dispatchEvent(new Event('mousedown'));
            //this.data.selected = false;
        }


        this.activeElement.onmousedown = (event) => this.#onselect(event);
        this.activeElement.ontouchstart =  (event) => this.#onselect(event);

        document.addEventListener('mousemove', this.#onresize.bind(this));
        document.addEventListener('touchmove', this.#onresize.bind(this), {passive: false});

        document.addEventListener('mouseup', this.resize.bind(this));
        document.addEventListener('touchend', this.resize.bind(this));

        document.addEventListener('keydown', (function (event) {
            if (event.shiftKey) {
                this.data.shift = true;
            }
        }).bind(this));

        document.addEventListener('keyup', (function (event) {
            if (event.key == "Shift") {
                this.data.shift = false;
            }
        }).bind(this));
     
        document.addEventListener('click',  this.#deactivate.bind(this));

    }


    activate() {

        this.deactivate();

        document.querySelector(':root').style.setProperty('--resizable-color', this.options.color);
        document.querySelector(':root').style.setProperty('--resizable-display', this.data.display);
        document.querySelector(':root').style.setProperty('--resizable-min-size', this.options.minSize);

        let info = "";

        if (this.options.info) info = `<span class='info'> ${this.element.offsetWidth} &#215;  ${this.element.offsetHeight} px</span>`;

        this.element.replaceWith(this.activeElement);

        this.activeElement.innerHTML = `
        <table class='control ${this.options.nodes ? "nodes" : ""}'>
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

        this.activeElement.prepend(this.element);

        this.activeElement.style.width = this.element.offsetWidth + "px";
        this.activeElement.style.height = this.element.offsetHeight + "px";

        this.data.w = this.element.offsetWidth;
        this.data.h = this.element.offsetHeight;
        //this.data.selected = true;

        if (typeof this.onactivate == "function"){
            this.onactivate(this);
        } 

    }

    #deactivate(event){
        if (!this.activeElement.contains(event.target)) {
            this.activeElement.replaceWith(this.element);
        }
        
    }

    deactivate(){
        document.querySelectorAll(".resizable").forEach(function (item) {
            item.replaceWith(item.firstChild);
        });
    }

    #onselect(event) {
        this.data.x = event.clientX || event.touches[0].clientX;
        this.data.y = event.clientY || event.touches[0].clientY;
        this.data.w = this.activeElement.offsetWidth;
        this.data.h = this.activeElement.offsetHeight;
        this.data.r = this.data.w / this.data.h;
        this.data.selected = event.target.className || event.targetTouches[0].target.className;
        if (this.data.display == "table") this.element.style.position = "absolute";
    }

    #onresize(event) {
        event.preventDefault();

        var clientX = event.clientX || event.touches[0].clientX;
        var clientY = event.clientY || event.touches[0].clientY;

        if (this.data.selected) {

            if (this.options.nodes) this.activeElement.querySelector('.control').classList.remove('nodes');

            if (this.data.selected.indexOf("e") > -1) {
                this.activeElement.style.width = (this.data.w + clientX - this.data.x) + "px";
                if (this.data.shift) this.activeElement.style.height = (this.activeElement.offsetWidth / this.data.r) + "px";
            }
            if (this.data.selected.indexOf("s") > -1) {
                this.activeElement.style.height = (this.data.h + clientY - this.data.y) + "px";
                if (this.data.shift) this.activeElement.style.width = (this.activeElement.offsetHeight * this.data.r) + "px";
            }
            if (this.data.selected.indexOf("n") > -1) {
                this.activeElement.style.height = (this.data.h - clientY + this.data.y) + "px";
                this.activeElement.querySelector('.control').style.top = (clientY - this.data.y) + "px";
                if (this.data.shift) {
                    this.activeElement.style.width = (this.activeElement.offsetHeight * this.data.r) + "px";
                    this.activeElement.querySelector('.control').style.left = (clientY - this.data.y) * this.data.r + "px";
                }
            }
            if (this.data.selected.indexOf("w") > -1) {
                this.activeElement.style.width = (this.data.w - clientX + this.data.x) + "px";
                this.activeElement.querySelector('.control').style.left = (clientX - this.data.x) + "px";
                if (this.data.shift) {
                    this.activeElement.style.height = (this.activeElement.offsetWidth / this.data.r) + "px";
                    this.activeElement.querySelector('.control').style.top = (clientX - this.data.x) / this.data.r + "px";
                }
            }

            this.#updateInfo();

            // if (typeof this.onresize == "function"){
            //     this.onresize({newWidth: this.activeElement.offsetWidth, newHeight: this.activeElement.offsetHeight});
            // } 

        }
    }

    #updateInfo(){
        if (this.options.info) {
                let info = `<span class='info'> ${this.activeElement.offsetWidth} &#215;  ${this.activeElement.offsetHeight} px</span>`;
                this.activeElement.querySelector('.control .c').innerHTML = info;
            }
    }

    resize(w, h) {

        //console.log(w, h);

        if (this.data.selected) {

            if (h) {
                this.data.w = w;
                this.data.h = h;
                this.data.r = this.data.w / this.data.h;
                this.activeElement.style.width = w + "px";
                this.activeElement.style.height = h + "px";
            }

            if (this.options.nodes) this.activeElement.querySelector('.control').classList.add('nodes');
            this.activeElement.querySelector('.control').style.top = 0 + "px";
            this.activeElement.querySelector('.control').style.left = 0 + "px";

            this.element.style.boxSizing = 'border-box';
            this.element.style.overflow = this.options.overflow;
            this.element.style.width = this.activeElement.offsetWidth + "px";
            this.element.style.height = this.activeElement.offsetHeight + "px";
            this.element.style.position = this.data.position;

            this.#updateInfo();

            if (this.activeElement.contains(w.target) && typeof this.onresize == "function"){
                this.onresize({newWidth: this.activeElement.offsetWidth, newHeight: this.activeElement.offsetHeight});
            } 

            this.data.selected = false;

        }

    }



}