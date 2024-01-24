import Experience from '../Experience';
import * as THREE from 'three';
import starsVertexShader from '../Shaders/Stars/vertex.glsl';
import starsFragmentShader from '../Shaders/Stars/fragment.glsl';

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
            positionsParticle[i3 + 1] = (Math.random() - 0.7) * 15;
            positionsParticle[i3 + 2] = (Math.random() - 0.5) * 10;
        }

        this.geometry = new THREE.BufferGeometry();
        this.geometry.setAttribute('position', new THREE.BufferAttribute(positionsParticle, 3));
    }

    setMaterial() {
        this.material = new THREE.ShaderMaterial({
            blending: THREE.AdditiveBlending,
            vertexShader: starsVertexShader,
            fragmentShader: starsFragmentShader,
            depthWrite: false,
            uniforms: {
                uSize: { value: 50 * this.experience.renderer.instance.getPixelRatio() },
            },
        });
    }

    setStars() {
        this.particles = new THREE.Points(this.geometry, this.material);
        this.scene.add(this.particles);
    }
}
