import * as THREE from 'three';
import * as dat from 'dat.gui';
import gsap from 'gsap';

import vertexShader from './glsl/vertex.glsl';
import fragmentShader from './glsl/fragment.glsl';
import { getHeight, getWidth } from '../../main';
import ASScroll from '@ashthornton/asscroll';

export class Plane {
    geometry!: THREE.PlaneGeometry;
    material!: THREE.ShaderMaterial;
    mesh!: THREE.Mesh;
    scene: THREE.Scene;

    settings = {
        progress: 0,
    };
    gui!: dat.GUI;
    tl!: gsap.core.Timeline;
    images!: HTMLImageElement[];
    imageData!: {
        img: HTMLImageElement;
        mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
        width: number;
        height: number;
        top: number;
        left: number;
    }[];
    materials!: THREE.ShaderMaterial[];
    asscroll: ASScroll;

    constructor(scene: THREE.Scene, asscroll: ASScroll) {
        this.asscroll = asscroll;
        this.scene = scene;
        // this.setUpSettings();

        document.getElementById('corner')?.addEventListener('click', () => (this.tl.progress() >= 1 ? this.tl.reverse() : this.play()));
        return this;
    }

    render() {
        // this.material.uniforms.uProgress.value = this.settings.progress;
        // this.tl.progress(this.settings.progress);
        this.setPosition();
    }

    setUpSettings() {
        this.gui = new dat.GUI();
        this.gui.add(this.settings, 'progress', 0, 1, 0.001);
    }

    addObjects() {
        this.geometry = new THREE.PlaneGeometry(1, 1, 150, 150);
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0.0 },
                uProgress: { value: 0.0 },
                // uTexture: { value: new THREE.TextureLoader().load('/debug-texture.jpg') },
                uTexture: { value: null },
                //uTextureSize is meant get aspect ratio so the size really doenst matter. since debug texture is a square aspect ratio will be 1
                uTextureSize: { value: new THREE.Vector2(100, 100) },
                uResolution: { value: new THREE.Vector2(getWidth(), getHeight()) },
                uQuadSize: { value: new THREE.Vector2(350, 350) },
                uCorners: { value: new THREE.Vector4(0, 0, 0, 0) },
            },

            vertexShader,
            fragmentShader,
        });

        this.setUpAnimation();
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.scene.add(this.mesh);
        this.mesh.scale.set(350, 350, 1);
        this.mesh.position.x -= 300;
        // this.mesh.rotation.z += 0.5;
        this.setUpImages();
        return this;
    }

    setUpImages() {
        this.materials = [];
        this.images = Array.from(document.querySelectorAll<HTMLImageElement>('img')!);
        this.imageData = this.images.map((img) => {
            let bounds = img.getBoundingClientRect();
            let m = this.material.clone();
            this.materials.push(m);
            let texture = new THREE.TextureLoader().load(img.src);
            img.onload = function () {
                texture.needsUpdate = true;
            };

            m.uniforms.uTexture.value = texture;

            img.addEventListener('mouseout', () => {
                this.tl = gsap
                    .timeline()
                    .to(m.uniforms.uCorners.value, {
                        x: 0,
                        duration: 0.4,
                    })
                    .to(
                        m.uniforms.uCorners.value,
                        {
                            y: 0,
                            duration: 0.4,
                        },
                        0.1
                    )
                    .to(
                        m.uniforms.uCorners.value,
                        {
                            z: 0,
                            duration: 0.4,
                        },
                        0.2
                    )
                    .to(
                        m.uniforms.uCorners.value,
                        {
                            w: 0,
                            duration: 0.4,
                        },
                        0.3
                    );
            });

            let mesh = new THREE.Mesh(this.geometry, m);
            this.scene.add(mesh);
            mesh.scale.set(bounds.width, bounds.height, 1);
            return {
                img: img,
                mesh: mesh,
                width: bounds.width,
                height: bounds.height,
                top: bounds.top,
                left: bounds.left,
            };
        });
    }

    setUpAnimation() {
        this.tl = gsap
            .timeline({ paused: true, defaults: { duration: 1 } })
            .to(this.material.uniforms.uCorners.value, { x: 1 })
            .to(this.material.uniforms.uCorners.value, { y: 1 }, 0.1)
            .to(this.material.uniforms.uCorners.value, { z: 1 }, 0.3)
            .to(this.material.uniforms.uCorners.value, { w: 1 }, 0.5);
    }

    setPosition() {
        // console.log(this.asscroll.currentPos)
        if (!this.tl.isActive()) {
            this.imageData.forEach((o) => {
                o.mesh.position.x = -this.asscroll.currentPos + o.left - getWidth() / 2 + o.width / 2;
                o.mesh.position.y = -o.top + getHeight() / 2 - o.height / 2;
            });
        }
    }

    play() {
        this.tl.play();
    }

    destroy() {
        this.geometry.dispose();
        this.material.dispose();
        this.scene.remove(this.mesh);
    }
}
