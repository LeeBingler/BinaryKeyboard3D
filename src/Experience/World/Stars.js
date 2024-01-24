import Experience from '../Experience';
import * as THREE from 'three';

export default class Stars {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setGeometry();
        this.setMaterial();
        this.setStars();
    }

    setGeometry() {
        const particlesCount = 700;
        const positionsParticle = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;

            positionsParticle[i3] = (Math.random() - 0.5) * 10;
            positionsParticle[i3 + 1] = (Math.random() - 0.5) * 20;
            positionsParticle[i3 + 2] = (Math.random() - 0.5) * 10;
        }

        this.geometry = new THREE.BufferGeometry();
        this.geometry.setAttribute('position', new THREE.BufferAttribute(positionsParticle, 3));
    }

    setMaterial() {
        this.material = new THREE.PointsMaterial({
            color: 0xffffff,
            sizeAttenuation: true,
            size: 0.03,
        });
    }

    setStars() {
        this.particles = new THREE.Points(this.geometry, this.material);
        this.scene.add(this.particles);
    }
}
