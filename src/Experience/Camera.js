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

        this.numberOfScene = 3;

        this.setInstance();
        this.setScrollMove();
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
        this.group = new THREE.Group();

        this.group.add(this.instance);
        this.scene.add(this.group);
    }

    setScrollMove() {
        this.scrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            this.scrollY = window.scrollY;
        });
    }

    setMouseMoveAnimation() {
        this.cursor = {
            x: 0,
            y: 0,
        };

        window.addEventListener('mousemove', (e) => {
            this.cursor.x = e.clientX / this.sizes.width - 0.5;
            this.cursor.y = e.clientY / this.sizes.height - 0.5;

            // Animate Camera

            const powerAnimation = 0.5;
            const parallaxX = this.cursor.x * powerAnimation;
            const parallaxY = -this.cursor.y * powerAnimation;

            gsap.to(this.group.position, {
                x: `+=${parallaxX - this.group.position.x}`,
                y: `+=${parallaxY - this.group.position.y}`,
            });
        });
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    update() {
        this.instance.position.y = (-this.scrollY / this.sizes.height) * this.numberOfScene;
    }
}
