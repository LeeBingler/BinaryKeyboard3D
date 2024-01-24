import * as THREE from 'three';
import gsap from 'gsap';
import Experience from '../Experience';

export default class Keyboard {
    constructor() {
        // setup
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.renderer = this.experience.renderer;
        this.time = this.experience.time;
        this.rotateAnimation = false;

        this.currentSection = 0;
        this.scrollY = window.scrollY;

        this.setModel();
        //this.setTexture();
        this.setMesh();
        this.setAnimationKey();
        this.setAnimationChangeSection();
    }

    /* Set Functions */

    setModel() {
        this.keyboard = this.resources.items.keyboardModel.scene;
        this.mapModel = new Map();
        const modelStartWithKey = [];
        const modelNotKey = [];

        // Separate key model from sign model
        for (const child of this.keyboard.children) {
            if (child.name.startsWith('key')) {
                modelStartWithKey.push(child);
            } else {
                modelNotKey.push(child);
            }
        }

        // reunit keymodel with there sign and add them to a map
        let keyModel = null;
        let notkey = null;
        let finalObj = {};
        while (modelStartWithKey.length || modelNotKey.length) {
            notkey = modelNotKey.shift();

            for (let i = 0; i < modelStartWithKey.length; i++) {
                if (modelStartWithKey[i].name.endsWith(notkey.name)) {
                    keyModel = modelStartWithKey.splice(i, 1)[0];
                }
            }

            finalObj = {
                key: keyModel,
                sign: notkey,
                initialPos: {
                    key: keyModel ? keyModel.position.clone() : null,
                    sign: notkey ? notkey.position.clone() : null,
                },
            };

            this.mapModel.set(notkey.name, finalObj);

            keyModel = null;
            notkey = null;
        }
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
        const maxWidthWindow = window.screen.availWidth;
        const scale = Math.min(window.innerWidth / maxWidthWindow, 0.5) * 2.5;

        this.model.scale.set(scale, scale, scale);

        // config placement group
        this.model.rotateX(Math.PI * 0.1);

        this.scene.add(this.model);
    }

    /* Animation Key Functions */
    setAnimationKey() {
        window.addEventListener('keydown', (e) => {
            const keydown = this.mapModel.get(e.key);

            if (keydown === undefined) return;

            this.triggerAnimationKeyDown(keydown);
        });

        window.addEventListener('keyup', (e) => {
            const keyup = this.mapModel.get(e.key);

            if (keyup === undefined) return;

            this.triggerAnimationKeyUp(keyup);
        });
    }

    triggerAnimationKeyDown(keydown) {
        const valueDown = 0.15;

        gsap.to(keydown.key.position, { y: keydown.initialPos.key.y - valueDown, duration: 0.1 });
        gsap.to(keydown.sign.position, { y: keydown.initialPos.sign.y - valueDown, duration: 0.1 });
    }

    triggerAnimationKeyUp(keyup) {
        gsap.to(keyup.key.position, { y: keyup.initialPos.key.y, duration: 0.1 });
        gsap.to(keyup.sign.position, { y: keyup.initialPos.sign.y, duration: 0.1 });
    }

    /* Animation Change Section */
    setAnimationChangeSection() {
        window.addEventListener('scroll', () => {
            this.scrollY = window.scrollY;
            const newSection = Math.round(scrollY / this.experience.sizes.height);

            // Animation when homepage
            if (newSection === 0 && this.currentSection != 0) {
                this.currentSection = newSection;
                gsap.to(this.model.rotation, { x: Math.PI * 0.1, y: 0, z: 0 });
                gsap.to(this.model.position, { x: 0, y: 0 });

                this.rotateAnimation = false;
            }
            // Animation when description page
            if (newSection === 1 && this.currentSection != 1) {
                this.currentSection = newSection;
                gsap.to(this.model.rotation, { x: Math.PI * 2.5, y: 0, z: Math.PI * 0.3 });
                gsap.to(this.model.position, { x: window.innerWidth > 768 ? 2.4 : 0, y: 1 });

                this.rotateAnimation = false;
            }
            // Animation when custom page
            if (newSection === 2 && this.currentSection != 2) {
                this.currentSection = newSection;
                gsap.to(this.model.rotation, { x: Math.PI * 0.1, y: 0, z: 0 });
                gsap.to(this.model.position, { x: 0, y: 1.2 });
                this.rotateAnimation = true;
            }
        });
    }

    changeColor(color) {
        this.mapModel.get('Planch').key.color.setHex(color);
    }

    /* Utils Functions */
    resize() {
        const maxWidthWindow = window.screen.availWidth;
        const scale = Math.min(window.innerWidth / maxWidthWindow, 0.5) * 2.5;

        this.model.scale.set(scale, scale, scale);
    }

    update() {
        if (this.rotateAnimation) {
            this.model.rotation.y += (this.time.delta / 1000) * 0.2;
        }
    }
}
