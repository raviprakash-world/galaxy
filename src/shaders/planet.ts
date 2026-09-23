// All planetary surfaces are procedural GLSL: seamless at any zoom, no texture downloads.
// `OCT` (fbm octaves) is injected per material from the quality tier. See README for the asset policy.

export const NOISE = /* glsl */ `
float hash13(vec3 p){ p = fract(p*.3183099+.1); p *= 17.; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
vec3 hash33(vec3 p){
  p = vec3(dot(p,vec3(127.1,311.7,74.7)), dot(p,vec3(269.5,183.3,246.1)), dot(p,vec3(113.5,271.9,124.6)));
  return fract(sin(p)*43758.5453);
}
float vnoise(vec3 x){
  vec3 i = floor(x), f = fract(x); f = f*f*f*(f*(f*6.-15.)+10.);
  return mix(mix(mix(hash13(i),hash13(i+vec3(1,0,0)),f.x), mix(hash13(i+vec3(0,1,0)),hash13(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(hash13(i+vec3(0,0,1)),hash13(i+vec3(1,0,1)),f.x), mix(hash13(i+vec3(0,1,1)),hash13(i+vec3(1,1,1)),f.x),f.y), f.z);
}
float fbm(vec3 p){
  float a = .5, s = 0.;
  for (int i = 0; i < OCT; i++){ s += a*vnoise(p); p = p*2.03 + vec3(1.7,9.2,3.1); a *= .5; }
  return s / (1. - pow(.5, float(OCT)));
}
// Cellular craters: bowl inside, raised rim. Returns signed height.
float craters(vec3 p){
  vec3 ip = floor(p), fp = fract(p); float h = 0.;
  for (int z = -1; z <= 1; z++) for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++){
    vec3 g = vec3(float(x),float(y),float(z));
    vec3 o = hash33(ip+g);
    float d = length(fp - g - o), r = .16 + .26*o.x;
    h -= (1. - smoothstep(0., r, d)) * (.5 + .5*o.y);
    h += smoothstep(r*.72, r, d) * (1. - smoothstep(r, r*1.35, d)) * .32;
  }
  return h;
}
float ringDensity(float r){
  float d = .22*step(1.24,r)*step(r,1.53)
          + .92*smoothstep(1.53,1.57,r)*(1.-smoothstep(1.92,1.96,r))
          + .05*step(1.96,r)*step(r,2.03)
          + .64*smoothstep(2.03,2.07,r)*(1.-smoothstep(2.23,2.27,r));
  d *= 1. - .85*(1. - smoothstep(0.,.006,abs(r-2.215)));
  d *= .78 + .22*sin(r*210.)*sin(r*61.+1.);
  return clamp(d,0.,1.);
}
`

export const planetVert = /* glsl */ `
varying vec3 vP; varying vec3 vN; varying vec3 vW;
void main(){
  vP = position;
  vN = normalize(mat3(modelMatrix)*normal);
  vec4 w = modelMatrix*vec4(position,1.);
  vW = w.xyz;
  gl_Position = projectionMatrix*viewMatrix*w;
}`

export const planetFrag = /* glsl */ `
uniform int uKind; uniform vec3 uSun; uniform float uTime; uniform sampler2D uMask;
uniform sampler2D uDayMap; uniform sampler2D uNightMap; uniform sampler2D uOceanMap; uniform float uTexOn;
uniform vec3 uAtmo; uniform float uAtmoAmt; uniform float uAmbient;
uniform vec3 uCenter; uniform vec3 uRingN; uniform float uRadius; uniform float uRing;
uniform float uFocus; uniform float uLights; uniform float uDayNight; uniform float uAtmoOn;
varying vec3 vP; varying vec3 vN; varying vec3 vW;
${NOISE}
void main(){
  vec3 p = normalize(vP);
  vec3 N0 = normalize(vN);
  vec3 N = N0;
  vec3 V = normalize(cameraPosition - vW);
  vec3 L = normalize(uSun - vW);
  vec3 albedo = vec3(.5); vec3 emis = vec3(0.);
  float h = 0., bump = 0., water = 0., coast = 0., wrap = 0.;
  float geo = dot(N0, L);
  if (uDayNight < .5) geo = .8;

  if (uKind == 0) { // ---- Earth
    float lat = asin(clamp(p.y,-1.,1.)), lon = atan(-p.z,p.x);
    vec2 uv = vec2(lon/6.2831853+.5, lat/3.1415926+.5); // equirectangular; matches the day/night/cloud textures
    float m = texture2D(uMask, uv).r;
    float n1 = fbm(p*5.+3.), n2 = fbm(p*18.);
    float lv = m + (n1-.5)*.62 + (n2-.5)*.26;
    float land = smoothstep(.45,.5,lv);
    float la = abs(lat)/1.5707963;
    float moist = fbm(p*3.4+11.);
    float mount = fbm(p*11.) * land;
    float ice = smoothstep(.79,.85, la + (n1-.5)*.14);
    float subtrop = 1. - smoothstep(0.,.2,abs(la-.3));
    float dry = clamp(subtrop*1.25 + (.5-moist)*1.1, 0., 1.);
    vec3 lush = mix(vec3(.09,.22,.07), vec3(.16,.30,.10), smoothstep(.1,.4,la));
    lush = mix(lush, vec3(.28,.34,.14), smoothstep(.3,.6,la)*.7);
    vec3 col = mix(lush, vec3(.68,.54,.33), smoothstep(.42,.75,dry));
    col = mix(col, vec3(.36,.38,.32), smoothstep(.58,.74,la));
    col = mix(col, vec3(.38,.34,.30), smoothstep(.5,.75,mount));
    col = mix(col, vec3(.95), smoothstep(.72,.88,mount) * smoothstep(.1,.5,la+.25));
    col = mix(col, vec3(.93,.96,1.), ice);
    float shelf = smoothstep(.0,.4,m);
    vec3 sea = mix(vec3(.03,.12,.30), vec3(.10,.40,.55), shelf*.85 + (n1-.5)*.1);
    sea = mix(sea, vec3(.9,.95,1.), ice);
    float isLand = max(land, ice);
    albedo = mix(sea, col, isLand);
    water = 1. - isLand;
    h = smoothstep(.4,.62,lv) * (.2 + mount*.8); bump = 1.3;
    coast = 1. - smoothstep(0., .04, abs(lv-.475));

    // Real NASA-derived imagery (day/night/ocean mask), crossfaded in as it loads. See README (Assets).
    vec3 dayTex = texture2D(uDayMap, uv).rgb;
    float oceanTex = texture2D(uOceanMap, uv).r; // 1 = ocean, 0 = land, precomputed from the day map
    albedo = mix(albedo, dayTex, uTexOn);
    water = mix(water, oceanTex, uTexOn);
    isLand = mix(isLand, 1. - oceanTex, uTexOn);
    bump = mix(bump, 0.6, uTexOn);

    if (uFocus > .5 && uFocus < 1.5) { albedo = mix(albedo*.3, albedo*1.25, isLand); albedo += vec3(.3,.45,1.)*coast*.55*(1.-uTexOn); }
    if (uFocus > 1.5) { albedo = mix(albedo*1.55, albedo*.3, isLand); albedo += vec3(.3,.45,1.)*coast*.55*(1.-uTexOn); }
    // city lights: real night-lights texture, with procedural specks as the fallback while it loads
    float pop = smoothstep(.6,.8, fbm(p*9.+31.)) * smoothstep(.9,.6,la);
    float sp = smoothstep(.9,1.08, vnoise(p*110.) + .25*vnoise(p*260.));
    vec3 emisProc = vec3(1.,.72,.38) * isLand * (1.-ice) * (pop*sp*1.3 + pop*.03);
    vec3 emisTex = texture2D(uNightMap, uv).rgb * 1.7;
    emis = mix(emisProc, emisTex, uTexOn) * uLights;
  }
  else if (uKind == 6) { // ---- Mercury
    float c = craters(p*3.) + .6*craters(p*8.5);
    #if OCT > 3
    c += .35*craters(p*21.);
    #endif
    float reg = fbm(p*14.);
    h = c*.5 + reg*.12; bump = 4.;
    albedo = mix(vec3(.28,.26,.25), vec3(.56,.53,.5), reg) * (.86 + .3*clamp(c,-.3,.5));
  }
  else if (uKind == 7) { // ---- Mars
    float c = craters(p*4.) + .5*craters(p*12.);
    float reg = fbm(p*6.);
    float dark = smoothstep(.46,.62, fbm(p*2.4+4.));
    vec3 rust = mix(vec3(.5,.22,.1), vec3(.78,.44,.24), reg);
    albedo = mix(rust, vec3(.22,.14,.11), dark*.72);
    float cap = smoothstep(.955,.985, abs(p.y) + (reg-.5)*.03);
    albedo = mix(albedo, vec3(.94,.95,.97), cap);
    h = reg*.5 + c*.25; bump = 2.4;
  }
  else if (uKind == 5) { // ---- Venus
    vec3 q = p*2.;
    q += .7*vec3(fbm(q+uTime*.012), fbm(q+5.2), fbm(q+9.7));
    float c = fbm(q*2.2 + uTime*.02);
    albedo = mix(vec3(.7,.52,.28), vec3(.97,.89,.68), smoothstep(.25,.75,c));
    wrap = .35;
  }
  else if (uKind == 1) { // ---- Jupiter
    float lat = p.y;
    vec3 q = p; float ang = uTime*.02*(1.+.6*cos(lat*14.));
    q.xz = mat2(cos(ang),-sin(ang),sin(ang),cos(ang))*q.xz;
    float warp = fbm(vec3(q.x*3., q.y*8., q.z*3.)+2.);
    float bands = .5+.5*sin((lat*9.5 + (warp-.5)*1.7)*3.14159);
    float fine = fbm(vec3(q.x*6., q.y*36., q.z*6.));
    albedo = mix(vec3(.88,.8,.67), vec3(.68,.43,.29), smoothstep(.35,.72,bands));
    albedo = mix(albedo, vec3(.42,.28,.2), smoothstep(.6,.9,fine)*.55*(1.-bands*.4));
    albedo *= .9 + .2*fine;
    float lon = atan(p.z,p.x);
    vec2 d = vec2(atan(sin(lon-1.2),cos(lon-1.2))/.3, (asin(clamp(lat,-1.,1.))+.39)/.14);
    float e = length(d);
    float spot = 1. - smoothstep(.55,1.,e);
    albedo = mix(albedo, vec3(.74,.31,.18), spot*.9);
    albedo = mix(albedo, vec3(.6,.36,.24), smoothstep(.9,1.3,e)*(1.-smoothstep(1.3,1.6,e))*.35);
    wrap = .25;
  }
  else if (uKind == 2) { // ---- Saturn
    float lat = p.y;
    vec3 q = p; float ang = uTime*.02*(1.+.5*cos(lat*10.));
    q.xz = mat2(cos(ang),-sin(ang),sin(ang),cos(ang))*q.xz;
    float warp = fbm(vec3(q.x*2.5, q.y*6., q.z*2.5)+7.);
    float bands = .5+.5*sin((lat*7. + (warp-.5)*1.1)*3.14159);
    float fine = fbm(vec3(q.x*4., q.y*30., q.z*4.));
    albedo = mix(vec3(.9,.8,.6), vec3(.74,.62,.42), smoothstep(.3,.8,bands));
    albedo = mix(albedo, vec3(.64,.54,.38), smoothstep(.55,.9,fine)*.4);
    albedo = mix(albedo, vec3(.55,.6,.68)*.9, smoothstep(.86,.98,lat)*.35);
    wrap = .25;
  }
  else if (uKind == 3) { // ---- Uranus
    float lat = p.y;
    float warp = fbm(vec3(p.x*2., p.y*6., p.z*2.)+3.);
    float b = .5+.5*sin(lat*9.+warp*1.4);
    albedo = mix(vec3(.5,.78,.83), vec3(.62,.87,.9), b*.6 + .2*abs(lat));
    wrap = .2;
  }
  else { // ---- Neptune
    float lat = p.y;
    vec3 q = p; float ang = uTime*.025*(1.+.5*cos(lat*9.));
    q.xz = mat2(cos(ang),-sin(ang),sin(ang),cos(ang))*q.xz;
    float warp = fbm(vec3(q.x*2.5, q.y*7., q.z*2.5)+1.);
    float b = .5+.5*sin(lat*11.+warp*2.);
    albedo = mix(vec3(.1,.22,.68), vec3(.24,.44,.92), b);
    float cir = smoothstep(.66,.84, fbm(vec3(q.x*5., q.y*20., q.z*5.)));
    albedo = mix(albedo, vec3(.85,.9,1.), cir*.55);
    float lon = atan(p.z,p.x);
    vec2 d = vec2(atan(sin(lon-2.),cos(lon-2.))/.3, (asin(clamp(lat,-1.,1.))+.35)/.16);
    albedo = mix(albedo, vec3(.03,.07,.3), (1.-smoothstep(.5,1.,length(d)))*.8);
    wrap = .2;
  }

  // Screen-space bump mapping from the procedural height field.
  if (bump > 0.) {
    vec3 dpx = dFdx(vW), dpy = dFdy(vW);
    float dhx = dFdx(h), dhy = dFdy(h);
    vec3 r1 = cross(dpy, N0), r2 = cross(N0, dpx);
    float det = dot(dpx, r1);
    vec3 grad = sign(det) * (dhx*r1 + dhy*r2);
    N = normalize(abs(det)*N0 - bump*.02*uRadius*grad);
  }

  float ndl = dot(N, L);
  float diff = pow(max((ndl + wrap)/(1.+wrap), 0.), .82) * smoothstep(-.06,.12,geo + wrap*.5);
  if (uDayNight < .5) diff = max(ndl, 0.)*.5 + .5;

  // Saturn's rings shade the planet.
  if (uRing > .5) {
    vec3 O = vW - uCenter; float dn = dot(L, uRingN);
    if (abs(dn) > 1e-3) {
      float t = -dot(O, uRingN)/dn;
      if (t > 0.) diff *= 1. - .92*ringDensity(length(O + L*t)/uRadius);
    }
  }

  float night = (uKind == 0 && uDayNight > .5) ? smoothstep(.1,-.14,geo) : 0.;
  vec3 col = albedo*(diff*vec3(1.,.985,.95)*1.08 + uAmbient) + emis*night;

  if (uKind == 0) { // ocean sun glint
    vec3 H = normalize(L+V);
    col += vec3(1.,.95,.85) * pow(max(dot(N0,H),0.), 420.) * water * .5 * diff;
  }

  float rim = pow(1. - max(dot(N0,V),0.), 3.);
  col += uAtmo * rim * uAtmoAmt * uAtmoOn * smoothstep(-.25,.5,geo);
  // Terminator: a thin warm twilight band between day and night.
  col += vec3(1.,.5,.22) * exp(-pow(geo/.12, 2.)) * .05 * uAtmoOn * (uKind == 0 ? 1. : .4);
  gl_FragColor = vec4(col, 1.);
}`

export const cloudFrag = /* glsl */ `
uniform vec3 uSun; uniform float uTime; uniform float uDayNight; uniform sampler2D uCloudMap; uniform float uTexOn;
varying vec3 vP; varying vec3 vN; varying vec3 vW;
${NOISE}
void main(){
  vec3 p = normalize(vP);
  vec3 N = normalize(vN);
  vec3 L = normalize(uSun - vW);
  float geo = uDayNight < .5 ? .8 : dot(N, L);
  float c = fbm(p*4.6 + fbm(p*9. + uTime*.006)*.8);
  float aProc = smoothstep(.55,.63,c) * (.45 + .55*smoothstep(.3,.65,fbm(p*22.)));
  float lat = asin(clamp(p.y,-1.,1.)), lon = atan(-p.z,p.x);
  float cTex = texture2D(uCloudMap, vec2(lon/6.2831853+.5, lat/3.1415926+.5)).r;
  float aTex = smoothstep(.18,.72,cTex);
  float a = mix(aProc, aTex, uTexOn);
  float diff = max(geo,0.)*smoothstep(-.05,.15,geo);
  vec3 col = vec3(.97,.98,1.)*(diff*1.05 + .012);
  col += vec3(1.,.55,.3) * exp(-pow(geo/.09,2.)) * .12;
  gl_FragColor = vec4(col, a*.92);
}`

export const atmoVert = /* glsl */ `
varying vec3 vN; varying vec3 vW;
void main(){
  vN = normalize(mat3(modelMatrix)*normal);
  vec4 w = modelMatrix*vec4(position,1.); vW = w.xyz;
  gl_Position = projectionMatrix*viewMatrix*w;
}`

// Outer glow: rendered on the back faces of a slightly larger sphere.
export const atmoFrag = /* glsl */ `
uniform vec3 uColor; uniform vec3 uSun; uniform vec3 uCenter; uniform float uInner; uniform float uStrength; uniform float uDayNight;
varying vec3 vN; varying vec3 vW;
void main(){
  vec3 V = normalize(cameraPosition - vW);
  float t = -dot(normalize(vN), V);
  float tl = sqrt(1. - uInner*uInner);
  float g = pow(smoothstep(0., tl, t), 2.4);
  vec3 nc = normalize(vW - uCenter);
  float geo = uDayNight < .5 ? .8 : dot(nc, normalize(uSun - vW));
  float sunf = smoothstep(-.3,.55,geo);
  vec3 col = mix(uColor, vec3(1.,.55,.3), smoothstep(.35,0.,geo)*.45) * g * sunf * uStrength;
  gl_FragColor = vec4(col, 1.);
}`

export const sunFrag = /* glsl */ `
uniform float uTime;
varying vec3 vP; varying vec3 vN; varying vec3 vW;
${NOISE}
void main(){
  vec3 p = normalize(vP);
  float t = uTime*.05;
  float g = fbm(p*8. + t), g2 = fbm(p*24. - t*1.3);
  float sp = smoothstep(.68,.8, fbm(p*3. + t*.3));
  vec3 col = mix(vec3(.85,.3,.04), vec3(1.,.62,.15), g);
  col = mix(col, vec3(1.,.95,.75), clamp(g2*g2*1.5,0.,1.));
  col *= 1. - .3*sp;
  float nv = max(dot(normalize(vN), normalize(cameraPosition - vW)), 0.);
  col *= mix(.4, 1., pow(nv, .55));
  gl_FragColor = vec4(col*1.2, 1.);
}`

export const ringVert = /* glsl */ `
varying vec3 vL; varying vec3 vW;
void main(){
  vL = position;
  vec4 w = modelMatrix*vec4(position,1.); vW = w.xyz;
  gl_Position = projectionMatrix*viewMatrix*w;
}`

export const ringFrag = /* glsl */ `
uniform vec3 uSun; uniform vec3 uCenter; uniform vec3 uRingN; uniform float uRadius;
varying vec3 vL; varying vec3 vW;
${NOISE}
void main(){
  float r = length(vL.xy);
  float d = ringDensity(r);
  float ang = atan(vL.y, vL.x);
  float n = vnoise(vec3(cos(ang), sin(ang), r*3.)*6.);
  float alpha = d*(.8 + .2*n);
  if (alpha < .01) discard;
  vec3 base = mix(vec3(.5,.42,.32), vec3(.9,.82,.68), fbm(vec3(r*26., 0., 1.)));
  vec3 L = normalize(uSun - vW);
  float lit = .5 + .5*abs(dot(uRingN, L));
  vec3 O = vW - uCenter;
  float b = dot(O, L), c = dot(O,O) - uRadius*uRadius, disc = b*b - c;
  float sh = b < 0. ? smoothstep(0., .03*uRadius*uRadius, disc) : 0.;
  lit *= 1. - .9*sh;
  gl_FragColor = vec4(base*lit, alpha);
}`

// Distant sky: faint nebula and a hint of galactic band. Follows the camera like a skybox.
export const skyFrag = /* glsl */ `
varying vec3 vP;
${NOISE}
void main(){
  vec3 d = normalize(vP);
  float n = fbm(d*2.2+4.), m = fbm(d*4.5-2.);
  vec3 col = vec3(.02,.022,.036);
  float neb = smoothstep(.45,.85,n)*smoothstep(.3,.8,m);
  col += mix(vec3(.05,.07,.18), vec3(.14,.07,.2), m)*neb*.75;
  float bd = dot(d, normalize(vec3(.3,1.,.2)));
  col += vec3(.05,.055,.085)*exp(-pow(bd*4.,2.))*(.4+fbm(d*10.));
  gl_FragColor = vec4(col, 1.);
}`

export const skyVert = /* glsl */ `
varying vec3 vP;
void main(){ vP = position; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }`

export const starVert = /* glsl */ `
attribute float aSize; attribute vec3 aColor; attribute float aPhase;
uniform float uTime; uniform float uPx; uniform float uTw;
varying vec3 vC;
void main(){
  vC = aColor;
  gl_PointSize = aSize*uPx*(1. + .18*uTw*sin(uTime*.7 + aPhase));
  gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.);
}`

export const starFrag = /* glsl */ `
varying vec3 vC;
void main(){
  float d = length(gl_PointCoord - .5);
  float a = smoothstep(.5,0.,d); a *= a;
  gl_FragColor = vec4(vC*a, a);
}`
