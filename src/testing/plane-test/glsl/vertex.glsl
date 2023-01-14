
#pragma glslify: snoise = require('glsl-noise/simplex/4d')

uniform float uTime;
uniform float uProgress;


varying vec2 vUv;
varying vec3 vNormal;
void main() {

    vNormal = normal;
    vUv = uv;



    vec4 initalState =  modelMatrix * vec4(position, 1.0);
    vec4 fullscreenState = vec4(position, 1.0);

    vec4 finalState = mix(initalState, fullscreenState, uProgress);

    gl_Position = projectionMatrix * viewMatrix * finalState;

}


