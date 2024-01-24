import * as THREE from 'three';
import Experience from '../Experience';

export default class Light {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.ambientLights = [];
        this.pointlights = [];
    }

    setAmbientLight(color = 0xffffff, intensity = 1) {
        const ambientLight = new THREE.AmbientLight(color, intensity);

        this.scene.add(ambientLight);
        this.ambientLights.push(ambientLight);
    }

    setPointLight(color = 0xffffff, intensity = 1, position = { x: 0, y: 0, z: 0 }) {
        const pointlight = new THREE.PointLight(color, intensity);

        pointlight.position.x = position.x;
        pointlight.position.y = position.y;
        pointlight.position.z = position.z;

        pointlight.castShadow = true;

        this.scene.add(pointlight);
        this.pointlights.push(pointlight);
    }

    destroy() {
        for (const ambientLight of this.ambientLights) {
            ambientLight.remove();
            ambientLight.dispose();
        }

        for (const pointLight of this.pointLights) {
            pointLight.remove();
            pointLight.dispose();
        }
    }
}
