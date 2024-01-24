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

        // set light
        this.lights.setAmbientLight(0xffffff, 1);
        this.lights.setPointLight(0xffffff, 15, { x: 0, y: 1, z: 0 });
        this.lights.setPointLight(0xffffff, 15, { x: -0.5, y: -3.5, z: 0 });
        this.lights.setPointLight(0xffffff, 15, { x: 0, y: -6, z: 0 });

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
