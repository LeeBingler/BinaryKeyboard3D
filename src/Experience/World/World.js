import Light from './Light';
import Experience from '../Experience';
import Keyboard from './Keyboard';
import Stars from './Stars';

export default class World {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.lights = new Light();


        // wait for resources
        this.resources.on('ready', () => {
            this.keyboard = new Keyboard();
            this.stars = new Stars();
        });
    }

    resize() {
        if (this.keyboard) {
            this.keyboard.resize();
        }
    }

    update() {
        if (this.keyboard) {
            this.keyboard.update();
        }
    }
}
