import Experience from './Experience';

export default class ColorCustomLayout {
    constructor() {
        this.experience = new Experience();
        this.resources = this.experience.resources;
        this.world = this.experience.world;

        this.setDomElement();

        this.resources.on('ready', () => {
            this.setChangecolor();
        });
    }

    setDomElement() {
        this.mainDiv = document.createElement('div');

        this.mainDiv.classList.add('custom-color');

        function createSubDiv(color = '#ffffff', idName = 'str') {
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

        this.keyModifier = createSubDiv('#541B8D', 'key');
        this.signModifier = createSubDiv('#E5E5E5', 'sign');
        this.planchModifier = createSubDiv('#555555', 'planch');

        this.mainDiv.appendChild(this.keyModifier);
        this.mainDiv.appendChild(this.signModifier);
        this.mainDiv.appendChild(this.planchModifier);

        // insert the layout
        const domElem = document.querySelector('#custom article');
        const btnBuy = document.querySelector('#custom .btn-container');
        domElem.insertBefore(this.mainDiv, btnBuy);
    }

    setChangecolor() {
        this.keyboard = this.world.keyboard;

        this.planchModifier.addEventListener('change', (e) => {
            this.keyboard.changeColor(e.target.value, 'planch');
        });
        this.keyModifier.addEventListener('change', (e) => {
            this.keyboard.changeColor(e.target.value, 'key');
        });
        this.signModifier.addEventListener('change', (e) => {
            this.keyboard.changeColor(e.target.value, 'sign');
        });
    }
}
