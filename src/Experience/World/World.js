import Experience from '../Experience';
import Keyboard from './Keyboard';

export default class World {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resource = this.experience.resource;

        // wait for resource
        this.resource.on('ready', () => {
            this.keyboard = new Keyboard();
        });
    }

    update() {
        if (this.keyboard) {
            this.keyboard.update();
        }
    }
}
