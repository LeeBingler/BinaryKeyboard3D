import * as THREE from 'three';
import Experience from './Experience';
import overlayVertexShader from './Shaders/Preloader/Overlay/vertex.glsl';
import overlayFragmentShader from './Shaders/Preloader/Overlay/fragment.glsl';
import loadingBarVertexShader from './Shaders/Preloader/LoadingBar/vertex.glsl';
import loadingBarFragmentShader from './Shaders/Preloader/LoadingBar/fragment.glsl';

export default class Preloader {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;

        this.setOverlay();
        this.setLoadingBar();

        // Resources event
        this.resources.on('ready', () => {
            this.onLoad();
        });

        this.resources.on('load', () => {
            this.onProgress();
        });
    }

    setOverlay() {
        const overlayGeo = new THREE.PlaneGeometry(2, 2, 1, 1);
        const overlayMat = new THREE.ShaderMaterial({
            vertexShader: overlayVertexShader,
            fragmentShader: overlayFragmentShader,
            uniforms: {
                uAlpha: { value: 1 },
            },
        });

        this.overlay = new THREE.Mesh(overlayGeo, overlayMat);
        this.scene.add(this.overlay);
    }

    setLoadingBar() {
        const loadingBarGeo = new THREE.PlaneGeometry(2, 0.01, 1, 1);
        const loadingBarMat = new THREE.ShaderMaterial({
            vertexShader: loadingBarVertexShader,
            fragmentShader: loadingBarFragmentShader,
            uniforms: {
                uToload: { value: this.resources.toLoad },
                uLoaded: { value: 0 },
            },
        });

        this.loadingBar = new THREE.Mesh(loadingBarGeo, loadingBarMat);

        this.scene.add(this.loadingBar);
    }

    onProgress() {
        this.loadingBar.material.uniforms.uLoaded.value = this.resources.loaded;
    }

    onLoad() {
        this.overlay.material.uniforms.uAlpha.value = 0;
        this.destroy();
    }

    destroy() {
        this.overlay.material.dispose();
        this.overlay.geometry.dispose();
        this.overlay.parent.remove(this.overlay);

        this.loadingBar.material.dispose();
        this.loadingBar.geometry.dispose();
        this.loadingBar.parent.remove(this.loadingBar);
    }
}
