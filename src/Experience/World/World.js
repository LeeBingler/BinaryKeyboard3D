import Light from './Light';
import Experience from '../Experience';
import Keyboard from './Keyboard';

export default class World {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.lights = new Light();

        // set light
        this.lights.setAmbientLight(0xffffff, 3);
        this.lights.setPointLight(0xff0000, 8000, {x: 0, y: 3, z: 0});

        // wait for resources
        this.resources.on('ready', () => {
            this.keyboard = new Keyboard();
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

        this.lights.pointlight.position.y = Math.sin(this.experience.time.elapsed / 1000) * 2;
    }
}
