#define M_PI 3.1415926535897932384626433832795
uniform vec3 color;
varying vec2 vUv;
varying vec4 vWorldPosition;
uniform float time;
uniform float signCurve;
uniform float tanCoef;
uniform float tanSpeed;
uniform sampler2D water;
uniform float allowTan;
uniform vec2 direction;

void main() {
  vec2 v = vUv;
  float stepCurve = sin(length(vWorldPosition.xy) / tanCoef + signCurve * time * tanSpeed);
  gl_FragColor = vec4( color , 1. ) * stepCurve;
}
