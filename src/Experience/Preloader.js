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

        this.setOverlay();
        this.setLoadingBar();
    }

    setOverlay() {
        const overlayGeo = new THREE.PlaneGeometry(2, 2, 1, 1);
        const overlayMat = new THREE.ShaderMaterial({
            vertexShader: overlayVertexShader,
            fragmentShader: overlayFragmentShader,
        });

        this.overlay = new THREE.Mesh(overlayGeo, overlayMat);
        this.scene.add(this.overlay);
    }

    setLoadingBar() {
        const loadingBarGeo = new THREE.PlaneGeometry(2, 0.01, 1, 1);
        const loadingBarMat = new THREE.ShaderMaterial({
            vertexShader: loadingBarVertexShader,
            fragmentShader: loadingBarFragmentShader,
        });

        this.loadingBar = new THREE.Mesh(loadingBarGeo, loadingBarMat);

        this.scene.add(this.loadingBar);
    }
}
