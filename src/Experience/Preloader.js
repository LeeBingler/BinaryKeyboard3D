import * as THREE from 'three';
import Experience from './Experience';
import overlayVertexShader from './Shaders/Preloader/vertex.glsl';
import overlayFragmentShader from './Shaders/Preloader/fragment.glsl';

export default class Preloader {
    constructor() {
        this.experience = new Experience();
        this.resources = this.experience.resources;
        this.scene = this.experience.scene;
        this.time = this.experience.time;
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
        this.loadingBarDom.classList.add('ended');
        this.loadingBarDom.style.transform = '';

        this.animStartTime = this.time.elapsed;
        this.animationOccur = true;
    }

    fadeOutOverlay() {
        let alpha = 1.1 - (this.time.elapsed - this.animStartTime) / 1000;
        if (alpha < 0) {
            alpha = 0;
            this.animationOccur = false;
        }

        this.overlay.mat.uniforms.uAlpha.value = alpha;
    }

    update() {
        if (this.animationOccur) {
            this.fadeOutOverlay();
        }
    }

    destroy() {
        this.overlay.material.dispose();
        this.overlay.geometry.dispose();
        this.overlay.parent.remove(this.overlay);
    }
}
