// Shader source ported from the supplied navy/coral HTML.
export const vertexShader = `#version 300 es
in vec2 a_pos; void main(){ gl_Position = vec4(a_pos,0.,1.); }`;

export const fragmentShader = `#version 300 es
precision mediump float;
uniform float u_time, u_pixelRatio, u_scale, u_pxSize;
uniform vec2 u_resolution;
uniform vec3 u_colorBack, u_colorFront;
out vec4 fragColor;
vec3 permute(vec3 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy)); vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1; i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0,i1.y,1.0)) + i.x + vec3(0.0,i1.x,1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0*fract(p*C.www) - 1.0; vec3 h = abs(x) - 0.5; vec3 ox = floor(x + 0.5); vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314*(a0*a0 + h*h);
  vec3 g; g.x = a0.x*x0.x + h.x*x0.y; g.yz = a0.yz*x12.xz + h.yz*x12.yw;
  return 130.0*dot(m, g);
}
float nz(vec2 uv, float t){ return .5*snoise(uv - vec2(0.,.3*t)) + .5*snoise(2.*uv + vec2(0.,.32*t)); }
const int b4[16] = int[16](0,8,2,10, 12,4,14,6, 3,11,1,9, 15,7,13,5);
float bayer4(vec2 uv){ ivec2 p = ivec2(mod(uv,4.0)); return float(b4[p.y*4+p.x])/16.0; }
void main(){
  float t = .5*u_time; float px = u_pxSize*u_pixelRatio;
  vec2 cell = floor(gl_FragCoord.xy/px);
  vec2 uv = ((cell+.5)*px - .5*u_resolution)/(u_pixelRatio*u_scale);
  float shape = smoothstep(0.3, 0.9, 0.5 + 0.5*nz(uv*.001, t));
  float res = step(.5, shape + bayer4(cell) - .5);
  fragColor = vec4(mix(u_colorBack, u_colorFront, res), 1.0);
}`;
