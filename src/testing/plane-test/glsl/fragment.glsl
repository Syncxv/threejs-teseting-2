uniform float uProgress;
uniform sampler2D uTexture;
uniform vec2 uQuadSize;
uniform vec2 uTextureSize;

varying vec2 vUv;
varying vec3 vNormal;
varying vec2 vSize;

vec2 getUv(vec2 uv, vec2 textureSize, vec2 quadSize) {
   vec2 tempUv = uv - vec2(0.5);

   float quadAspect = quadSize.x / quadSize.y;
   float textureAspect = textureSize.x / textureSize.y;

   if(quadAspect < textureAspect) {

         tempUv = tempUv*vec2(quadAspect/textureAspect,1.);
   } else {

         tempUv = tempUv*vec2(1., textureAspect / quadAspect);
   }

   tempUv += vec2(0.5);

   return tempUv;
}

void main() {
   vec4 image = texture(uTexture, getUv(vUv, uTextureSize, vSize));

   gl_FragColor = vec4(vUv, 0., 1.);
   // gl_FragColor = image;
}