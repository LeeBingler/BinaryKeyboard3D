import * as THREE from 'three';
import Experience from '../Experience';

export default class Keyboard {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.renderer = this.experience.renderer;
        this.time = this.experience.time;
        this.rotateAnimation = false;

        this.setModel();
        this.setTexture();
        this.setMesh();
        this.setAnimation();
    }

    /* Set Functions */

    setModel() {
        this.keyboard = this.resources.items.keyboardModel.scene;
        this.key0 = {
            number: this.keyboard.children.find((child) => child.name === '0'),
            key: this.keyboard.children.find((child) => child.name === 'key0'),
        };
        this.key1 = {
            number: this.keyboard.children.find((child) => child.name === '1'),
            key: this.keyboard.children.find((child) => child.name === 'key1'),
        };
        this.planch = this.keyboard.children.find((child) => child.name === 'Planch');
    }

    setTexture() {
        this.texture = {};
    }

    setMesh() {
        // add all children of model to a group
        this.model = new THREE.Group();
        const children = [...this.keyboard.children];
        for (const child of children) {
            this.model.add(child);
        }

        // config scale to fit in screen width
        const maxWidthWindow = window.screen.availWidth - (window.outerWidth - window.innerWidth) * 2.5;
        const scale = Math.min(window.innerWidth / maxWidthWindow, 0.5) * 2.5;

        this.model.scale.set(scale, scale, scale);

        // config placement group
        this.model.rotateX(Math.PI * 0.1);

        this.scene.add(this.model);
    }

    /* Animation Functions */
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

            if (keydown === '1') {
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

    changeColorHex(color = 0xffffff, name = 'Touch0') {
        const itemToChange = this.model.children.find((child) => child.name === name);
        itemToChange.material.color.setHex(color);
    }

    /* Utils Functions */

    resize() {
        const maxWidthWindow = window.screen.availWidth - (window.outerWidth - window.innerWidth);
        const scale = Math.min(window.innerWidth / maxWidthWindow, 0.5) * 2.5;

        this.model.scale.set(scale, scale, scale);
    }

    update() {
        if (this.rotateAnimation) {
            this.model.rotation.y = (this.time.elapsed / 1000) * 0.2;
        }

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
