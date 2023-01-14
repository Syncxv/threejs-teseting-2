
#pragma glslify: snoise = require('glsl-noise/simplex/4d')

uniform float uTime;
uniform float uProgress;
uniform vec2 uResolution;
uniform vec2 uQuadSize;
uniform vec2 uTextureSize;


varying vec2 vUv;
varying vec3 vNormal;
varying vec2 vSize;
void main() {

    vNormal = normal;
    vUv = uv;



    vec4 initalState =  modelMatrix * vec4(position, 1.0);
    vec4 fullscreenState = vec4(position, 1.0);
    fullscreenState.x *=  uResolution.x / uQuadSize.x ;
    fullscreenState.y *=  uResolution.y / uQuadSize.y ;
    vec4 finalState = mix(initalState, fullscreenState, uProgress);

    vSize = mix(uQuadSize, uResolution, uProgress);

    gl_Position = projectionMatrix * viewMatrix * finalState;

}


