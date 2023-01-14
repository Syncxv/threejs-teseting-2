import * as THREE from 'three';
export class Plane {
    geometry!: THREE.PlaneGeometry;
    material!: THREE.MeshBasicMaterial;
    scene: THREE.Scene;
    mesh!: THREE.Mesh;
    constructor(scene: THREE.Scene) {
        this.scene = scene;
        return this;
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
