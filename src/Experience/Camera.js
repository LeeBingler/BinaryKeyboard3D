import * as THREE from 'three';
import Experience from './Experience';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.canvas = this.experience.canvas;
        this.scene = this.experience.scene;

        this.setInstance();
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            100
        );
        this.instance.position.set(0, 1.5, 8);
        this.scene.add(this.instance);
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }
}
