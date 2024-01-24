import Light from './Light';
import Experience from '../Experience';
import Keyboard from './Keyboard';
import * as THREE from 'three';
export default class World {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.lights = new Light();

        // set light
        this.lights.setAmbientLight(0xffffff, 1);
        this.lights.setPointLight(0xffffff, 10, {x: 0, y: 3, z: 0});

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
    }
}
