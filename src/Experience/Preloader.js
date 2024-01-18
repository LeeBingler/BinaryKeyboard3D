import * as THREE from 'three';
import Experience from './Experience';
import overlayVertexShader from './Shaders/Preloader/Overlay/vertex.glsl';
import overlayFragmentShader from './Shaders/Preloader/Overlay/fragment.glsl';
import loadingBarVertexShader from './Shaders/Preloader/LoadingBar/vertex.glsl';
import loadingBarFragmentShader from './Shaders/Preloader/LoadingBar/fragment.glsl';

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
            this.onLoad();
        });

        this.resources.on('load', () => {
            this.onProgress();
        });

        setTimeout(() => {
            this.resources.startLoading();
        }, 3000);
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
        this.loadingBar = {};
        this.loadingBar.geo = new THREE.PlaneGeometry(2, 0.01, 1, 1);
        this.loadingBar.mat = new THREE.ShaderMaterial({
            vertexShader: loadingBarVertexShader,
            fragmentShader: loadingBarFragmentShader,
            uniforms: {
                uToload: { value: 0 },
                uLoaded: { value: 0 },
                uOffset: { value: 0 },
            },
        });

        this.loadingBar.mesh = new THREE.Mesh(this.loadingBar.geo, this.loadingBar.mat);

        this.scene.add(this.loadingBar.mesh);
    }

    onProgress() {
        this.loadingBar.mat.uniforms.uLoaded.value = this.resources.loaded;
        this.loadingBar.mat.uniforms.uToload.value = this.resources.toLoad;
    }

    onLoad() {
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

    loadingBarOut(speed) {
        let offset = ((this.time.elapsed - this.animStartTime) / 1000) * speed;

        this.loadingBar.mat.uniforms.uOffset.value = offset;
    }

    update() {
        if (this.animationOccur) {
            this.fadeOutOverlay();
            this.loadingBarOut(4);
        }
    }

    destroy() {
        this.overlay.material.dispose();
        this.overlay.geometry.dispose();
        this.overlay.parent.remove(this.overlay);

        this.loadingBar.mesh.material.dispose();
        this.loadingBar.mesh.geometry.dispose();
        this.loadingBar.mesh.parent.remove(this.loadingBar.mesh);
    }
}
