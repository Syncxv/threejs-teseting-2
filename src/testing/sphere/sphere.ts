import * as THREE from 'three';
import vertexShader from './glsl/vertex.glsl';
import fragmentShader from './glsl/fragment.glsl';
export class SphereTesting {
    geometry!: THREE.SphereGeometry;
    material!: THREE.ShaderMaterial;
    scene: THREE.Scene;
    mesh!: THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial>;
    clock: THREE.Clock;
    constructor(scene: THREE.Scene, clock: THREE.Clock) {
        this.clock = clock;
        this.scene = scene;
        return this;
    }

    render() {
        this.material.uniforms.uTime.value = this.clock.getElapsedTime();
    }

    addObjects() {
        this.geometry = new THREE.SphereGeometry(0.1, 200, 200);
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0.0 },
            },

            vertexShader,
            fragmentShader,
        });

        console.log(this.material);

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
        return this;
    }

    destroy() {
        this.scene.remove(this.mesh);
        this.geometry.dispose();
        this.material.dispose();
    }
}
