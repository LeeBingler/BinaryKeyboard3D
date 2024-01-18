import * as THREE from 'three';
import Experience from '../Experience';

export default class Keyboard {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resource = this.experience.resource.items.Keyboard;
        this.renderer = this.experience.renderer;
        this.time = this.experience.time;

        this.setModel();
        this.setAnimation();
    }

    setModel() {
        this.model = this.resource.scene;
        this.key0 = {
            number: this.model.children.find((child) => child.name === 'Text0'),
            key: this.model.children.find((child) => child.name === 'Touch0'),
        };
        this.key1 = {
            number: this.model.children.find((child) => child.name === 'Text1'),
            key: this.model.children.find((child) => child.name === 'Touch1'),
        };
        this.planch = this.model.children.find((child) => child.name === 'Planch');

        const numberMat = new THREE.MeshBasicMaterial({ color: 0x444444 });
        const keyMat = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
        const planchMat = new THREE.MeshBasicMaterial({ color: 0x888888 });

        this.key0.number.material = numberMat;
        this.key1.number.material = numberMat;

        this.key0.key.material = keyMat;
        this.key1.key.material = keyMat;

        this.planch.material = planchMat;

        this.model.rotateX(Math.PI * 0.2);
        this.model.scale.set(0.5, 0.5, 0.5);

        this.scene.add(this.model);
    }

    setAnimation() {
        const keydownValue = 0.2;
        this.initialPosY = {
            keyPos: this.key0.key.position.y,
            numPos: this.key0.number.position.y,
        };
        this.targetPosY = {
            keyPos: this.key0.key.position.y - keydownValue,
            numPos: this.key0.number.position.y - keydownValue,
        };
        this.key0.animation = 'init';
        this.key1.animation = 'init';

        window.addEventListener('keydown', (e) => {
            const keydown = e.key;

            if (keydown === '0') {
                this.triggerAnimationKeyDown(this.key0);
            }

            if (keydown === '1' ) {
                this.triggerAnimationKeyDown(this.key1);
            }
        });

        window.addEventListener('keyup', (e) => {
            const keyup = e.key;

            if (keyup === '0') {
                this.triggerAnimationKeyUp(this.key0);
            }

            if (keyup === '1') {
                this.triggerAnimationKeyUp(this.key1);
            }
        });
    }

    triggerAnimationKeyDown(key) {
        key.animation = 'down';
        key.animStart = this.time.elapsed;
    }

    triggerAnimationKeyUp(key) {
        key.animation = 'up';
        key.animStart = this.time.elapsed;
    }

    animationKeyUp(key) {
        key.key.position.y -= (key.animStart - this.time.elapsed) / 1000;
        key.number.position.y -= (key.animStart - this.time.elapsed) / 1000;
    }

    animationKeyDown(key) {
        key.key.position.y += (key.animStart - this.time.elapsed) / 1000;
        key.number.position.y += (key.animStart - this.time.elapsed) / 1000;
    }

    update() {
        this.model.rotation.y = (this.time.elapsed / 1000) * 0.2;

        // Animation condition key 0
        if (this.key0.animation === 'down' && this.targetPosY.keyPos < this.key0.key.position.y) {
            this.animationKeyDown(this.key0);
        }
        if (this.key0.animation === 'up' && this.initialPosY.keyPos > this.key0.key.position.y) {
            this.animationKeyUp(this.key0);
        }

        // Animation condition key 1
        if (this.key1.animation === 'down' && this.targetPosY.keyPos < this.key1.key.position.y) {
            this.animationKeyDown(this.key1);
        }
        if (this.key1.animation === 'up' && this.initialPosY.keyPos > this.key1.key.position.y) {
            this.animationKeyUp(this.key1);
        }
    }
}