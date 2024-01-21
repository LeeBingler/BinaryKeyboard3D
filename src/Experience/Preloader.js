import * as THREE from 'three';
import Experience from './Experience';
import Time from './Utils/Time';
import overlayVertexShader from './Shaders/Preloader/vertex.glsl';
import overlayFragmentShader from './Shaders/Preloader/fragment.glsl';

export default class Preloader {
    constructor() {
        this.experience = new Experience();
        this.resources = this.experience.resources;
        this.scene = this.experience.scene;
        this.time = new Time();
        this.animationOccur = false;

        this.setOverlay();
        this.setLoadingBar();

        // resource event
        this.resources.on('ready', () => {
            setTimeout(() => {
                this.onLoad();
            }, 700);
        });

        this.resources.on('load', () => {
            this.onProgress();
        });

        this.resources.startLoading();

        // time event
        this.time.on('tick', () => {
            this.update();
        });
    }

    setOverlay() {
        this.overlay = {};
        this.overlay.geo = new THREE.PlaneGeometry(2, 2, 1, 1);
        this.overlay.mat = new THREE.ShaderMaterial({
            vertexShader: overlayVertexShader,
            fragmentShader: overlayFragmentShader,
            transparent: true,
            uniforms: {
                uAlpha: { value: 1 },
            },
        });

        this.overlay.mesh = new THREE.Mesh(this.overlay.geo, this.overlay.mat);
        this.scene.add(this.overlay.mesh);
    }

    setLoadingBar() {
        this.loadingBarDom = document.createElement('div');

        this.loadingBarDom.classList.add('loadingBar');
        this.loadingBarDom.style.transform = 'translateX(-100%)';

        document.body.appendChild(this.loadingBarDom);
    }

    onProgress() {
        const progressRatio = this.resources.loaded / this.resources.toLoad;
        this.loadingBarDom.style.transform = `scaleX(${progressRatio})`;
    }

    onLoad() {
        // Animation App fade In
        const app = document.querySelector('#app');
        app.style.opacity = 1;

        // allow scrolling
        document.body.style.overflow = 'auto';

        // Animation loading bar out
        this.loadingBarDom.classList.add('ended');
        this.loadingBarDom.style.transform = '';

        // Animation overlay fade out
        this.animStartTime = this.time.elapsed;
        this.animationOccur = true;
    }

    fadeOutOverlay() {
        let alpha = 1 - (this.time.elapsed - this.animStartTime) / 1000;
        if (alpha < 0) {
            alpha = 0;
            this.animationOccur = false;
            this.sceneLoaded = true;
            this.destroy();
        }

        this.overlay.mat.uniforms.uAlpha.value = alpha;
    }

    update() {
        if (this.animationOccur) {
            this.fadeOutOverlay();
        }
    }

    destroy() {
        this.time.off('tick');
        this.loadingBarDom.remove();

        this.overlay.mat.dispose();
        this.overlay.geo.dispose();
        this.overlay.mesh.parent.remove(this.overlay);
    }
}
