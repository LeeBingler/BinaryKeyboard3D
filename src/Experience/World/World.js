import Experience from '../Experience';
import Keyboard from './Keyboard';

export default class World {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        // wait for resource
        this.resources.on('ready', () => {
            this.keyboard = new Keyboard();
        });
    }

    update() {
        if (this.keyboard) {
            this.keyboard.update();
        }
    }
}
