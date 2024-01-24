import * as THREE from 'three';
import Experience from './Experience';
import gsap from 'gsap';

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.time = this.experience.time;
        this.sizes = this.experience.sizes;
        this.canvas = this.experience.canvas;
        this.scene = this.experience.scene;

        this.setInstance();
        this.setMouseMoveAnimation();
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            100
        );
        this.instance.position.set(0, 1.5, 8);
        this.scene.add(this.instance);
    }

    setMouseMoveAnimation() {
        this.cursor = {
            x: 0,
            y: 0,
        };
        this.scrollY = window.scrollY;

        window.addEventListener('mousemove', (e) => {
            this.cursor.x = e.clientX / this.sizes.width - 0.5;
            this.cursor.y = e.clientY / this.sizes.height - 0.5;

            // Animate Camera

            const powerAnimation = 0.5
            const parallaxX = this.cursor.x * powerAnimation;
            const parallaxY = -this.cursor.y * powerAnimation;

            gsap.to(this.instance.position, {
                x: `+=${parallaxX - this.instance.position.x}`,
                y: `+=${parallaxY - this.instance.position.y + 1.5}`,
            });
        });
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    update() {}
}
