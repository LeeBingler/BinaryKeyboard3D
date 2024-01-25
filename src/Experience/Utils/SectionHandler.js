import EventEmitter from './EventEmitter';

export default class SectionHandler extends EventEmitter {
    constructor(height) {
        super();

        // Setup
        this.currentSection = 0;
        this.height = height;
        this.scrollY = window.scrollY;

        this.setChangeSection();
    }

    setChangeSection() {
        const triggerChange = () => {
            this.scrollY = window.scrollY;
            const newSection = Math.round(this.scrollY / this.height);

            if (newSection != this.currentSection) {
                this.currentSection = newSection;
                this.trigger('newSection');
            }
        }

        triggerChange();
        window.addEventListener('scroll', () => {
            triggerChange();
        });
    }

    resize(height) {
        this.height = height;
    }
}
