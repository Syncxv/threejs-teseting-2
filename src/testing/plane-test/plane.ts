import * as THREE from 'three';
import * as dat from 'dat.gui';

import vertexShader from './glsl/vertex.glsl';
import fragmentShader from './glsl/fragment.glsl';
import { getHeight, getWidth } from '../../main';

export class Plane {
    geometry!: THREE.PlaneGeometry;
    material!: THREE.ShaderMaterial;
    mesh!: THREE.Mesh;
    scene: THREE.Scene;

    settings = {
        progress: 0,
    };
    gui!: dat.GUI;
    constructor(scene: THREE.Scene) {
        this.scene = scene;
        this.setUpSettings();
        return this;
    }

    render() {
        this.material.uniforms.uProgress.value = this.settings.progress;
    }

    setUpSettings() {
        this.gui = new dat.GUI();
        this.gui.add(this.settings, 'progress', 0, 1, 0.001);
    }

    addObjects() {
        this.geometry = new THREE.PlaneGeometry(350, 350, 150, 150);
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0.0 },
                uProgress: { value: 0.0 },
                uTexture: { value: new THREE.TextureLoader().load('/debug-texture.jpg') },
                //uTextureSize is meant get aspect ratio so the size really doenst matter. since debug texture is a square aspect ratio will be 1
                uTextureSize: { value: new THREE.Vector2(100, 100) },
                uResolution: { value: new THREE.Vector2(getWidth(), getHeight()) },
                uQuadSize: { value: new THREE.Vector2(350, 350) },
            },

            vertexShader,
            fragmentShader,
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.scene.add(this.mesh);
        this.mesh.position.x += 300;
        this.mesh.rotation.z += 0.5;
        return this;
    }

    destroy() {
        this.geometry.dispose();
        this.material.dispose();
        this.scene.remove(this.mesh);
    }
}
