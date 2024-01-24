export default class ColorCustomLayout {
    constructor() {
        this.setDomElement();
    }


    setDomElement() {
        this.mainDiv = document.createElement('div');

        this.mainDiv.classList.add('custom-color');

        function createSubDiv(color = '#ffffff', idName = 'str'){
            const subDiv = document.createElement('div');
            const input = document.createElement('input');
            const label = document.createElement('label');

            subDiv.classList.add('container-color');
            input.classList.add('color-input');
            label.classList.add('color-label');

            input.value = color;
            input.id = idName;
            input.type = 'color';

            label.htmlFor = idName;
            label.appendChild(document.createTextNode(idName));

            subDiv.appendChild(input);
            subDiv.appendChild(label);

            return subDiv;
        }

        this.keyModifier = createSubDiv('#722BB3', 'key');
        this.signModifier = createSubDiv('#FFFFFF', 'sign');
        this.planchModifier = createSubDiv('#FFF12B', 'planch');

        this.mainDiv.appendChild(this.keyModifier);
        this.mainDiv.appendChild(this.signModifier);
        this.mainDiv.appendChild(this.planchModifier);

        // insert the layout
        const domElem = document.querySelector('#custom article');
        const btnBuy = document.querySelector('#custom .btn-container');
        domElem.insertBefore(this.mainDiv, btnBuy);
    }
}