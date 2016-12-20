uniform sampler2D water;
uniform sampler2D disp0;
uniform sampler2D disp1;
uniform sampler2D disp2;
uniform sampler2D disp3;
uniform sampler2D disp4;
uniform float time;
uniform float dispId;
varying vec2 vUv;
void main()
{

  vec2 uvTimeShift = vUv + vec2(.1,-0.1)* time;
  vec4 noiseGeneratorTimeShift = texture2D( disp4, uvTimeShift);
  if(dispId == 0.){
    noiseGeneratorTimeShift = texture2D( disp0, uvTimeShift);
  }else if(dispId == 1.){
    noiseGeneratorTimeShift = texture2D( disp1, uvTimeShift);
  }else if(dispId == 2.){
    noiseGeneratorTimeShift = texture2D( disp2, uvTimeShift);
  }else if(dispId == 3.){
    noiseGeneratorTimeShift = texture2D( disp3, uvTimeShift);
  }else if(dispId == 4.){
    noiseGeneratorTimeShift = texture2D( disp4, uvTimeShift);
  }

  vec2 uvDisplacementTimeShift = vUv + vec2( noiseGeneratorTimeShift.r, noiseGeneratorTimeShift.b ) * .02;
  vec4 baseColor = texture2D( water,uvDisplacementTimeShift );

  gl_FragColor = baseColor ;
}
