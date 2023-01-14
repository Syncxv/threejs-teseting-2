import * as THREE from 'three';
import * as dat from 'dat.gui';
export class Plane {
    geometry!: THREE.PlaneGeometry;
    material!: THREE.MeshBasicMaterial;
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

    setUpSettings() {
        this.gui = new dat.GUI();
        this.gui.add(this.settings, 'progress', 0, 1, 0.001);
    }

    addObjects() {
        this.geometry = new THREE.PlaneGeometry(350, 350, 150, 150);
        this.material = new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0xff0000,
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.scene.add(this.mesh);
        return this;
    }

    destroy() {
        this.geometry.dispose();
        this.material.dispose();
        this.scene.remove(this.mesh);
    }
}
