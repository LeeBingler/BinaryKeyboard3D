import * as THREE from 'three';
import gsap from 'gsap';
import Experience from '../Experience';

export default class Light {
    constructor() {
        this.experience = new Experience();
        this.sectionHandler = this.experience.sectionHandler;
        this.scene = this.experience.scene;
        this.ambientLights = [];
        this.pointlights = [];

        // set light
        this.setAmbientLight(0xffffff, 1);
        this.setPointLight(0xffffff, 15, { x: 0, y: 1, z: 0 });

        this.setLightAnimation(this.pointlights[0]);
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

    setLightAnimation(light) {
        const animation = () => {
            const currentSection = this.sectionHandler.currentSection;

            if (currentSection === 0) {
                gsap.to(light.position, { x: 0, y: 1, z: 0 });
            }
            if (currentSection === 1) {
                gsap.to(light.position, { x: window.innerWidth > 768 ? -0.5 : -3, y: -3.5, z: 0 });
            }
            if (currentSection === 2) {
                gsap.to(light.position, { x: 0, y: -4, z: 0 });
            }
        };
        animation();

        this.sectionHandler.on('newSection', () => {
            animation();
        });
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
