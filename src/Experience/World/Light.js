import * as THREE from 'three';
import Experience from '../Experience';

export default class Light {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
    }

    setAmbientLight(color = 0xffffff, intensity = 1) {
        this.ambientLight = new THREE.AmbientLight(color, intensity);
        this.scene.add(this.ambientLight);
    }

    setDirectionalLight(color = 0xffffff, intensity = 1, position = { x: 0, y: 0, z: 0 }) {
        this.directionalLight = new THREE.DirectionalLight(color, intensity);

        this.directionalLight.position.x = position.x;
        this.directionalLight.position.y = position.y;
        this.directionalLight.position.z = position.z;

        this.directionalLight.rotateX(Math.PI * 0.5)

        this.directionalLight.castShadow = true;

        this.scene.add(this.directionalLight);
    }

    setPointLight(color = 0xffffff, intensity = 1, position = { x: 0, y: 0, z: 0 }) {
        this.pointlight = new THREE.PointLight(color, intensity, 7);

        this.pointlight.position.x = position.x;
        this.pointlight.position.y = position.y;
        this.pointlight.position.z = position.z;

        this.pointlight.castShadow = true;

        const helper = new THREE.PointLightHelper(this.pointlight);
        this.scene.add(helper);

        this.scene.add(this.pointlight);
    }

    destroy() {
        this.ambientLight.remove();
        this.ambientLight.dispose();

        this.pointlight.remove();
        this.pointlight.dispose();
    }
}
