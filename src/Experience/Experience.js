import * as THREE from 'three';
import Renderer from './Renderer';
import Camera from './Camera';
import Resources from './Utils/Resources';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import source from './source';
import World from './World/World';
import Preloader from './Preloader';

let instance = null;

export default class Experience {
    constructor(canvas) {
        // Singleton
        if (instance) {
            return instance;
        }

        instance = this;

        // Option
        this.canvas = canvas;

        // Setup
        this.sizes = new Sizes();
        this.time = new Time();
        this.scene = new THREE.Scene();
        this.resources = new Resources(source);
        this.preloader = new Preloader();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.world = new World();

        // Resize event
        this.sizes.on('resize', () => {
            this.resize();
        });

        // Time event Tick
        this.time.on('tick', () => {
            this.update();
        });
    }

    resize() {
        this.renderer.resize();
        this.camera.resize();
        this.world.resize();
    }

    update() {
        this.renderer.update();
        this.world.update();
    }
}
