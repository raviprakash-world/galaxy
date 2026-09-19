const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/GalaxyMap-BOeMFMBo.js","assets/index-D4tc0hgD.js","assets/index-Jw6YfMYb.css","assets/painters-CPrjq-tH.js","assets/layout-B16OS1Q4.js","assets/DeepSpace-RDvZ8oo_.js"])))=>i.map(i=>d[i]);
import{_ as e,a as t,c as n,d as r,g as i,i as a,l as o,m as s,o as c,p as l,r as u,s as d,t as f}from"./index-D4tc0hgD.js";import{Bi as p,F as m,Jr as h,Na as g,Nr as _,P as v,Pr as y,Zi as b,_a as x,ar as S,jr as C,n as w,nr as T,oo as E,so as D,t as O,va as k}from"./painters-CPrjq-tH.js";import{_ as A,a as j,b as M,c as N,d as P,f as ee,g as F,h as I,l as te,m as L,o as ne,p as R,r as z,s as B,t as re,u as ie,v as V,y as ae}from"./layout-B16OS1Q4.js";var H=e(s(),1);function U(e,t){let n;return(...r)=>{window.clearTimeout(n),n=window.setTimeout(()=>e(...r),t)}}function oe({debounce:e,scroll:t,polyfill:n,offsetSize:r}={debounce:0,scroll:!1,offsetSize:!1}){let i=n||(typeof window>`u`?class{}:window.ResizeObserver);if(!i)throw Error(`This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills`);let[a,o]=(0,H.useState)({left:0,top:0,width:0,height:0,bottom:0,right:0,x:0,y:0}),s=(0,H.useRef)({element:null,scrollContainers:null,resizeObserver:null,lastBounds:a,orientationHandler:null}),c=e?typeof e==`number`?e:e.scroll:null,l=e?typeof e==`number`?e:e.resize:null,u=(0,H.useRef)(!1);(0,H.useEffect)(()=>(u.current=!0,()=>void(u.current=!1)));let[d,f,p]=(0,H.useMemo)(()=>{let e=()=>{if(!s.current.element)return;let{left:e,top:t,width:n,height:i,bottom:a,right:c,x:l,y:d}=s.current.element.getBoundingClientRect(),f={left:e,top:t,width:n,height:i,bottom:a,right:c,x:l,y:d};s.current.element instanceof HTMLElement&&r&&(f.height=s.current.element.offsetHeight,f.width=s.current.element.offsetWidth),Object.freeze(f),u.current&&!de(s.current.lastBounds,f)&&o(s.current.lastBounds=f)};return[e,l?U(e,l):e,c?U(e,c):e]},[o,r,c,l]);function m(){s.current.scrollContainers&&(s.current.scrollContainers.forEach(e=>e.removeEventListener(`scroll`,p,!0)),s.current.scrollContainers=null),s.current.resizeObserver&&(s.current.resizeObserver.disconnect(),s.current.resizeObserver=null),s.current.orientationHandler&&(`orientation`in screen&&`removeEventListener`in screen.orientation?screen.orientation.removeEventListener(`change`,s.current.orientationHandler):`onorientationchange`in window&&window.removeEventListener(`orientationchange`,s.current.orientationHandler))}function h(){s.current.element&&(s.current.resizeObserver=new i(p),s.current.resizeObserver.observe(s.current.element),t&&s.current.scrollContainers&&s.current.scrollContainers.forEach(e=>e.addEventListener(`scroll`,p,{capture:!0,passive:!0})),s.current.orientationHandler=()=>{p()},`orientation`in screen&&`addEventListener`in screen.orientation?screen.orientation.addEventListener(`change`,s.current.orientationHandler):`onorientationchange`in window&&window.addEventListener(`orientationchange`,s.current.orientationHandler))}return ce(p,!!t),se(f),(0,H.useEffect)(()=>{m(),h()},[t,p,f]),(0,H.useEffect)(()=>m,[]),[e=>{!e||e===s.current.element||(m(),s.current.element=e,s.current.scrollContainers=le(e),h())},a,d]}function se(e){(0,H.useEffect)(()=>{let t=e;return window.addEventListener(`resize`,t),()=>void window.removeEventListener(`resize`,t)},[e])}function ce(e,t){(0,H.useEffect)(()=>{if(t){let t=e;return window.addEventListener(`scroll`,t,{capture:!0,passive:!0}),()=>void window.removeEventListener(`scroll`,t,!0)}},[e,t])}function le(e){let t=[];if(!e||e===document.body)return t;let{overflow:n,overflowX:r,overflowY:i}=window.getComputedStyle(e);return[n,r,i].some(e=>e===`auto`||e===`scroll`)&&t.push(e),[...t,...le(e.parentElement)]}var ue=[`x`,`y`,`top`,`bottom`,`left`,`right`,`width`,`height`],de=(e,t)=>ue.every(n=>e[n]===t[n]),W=r();l();function fe({ref:e,children:t,fallback:n,resize:r,style:i,gl:a,events:o=N,eventSource:s,eventPrefix:c,shadows:l,linear:u,flat:d,legacy:f,orthographic:p,frameloop:m,dpr:h,performance:g,raycaster:_,camera:v,scene:y,onPointerMissed:b,onCreated:x,...S}){H.useMemo(()=>ie(M),[]);let C=R(),[w,T]=oe({scroll:!0,debounce:{scroll:50,resize:0},...r}),E=H.useRef(null),D=H.useRef(null);H.useImperativeHandle(e,()=>E.current);let O=F(b),[k,A]=H.useState(!1),[j,L]=H.useState(!1);if(k)throw k;if(j)throw j;let z=H.useRef(null);return I(()=>{let e=E.current;if(T.width>0&&T.height>0&&e){z.current||=te(e);async function n(){await z.current.configure({gl:a,scene:y,events:o,shadows:l,linear:u,flat:d,legacy:f,orthographic:p,frameloop:m,dpr:h,performance:g,raycaster:_,camera:v,size:T,onPointerMissed:(...e)=>O.current==null?void 0:O.current(...e),onCreated:e=>{e.events.connect==null||e.events.connect(s?P(s)?s.current:s:D.current),c&&e.setEvents({compute:(e,t)=>{let n=e[c+`X`],r=e[c+`Y`];t.pointer.set(n/t.size.width*2-1,-(r/t.size.height)*2+1),t.raycaster.setFromCamera(t.pointer,t.camera)}}),x?.(e)}}),z.current.render((0,W.jsx)(C,{children:(0,W.jsx)(B,{set:L,children:(0,W.jsx)(H.Suspense,{fallback:(0,W.jsx)(ne,{set:A}),children:t??null})})}))}n()}}),H.useEffect(()=>{let e=E.current;if(e)return()=>ee(e)},[]),(0,W.jsx)(`div`,{ref:D,style:{position:`relative`,width:`100%`,height:`100%`,overflow:`hidden`,pointerEvents:s?`none`:`auto`,...i},...S,children:(0,W.jsx)(`div`,{ref:w,style:{width:`100%`,height:`100%`},children:(0,W.jsx)(`canvas`,{ref:E,style:{display:`block`},children:n})})})}function pe(e){return(0,W.jsx)(V,{children:(0,W.jsx)(fe,{...e})})}var me=Object.defineProperty,he=(e,t,n)=>t in e?me(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ge=(e,t,n)=>(he(e,typeof t==`symbol`?t:t+``,n),n),_e=class{constructor(){ge(this,`_listeners`)}addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let n=this._listeners[e];if(n!==void 0){let e=n.indexOf(t);e!==-1&&n.splice(e,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let t=this._listeners[e.type];if(t!==void 0){e.target=this;let n=t.slice(0);for(let t=0,r=n.length;t<r;t++)n[t].call(this,e);e.target=null}}},ve=Object.defineProperty,ye=(e,t,n)=>t in e?ve(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,G=(e,t,n)=>(ye(e,typeof t==`symbol`?t:t+``,n),n),K=new p,be=new y,xe=Math.cos(Math.PI/180*70),Se=(e,t)=>(e%t+t)%t,Ce=class extends _e{constructor(e,t){super(),G(this,`object`),G(this,`domElement`),G(this,`enabled`,!0),G(this,`target`,new D),G(this,`minDistance`,0),G(this,`maxDistance`,1/0),G(this,`minZoom`,0),G(this,`maxZoom`,1/0),G(this,`minPolarAngle`,0),G(this,`maxPolarAngle`,Math.PI),G(this,`minAzimuthAngle`,-1/0),G(this,`maxAzimuthAngle`,1/0),G(this,`enableDamping`,!1),G(this,`dampingFactor`,.05),G(this,`enableZoom`,!0),G(this,`zoomSpeed`,1),G(this,`enableRotate`,!0),G(this,`rotateSpeed`,1),G(this,`enablePan`,!0),G(this,`panSpeed`,1),G(this,`screenSpacePanning`,!0),G(this,`keyPanSpeed`,7),G(this,`zoomToCursor`,!1),G(this,`autoRotate`,!1),G(this,`autoRotateSpeed`,2),G(this,`reverseOrbit`,!1),G(this,`reverseHorizontalOrbit`,!1),G(this,`reverseVerticalOrbit`,!1),G(this,`keys`,{LEFT:`ArrowLeft`,UP:`ArrowUp`,RIGHT:`ArrowRight`,BOTTOM:`ArrowDown`}),G(this,`mouseButtons`,{LEFT:T.ROTATE,MIDDLE:T.DOLLY,RIGHT:T.PAN}),G(this,`touches`,{ONE:g.ROTATE,TWO:g.DOLLY_PAN}),G(this,`target0`),G(this,`position0`),G(this,`zoom0`),G(this,`_domElementKeyEvents`,null),G(this,`getPolarAngle`),G(this,`getAzimuthalAngle`),G(this,`setPolarAngle`),G(this,`setAzimuthalAngle`),G(this,`getDistance`),G(this,`getZoomScale`),G(this,`listenToKeyEvents`),G(this,`stopListenToKeyEvents`),G(this,`saveState`),G(this,`reset`),G(this,`update`),G(this,`connect`),G(this,`dispose`),G(this,`dollyIn`),G(this,`dollyOut`),G(this,`getScale`),G(this,`setScale`),this.object=e,this.domElement=t,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=()=>l.phi,this.getAzimuthalAngle=()=>l.theta,this.setPolarAngle=e=>{let t=Se(e,2*Math.PI),r=l.phi;r<0&&(r+=2*Math.PI),t<0&&(t+=2*Math.PI);let i=Math.abs(t-r);2*Math.PI-i<i&&(t<r?t+=2*Math.PI:r+=2*Math.PI),u.phi=t-r,n.update()},this.setAzimuthalAngle=e=>{let t=Se(e,2*Math.PI),r=l.theta;r<0&&(r+=2*Math.PI),t<0&&(t+=2*Math.PI);let i=Math.abs(t-r);2*Math.PI-i<i&&(t<r?t+=2*Math.PI:r+=2*Math.PI),u.theta=t-r,n.update()},this.getDistance=()=>n.object.position.distanceTo(n.target),this.listenToKeyEvents=e=>{e.addEventListener(`keydown`,X),this._domElementKeyEvents=e},this.stopListenToKeyEvents=()=>{this._domElementKeyEvents.removeEventListener(`keydown`,X),this._domElementKeyEvents=null},this.saveState=()=>{n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=()=>{n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(r),n.update(),s=o.NONE},this.update=(()=>{let t=new D,i=new D(0,1,0),a=new h().setFromUnitVectors(e.up,i),p=a.clone().invert(),m=new D,g=new h,v=2*Math.PI;return function(){let h=n.object.position;a.setFromUnitVectors(e.up,i),p.copy(a).invert(),t.copy(h).sub(n.target),t.applyQuaternion(a),l.setFromVector3(t),n.autoRotate&&s===o.NONE&&I(ee()),n.enableDamping?(l.theta+=u.theta*n.dampingFactor,l.phi+=u.phi*n.dampingFactor):(l.theta+=u.theta,l.phi+=u.phi);let y=n.minAzimuthAngle,b=n.maxAzimuthAngle;isFinite(y)&&isFinite(b)&&(y<-Math.PI?y+=v:y>Math.PI&&(y-=v),b<-Math.PI?b+=v:b>Math.PI&&(b-=v),y<=b?l.theta=Math.max(y,Math.min(b,l.theta)):l.theta=l.theta>(y+b)/2?Math.max(y,l.theta):Math.min(b,l.theta)),l.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,l.phi)),l.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(f,n.dampingFactor):n.target.add(f),n.zoomToCursor&&M||n.object.isOrthographicCamera?l.radius=V(l.radius):l.radius=V(l.radius*d),t.setFromSpherical(l),t.applyQuaternion(p),h.copy(n.target).add(t),n.object.matrixAutoUpdate||n.object.updateMatrix(),n.object.lookAt(n.target),n.enableDamping===!0?(u.theta*=1-n.dampingFactor,u.phi*=1-n.dampingFactor,f.multiplyScalar(1-n.dampingFactor)):(u.set(0,0,0),f.set(0,0,0));let x=!1;if(n.zoomToCursor&&M){let r=null;if(n.object instanceof _&&n.object.isPerspectiveCamera){let e=t.length();r=V(e*d);let i=e-r;n.object.position.addScaledVector(A,i),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){let e=new D(j.x,j.y,0);e.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/d)),n.object.updateProjectionMatrix(),x=!0;let i=new D(j.x,j.y,0);i.unproject(n.object),n.object.position.sub(i).add(e),n.object.updateMatrixWorld(),r=t.length()}else console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.`),n.zoomToCursor=!1;r!==null&&(n.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(r).add(n.object.position):(K.origin.copy(n.object.position),K.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(K.direction))<xe?e.lookAt(n.target):(be.setFromNormalAndCoplanarPoint(n.object.up,n.target),K.intersectPlane(be,n.target))))}else n.object instanceof C&&n.object.isOrthographicCamera&&(x=d!==1,x&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/d)),n.object.updateProjectionMatrix()));return d=1,M=!1,x||m.distanceToSquared(n.object.position)>c||8*(1-g.dot(n.object.quaternion))>c?(n.dispatchEvent(r),m.copy(n.object.position),g.copy(n.object.quaternion),x=!1,!0):!1}})(),this.connect=e=>{n.domElement=e,n.domElement.style.touchAction=`none`,n.domElement.addEventListener(`contextmenu`,Q),n.domElement.addEventListener(`pointerdown`,Ce),n.domElement.addEventListener(`pointercancel`,J),n.domElement.addEventListener(`wheel`,Te)},this.dispose=()=>{var e,t,r,i,a,o;n.domElement&&(n.domElement.style.touchAction=`auto`),(e=n.domElement)==null||e.removeEventListener(`contextmenu`,Q),(t=n.domElement)==null||t.removeEventListener(`pointerdown`,Ce),(r=n.domElement)==null||r.removeEventListener(`pointercancel`,J),(i=n.domElement)==null||i.removeEventListener(`wheel`,Te),(a=n.domElement)==null||a.ownerDocument.removeEventListener(`pointermove`,q),(o=n.domElement)==null||o.ownerDocument.removeEventListener(`pointerup`,J),n._domElementKeyEvents!==null&&n._domElementKeyEvents.removeEventListener(`keydown`,X)};let n=this,r={type:`change`},i={type:`start`},a={type:`end`},o={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},s=o.NONE,c=1e-6,l=new k,u=new k,d=1,f=new D,p=new E,m=new E,v=new E,y=new E,b=new E,x=new E,S=new E,w=new E,O=new E,A=new D,j=new E,M=!1,N=[],P={};function ee(){return 2*Math.PI/60/60*n.autoRotateSpeed}function F(){return .95**n.zoomSpeed}function I(e){n.reverseOrbit||n.reverseHorizontalOrbit?u.theta+=e:u.theta-=e}function te(e){n.reverseOrbit||n.reverseVerticalOrbit?u.phi+=e:u.phi-=e}let L=(()=>{let e=new D;return function(t,n){e.setFromMatrixColumn(n,0),e.multiplyScalar(-t),f.add(e)}})(),ne=(()=>{let e=new D;return function(t,r){n.screenSpacePanning===!0?e.setFromMatrixColumn(r,1):(e.setFromMatrixColumn(r,0),e.crossVectors(n.object.up,e)),e.multiplyScalar(t),f.add(e)}})(),R=(()=>{let e=new D;return function(t,r){let i=n.domElement;if(i&&n.object instanceof _&&n.object.isPerspectiveCamera){let a=n.object.position;e.copy(a).sub(n.target);let o=e.length();o*=Math.tan(n.object.fov/2*Math.PI/180),L(2*t*o/i.clientHeight,n.object.matrix),ne(2*r*o/i.clientHeight,n.object.matrix)}else i&&n.object instanceof C&&n.object.isOrthographicCamera?(L(t*(n.object.right-n.object.left)/n.object.zoom/i.clientWidth,n.object.matrix),ne(r*(n.object.top-n.object.bottom)/n.object.zoom/i.clientHeight,n.object.matrix)):(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.`),n.enablePan=!1)}})();function z(e){n.object instanceof _&&n.object.isPerspectiveCamera||n.object instanceof C&&n.object.isOrthographicCamera?d=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),n.enableZoom=!1)}function B(e){z(d/e)}function re(e){z(d*e)}function ie(e){if(!n.zoomToCursor||!n.domElement)return;M=!0;let t=n.domElement.getBoundingClientRect(),r=e.clientX-t.left,i=e.clientY-t.top,a=t.width,o=t.height;j.x=r/a*2-1,j.y=-(i/o)*2+1,A.set(j.x,j.y,1).unproject(n.object).sub(n.object.position).normalize()}function V(e){return Math.max(n.minDistance,Math.min(n.maxDistance,e))}function ae(e){p.set(e.clientX,e.clientY)}function H(e){ie(e),S.set(e.clientX,e.clientY)}function U(e){y.set(e.clientX,e.clientY)}function oe(e){m.set(e.clientX,e.clientY),v.subVectors(m,p).multiplyScalar(n.rotateSpeed);let t=n.domElement;t&&(I(2*Math.PI*v.x/t.clientHeight),te(2*Math.PI*v.y/t.clientHeight)),p.copy(m),n.update()}function se(e){w.set(e.clientX,e.clientY),O.subVectors(w,S),O.y>0?B(F()):O.y<0&&re(F()),S.copy(w),n.update()}function ce(e){b.set(e.clientX,e.clientY),x.subVectors(b,y).multiplyScalar(n.panSpeed),R(x.x,x.y),y.copy(b),n.update()}function le(e){ie(e),e.deltaY<0?re(F()):e.deltaY>0&&B(F()),n.update()}function ue(e){let t=!1;switch(e.code){case n.keys.UP:R(0,n.keyPanSpeed),t=!0;break;case n.keys.BOTTOM:R(0,-n.keyPanSpeed),t=!0;break;case n.keys.LEFT:R(n.keyPanSpeed,0),t=!0;break;case n.keys.RIGHT:R(-n.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),n.update())}function de(){if(N.length==1)p.set(N[0].pageX,N[0].pageY);else{let e=.5*(N[0].pageX+N[1].pageX),t=.5*(N[0].pageY+N[1].pageY);p.set(e,t)}}function W(){if(N.length==1)y.set(N[0].pageX,N[0].pageY);else{let e=.5*(N[0].pageX+N[1].pageX),t=.5*(N[0].pageY+N[1].pageY);y.set(e,t)}}function fe(){let e=N[0].pageX-N[1].pageX,t=N[0].pageY-N[1].pageY,n=Math.sqrt(e*e+t*t);S.set(0,n)}function pe(){n.enableZoom&&fe(),n.enablePan&&W()}function me(){n.enableZoom&&fe(),n.enableRotate&&de()}function he(e){if(N.length==1)m.set(e.pageX,e.pageY);else{let t=Ae(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);m.set(n,r)}v.subVectors(m,p).multiplyScalar(n.rotateSpeed);let t=n.domElement;t&&(I(2*Math.PI*v.x/t.clientHeight),te(2*Math.PI*v.y/t.clientHeight)),p.copy(m)}function ge(e){if(N.length==1)b.set(e.pageX,e.pageY);else{let t=Ae(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);b.set(n,r)}x.subVectors(b,y).multiplyScalar(n.panSpeed),R(x.x,x.y),y.copy(b)}function _e(e){let t=Ae(e),r=e.pageX-t.x,i=e.pageY-t.y,a=Math.sqrt(r*r+i*i);w.set(0,a),O.set(0,(w.y/S.y)**+n.zoomSpeed),B(O.y),S.copy(w)}function ve(e){n.enableZoom&&_e(e),n.enablePan&&ge(e)}function ye(e){n.enableZoom&&_e(e),n.enableRotate&&he(e)}function Ce(e){var t,r;n.enabled!==!1&&(N.length===0&&((t=n.domElement)==null||t.ownerDocument.addEventListener(`pointermove`,q),(r=n.domElement)==null||r.ownerDocument.addEventListener(`pointerup`,J)),De(e),e.pointerType===`touch`?Ee(e):we(e))}function q(e){n.enabled!==!1&&(e.pointerType===`touch`?Z(e):Y(e))}function J(e){var t,r,i;Oe(e),N.length===0&&((t=n.domElement)==null||t.releasePointerCapture(e.pointerId),(r=n.domElement)==null||r.ownerDocument.removeEventListener(`pointermove`,q),(i=n.domElement)==null||i.ownerDocument.removeEventListener(`pointerup`,J)),n.dispatchEvent(a),s=o.NONE}function we(e){let t;switch(e.button){case 0:t=n.mouseButtons.LEFT;break;case 1:t=n.mouseButtons.MIDDLE;break;case 2:t=n.mouseButtons.RIGHT;break;default:t=-1}switch(t){case T.DOLLY:if(n.enableZoom===!1)return;H(e),s=o.DOLLY;break;case T.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(n.enablePan===!1)return;U(e),s=o.PAN}else{if(n.enableRotate===!1)return;ae(e),s=o.ROTATE}break;case T.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(n.enableRotate===!1)return;ae(e),s=o.ROTATE}else{if(n.enablePan===!1)return;U(e),s=o.PAN}break;default:s=o.NONE}s!==o.NONE&&n.dispatchEvent(i)}function Y(e){if(n.enabled!==!1)switch(s){case o.ROTATE:if(n.enableRotate===!1)return;oe(e);break;case o.DOLLY:if(n.enableZoom===!1)return;se(e);break;case o.PAN:if(n.enablePan===!1)return;ce(e)}}function Te(e){n.enabled===!1||n.enableZoom===!1||s!==o.NONE&&s!==o.ROTATE||(e.preventDefault(),n.dispatchEvent(i),le(e),n.dispatchEvent(a))}function X(e){n.enabled!==!1&&n.enablePan!==!1&&ue(e)}function Ee(e){switch(ke(e),N.length){case 1:switch(n.touches.ONE){case g.ROTATE:if(n.enableRotate===!1)return;de(),s=o.TOUCH_ROTATE;break;case g.PAN:if(n.enablePan===!1)return;W(),s=o.TOUCH_PAN;break;default:s=o.NONE}break;case 2:switch(n.touches.TWO){case g.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;pe(),s=o.TOUCH_DOLLY_PAN;break;case g.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;me(),s=o.TOUCH_DOLLY_ROTATE;break;default:s=o.NONE}break;default:s=o.NONE}s!==o.NONE&&n.dispatchEvent(i)}function Z(e){switch(ke(e),s){case o.TOUCH_ROTATE:if(n.enableRotate===!1)return;he(e),n.update();break;case o.TOUCH_PAN:if(n.enablePan===!1)return;ge(e),n.update();break;case o.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;ve(e),n.update();break;case o.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;ye(e),n.update();break;default:s=o.NONE}}function Q(e){n.enabled!==!1&&e.preventDefault()}function De(e){N.push(e)}function Oe(e){delete P[e.pointerId];for(let t=0;t<N.length;t++)if(N[t].pointerId==e.pointerId){N.splice(t,1);return}}function ke(e){let t=P[e.pointerId];t===void 0&&(t=new E,P[e.pointerId]=t),t.set(e.pageX,e.pageY)}function Ae(e){let t=e.pointerId===N[0].pointerId?N[1]:N[0];return P[t.pointerId]}this.dollyIn=(e=F())=>{re(e),n.update()},this.dollyOut=(e=F())=>{B(e),n.update()},this.getScale=()=>d,this.setScale=e=>{z(e),n.update()},this.getZoomScale=()=>F(),t!==void 0&&this.connect(t),this.update()}},q=H.forwardRef(({makeDefault:e,camera:t,regress:n,domElement:r,enableDamping:i=!0,keyEvents:a=!1,onChange:o,onStart:s,onEnd:c,...l},u)=>{let d=A(e=>e.invalidate),f=A(e=>e.camera),p=A(e=>e.gl),m=A(e=>e.events),h=A(e=>e.setEvents),g=A(e=>e.set),_=A(e=>e.get),v=A(e=>e.performance),y=t||f,b=r||m.connected||p.domElement,x=H.useMemo(()=>new Ce(y),[y]);return L(()=>{x.enabled&&x.update()},-1),H.useEffect(()=>(a&&x.connect(a===!0?b:a),x.connect(b),()=>void x.dispose()),[a,b,n,x,d]),H.useEffect(()=>{let e=e=>{d(),n&&v.regress(),o&&o(e)},t=e=>{s&&s(e)},r=e=>{c&&c(e)};return x.addEventListener(`change`,e),x.addEventListener(`start`,t),x.addEventListener(`end`,r),()=>{x.removeEventListener(`start`,t),x.removeEventListener(`end`,r),x.removeEventListener(`change`,e)}},[o,s,c,x,d,h]),H.useEffect(()=>{if(e){let e=_().controls;return g({controls:x}),()=>g({controls:e})}},[e,x]),H.createElement(`primitive`,ae({ref:u,object:x,enableDamping:i},l))}),J=(0,H.createContext)(null);function we({iterations:e=10,ms:t=250,threshold:n=.75,step:r=.1,factor:i=.5,flipflops:a=1/0,bounds:o=e=>e>100?[60,100]:[40,60],onIncline:s,onDecline:c,onChange:l,onFallback:u,children:d}){let[f,p]=(0,H.useState)(()=>({fps:0,index:0,factor:i,flipped:0,refreshrate:0,fallback:!1,frames:[],averages:[],subscriptions:new Map,subscribe:e=>{let t=Symbol();return f.subscriptions.set(t,e.current),()=>void f.subscriptions.delete(t)}})),m=0;return L(()=>{let{frames:i,averages:d}=f;if(!f.fallback&&d.length<e){i.push(performance.now());let p=i[i.length-1]-i[0];if(p>=t){if(f.fps=Math.round(i.length/p*1e3*1)/1,f.refreshrate=Math.max(f.refreshrate,f.fps),d[f.index++%e]=f.fps,d.length===e){let[t,i]=o(f.refreshrate),p=d.filter(e=>e>=i),h=d.filter(e=>e<t);p.length>e*n&&(f.factor=Math.min(1,f.factor+r),f.flipped++,s&&s(f),f.subscriptions.forEach(e=>e.onIncline&&e.onIncline(f))),h.length>e*n&&(f.factor=Math.max(0,f.factor-r),f.flipped++,c&&c(f),f.subscriptions.forEach(e=>e.onDecline&&e.onDecline(f))),m!==f.factor&&(m=f.factor,l&&l(f),f.subscriptions.forEach(e=>e.onChange&&e.onChange(f))),f.flipped>a&&!f.fallback&&(f.fallback=!0,u&&u(f),f.subscriptions.forEach(e=>e.onFallback&&e.onFallback(f))),f.averages=[]}f.frames=[]}}}),H.createElement(J.Provider,{value:f},d)}var Y=new Map,Te=new D,X=(0,H.forwardRef)(function({id:e,name:t,radius:n,children:r,position:i,selected:a,onSelect:s},c){let l=(0,H.useRef)(null),u=(0,H.useRef)(null),d=o(t=>t.hovered===e),f=o(e=>e.set);return(0,H.useEffect)(()=>(Y.set(e,l.current),()=>{Y.delete(e)}),[e]),L(({camera:e})=>{if(!u.current)return;let t=e.position.distanceTo(l.current.getWorldPosition(Te))<n*6.5;u.current.style.opacity=t?`0`:``,u.current.style.pointerEvents=t?`none`:``}),(0,W.jsxs)(`group`,{ref:e=>{l.current=e,typeof c==`function`?c(e):c&&(c.current=e)},position:i,children:[r,(0,W.jsxs)(`mesh`,{onPointerOver:t=>{t.stopPropagation(),f({hovered:e})},onPointerOut:()=>f({hovered:null}),onClick:t=>{t.stopPropagation(),s(e)},children:[(0,W.jsx)(`sphereGeometry`,{args:[Math.max(n*1.25,.9),12,8]}),(0,W.jsx)(`meshBasicMaterial`,{visible:!1})]}),(0,W.jsx)(j,{center:!0,zIndexRange:[20,0],style:{pointerEvents:`none`},children:(0,W.jsx)(`div`,{ref:u,className:`obj-label`,"data-hover":d,"data-selected":a,children:(0,W.jsxs)(`button`,{type:`button`,onClick:()=>s(e),"aria-label":`Focus ${t}`,"aria-pressed":a,children:[(0,W.jsx)(`span`,{className:`obj-dot`}),t]})})})]})}),Ee={fly:()=>{}},Z=(e,t,n)=>new D(e,t,n).normalize(),Q=new D,De=new D;function Oe(e){let{view:t,selected:n,deepId:r}=o.getState(),i=e.width/e.height,a=i<1;if(t===`hero`)return{target:new D,dist:a?12.5:9,dir:Z(0,.05,1),arriving:!0};if(t===`galaxy`)return{target:new D,dist:a?112:100,dir:Z(0,.72,.69),arriving:!0};if(t===`deep`){let e=u(r);if(e){let t=z(e);return{follow:e.id,target:t,dist:e.size*2.3+2,dir:Q.copy(t).negate().normalize().add(De.set(0,.25,0)).normalize().clone(),arriving:!0}}return{target:new D,dist:a?150:96,dir:Z(0,.55,.83),arriving:!0}}let s=c(n);if(s){let e=Y.get(s.id)?.getWorldPosition(new D)??new D,n=Q.copy(e).setY(0).normalize(),r=s.id===`sun`?Z(.3,.2,1):De.copy(n).multiplyScalar(-.5).addScaledVector(new D(-n.z,0,n.x),.8).add(new D(0,.28,0)).normalize().clone(),i=s.visual.radius*(s.visual.rings?1.75:1),o=t===`planet`?3:4.2;return{follow:s.id,target:e,dist:i*o*(a?1.4:1),dir:r,arriving:!0}}let l=Math.min(112/(.414*Math.min(i,1.7)),d.mobile?340:200);return{target:new D,dist:l,dir:Z(0,.62,.78),arriving:!0}}function ke(e){return e===`galaxy`?{target:re.clone(),dist:3,dir:Z(0,.3,1)}:e===`hero`?{target:new D,dist:34,dir:Z(0,.05,1)}:e===`deep`?{target:new D,dist:300,dir:Z(0,.55,.83)}:{target:new D,dist:420,dir:Z(0,.62,.78)}}function Ae(){let e=(0,H.useRef)(null),t=(0,H.useRef)(null),r=(0,H.useRef)(null),i=(0,H.useRef)({x:0,y:0}),{camera:a,size:s}=A(),l=o(e=>e.view),u=o(e=>e.selected),d=o(e=>e.deepId),f=o(e=>e.resetTick),p=o(e=>e.reduced);(0,H.useEffect)(()=>{let i=e.current;if(!i)return;let o=n(l);if(r.current!==o){let e=ke(l);i.target.copy(e.target),a.position.copy(e.target).addScaledVector(e.dir,e.dist),i.update(),r.current=o}t.current=Oe(s)},[l,u,d,f,a,s.width<768]),(0,H.useEffect)(()=>{Ee.fly=(e,n)=>{t.current={target:e.clone(),dist:n,arriving:!0}}},[]),(0,H.useEffect)(()=>{let n=e.current;if(!n)return;let r=()=>{let e=t.current;e&&(e.follow?e.arriving=!1:t.current=null)};return n.addEventListener(`start`,r),()=>n.removeEventListener(`start`,r)}),L((n,r)=>{let c=e.current;if(!c)return;r=Math.min(r,.35);let f=o.getState(),m=1-Math.exp(-r*(p?12:2.6)),h=s.width<768,g=0,_=0;l===`hero`?h?_=.17:g=.22:(u||d)&&(h?_=-.2:g=-.14);let v=i.current;v.x+=(g*s.width-v.x)*m,v.y+=(_*s.height-v.y)*m,Math.abs(v.x)+Math.abs(v.y)>.5?a.setViewOffset(s.width,s.height,-v.x,-v.y,s.width,s.height):a.view?.enabled&&a.clearViewOffset(),f.fade?.on&&(Q.copy(a.position).sub(c.target),Q.multiplyScalar(1+r*(p?0:.9)),a.position.copy(c.target).add(Q));let y=t.current;if(y){let e=y.follow?Y.get(y.follow):void 0,n=e?e.getWorldPosition(De):y.target;if(y.arriving){Q.copy(a.position).sub(c.target);let e=Q.length();Q.normalize(),y.dir&&Q.lerp(y.dir,m).normalize(),e+=(y.dist-e)*m,c.target.lerp(n,m),a.position.copy(c.target).addScaledVector(Q,e),c.target.distanceTo(n)<.02*y.dist&&Math.abs(e-y.dist)<.02*y.dist&&(y.arriving=!1,y.follow||(t.current=null))}else y.follow&&(Q.copy(n).sub(c.target),c.target.add(Q),a.position.add(Q))}c.update()});let m=!!(u||d),h=c(u),g=l===`hero`?5:h?h.visual.radius*1.3:l===`galaxy`?1.5:l===`deep`?3:8;return(0,W.jsx)(q,{ref:e,makeDefault:!0,enableDamping:!0,dampingFactor:.08,rotateSpeed:.55,zoomSpeed:.8,panSpeed:.7,screenSpacePanning:!0,enablePan:l!==`hero`&&!m,minDistance:g,maxDistance:l===`hero`?20:l===`galaxy`?220:l===`deep`?260:420})}var $=`
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
`,je=`
varying vec3 vP; varying vec3 vN; varying vec3 vW;
void main(){
  vP = position;
  vN = normalize(mat3(modelMatrix)*normal);
  vec4 w = modelMatrix*vec4(position,1.);
  vW = w.xyz;
  gl_Position = projectionMatrix*viewMatrix*w;
}`,Me=`
uniform int uKind; uniform vec3 uSun; uniform float uTime; uniform sampler2D uMask;
uniform vec3 uAtmo; uniform float uAtmoAmt; uniform float uAmbient;
uniform vec3 uCenter; uniform vec3 uRingN; uniform float uRadius; uniform float uRing;
uniform float uFocus; uniform float uLights; uniform float uDayNight; uniform float uAtmoOn;
varying vec3 vP; varying vec3 vN; varying vec3 vW;
${$}
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
    float m = texture2D(uMask, vec2(lon/6.2831853+.5, lat/3.1415926+.5)).r;
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
    if (uFocus > .5 && uFocus < 1.5) { albedo = mix(albedo*.3, albedo*1.25, isLand); albedo += vec3(.3,.45,1.)*coast*.55; }
    if (uFocus > 1.5) { albedo = mix(albedo*1.55, albedo*.3, isLand); albedo += vec3(.3,.45,1.)*coast*.55; }
    // city lights: warm specks clustered in temperate latitudes
    float pop = smoothstep(.6,.8, fbm(p*9.+31.)) * smoothstep(.9,.6,la);
    float sp = smoothstep(.9,1.08, vnoise(p*110.) + .25*vnoise(p*260.));
    emis = vec3(1.,.72,.38) * isLand * (1.-ice) * (pop*sp*1.3 + pop*.03) * uLights;
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
}`,Ne=`
uniform vec3 uSun; uniform float uTime; uniform float uDayNight;
varying vec3 vP; varying vec3 vN; varying vec3 vW;
${$}
void main(){
  vec3 p = normalize(vP);
  vec3 N = normalize(vN);
  vec3 L = normalize(uSun - vW);
  float geo = uDayNight < .5 ? .8 : dot(N, L);
  float c = fbm(p*4.6 + fbm(p*9. + uTime*.006)*.8);
  float a = smoothstep(.55,.63,c) * (.45 + .55*smoothstep(.3,.65,fbm(p*22.)));
  float diff = max(geo,0.)*smoothstep(-.05,.15,geo);
  vec3 col = vec3(.97,.98,1.)*(diff*1.05 + .012);
  col += vec3(1.,.55,.3) * exp(-pow(geo/.09,2.)) * .12;
  gl_FragColor = vec4(col, a*.92);
}`,Pe=`
varying vec3 vN; varying vec3 vW;
void main(){
  vN = normalize(mat3(modelMatrix)*normal);
  vec4 w = modelMatrix*vec4(position,1.); vW = w.xyz;
  gl_Position = projectionMatrix*viewMatrix*w;
}`,Fe=`
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
}`,Ie=`
uniform float uTime;
varying vec3 vP; varying vec3 vN; varying vec3 vW;
${$}
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
}`,Le=`
varying vec3 vL; varying vec3 vW;
void main(){
  vL = position;
  vec4 w = modelMatrix*vec4(position,1.); vW = w.xyz;
  gl_Position = projectionMatrix*viewMatrix*w;
}`,Re=`
uniform vec3 uSun; uniform vec3 uCenter; uniform vec3 uRingN; uniform float uRadius;
varying vec3 vL; varying vec3 vW;
${$}
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
}`,ze=`
varying vec3 vP;
${$}
void main(){
  vec3 d = normalize(vP);
  float n = fbm(d*2.2+4.), m = fbm(d*4.5-2.);
  vec3 col = vec3(.02,.022,.036);
  float neb = smoothstep(.45,.85,n)*smoothstep(.3,.8,m);
  col += mix(vec3(.05,.07,.18), vec3(.14,.07,.2), m)*neb*.75;
  float bd = dot(d, normalize(vec3(.3,1.,.2)));
  col += vec3(.05,.055,.085)*exp(-pow(bd*4.,2.))*(.4+fbm(d*10.));
  gl_FragColor = vec4(col, 1.);
}`,Be=`
varying vec3 vP;
void main(){ vP = position; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }`,Ve=`
attribute float aSize; attribute vec3 aColor; attribute float aPhase;
uniform float uTime; uniform float uPx; uniform float uTw;
varying vec3 vC;
void main(){
  vC = aColor;
  gl_PointSize = aSize*uPx*(1. + .18*uTw*sin(uTime*.7 + aPhase));
  gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.);
}`,He=`
varying vec3 vC;
void main(){
  float d = length(gl_PointCoord - .5);
  float a = smoothstep(.5,0.,d); a *= a;
  gl_FragColor = vec4(vC*a, a);
}`,Ue=new x(1,d.segs,d.segs/2),We=new b(1.24,2.27,160,1),Ge={OCT:d.octaves},Ke=null,qe=null,Je=new h;function Ye({body:e,radius:t,sun:n,spinScale:r=1,parallax:i=!1,ambient:a=.025}){let s=e.visual,c=t??s.radius,l=e.id===`earth`,u=(0,H.useRef)(null),d=(0,H.useRef)(null),f=(0,H.useRef)(null),p=(0,H.useRef)(null),m=(0,H.useRef)(null),h=(0,H.useRef)(null),g=(0,H.useMemo)(()=>{l&&!Ke&&(Ke=w());let e={uSun:{value:n},uCenter:{value:new D},uTime:{value:0},uRingN:{value:new D(0,1,0)},uRadius:{value:c},uDayNight:{value:1}};return{planet:{...e,uKind:{value:s.kind},uMask:{value:Ke},uAmbient:{value:a},uAtmo:{value:new D(...s.atmo??[0,0,0])},uAtmoAmt:{value:s.atmo?l?.9:.55:0},uRing:{value:+!!s.rings},uFocus:{value:0},uLights:{value:1},uAtmoOn:{value:1}},cloud:{...e},atmo:{uSun:e.uSun,uCenter:e.uCenter,uDayNight:e.uDayNight,uColor:{value:new D(...s.atmo??[0,0,0])},uInner:{value:1/1.06},uStrength:{value:l?1:.8}},ring:{uSun:e.uSun,uCenter:e.uCenter,uRingN:e.uRingN,uRadius:e.uRadius}}},[e.id,n,c]);return L(({pointer:e},t)=>{let n=o.getState(),a=(n.reduced?.15:1)*r;g.planet.uTime.value+=t*(n.reduced?.15:1),g.cloud.uTime.value=g.planet.uTime.value,f.current.rotation.y+=t*s.spin*a,p.current&&(p.current.rotation.y+=t*s.spin*a*.25),h.current&&(h.current.rotation.z+=t*.01*a),d.current.getWorldPosition(g.planet.uCenter.value),s.rings&&(d.current.getWorldQuaternion(Je),g.planet.uRingN.value.set(0,1,0).applyQuaternion(Je));let c=i&&!n.reduced;if(u.current.rotation.x+=((c?-e.y*.16:0)-u.current.rotation.x)*.05,u.current.rotation.y+=((c?e.x*.2:0)-u.current.rotation.y)*.05,l){let e=n.earth;g.planet.uFocus.value=e.focus===`land`?1:e.focus===`ocean`?2:0,g.planet.uLights.value=+!!e.lights,g.planet.uDayNight.value=+!!e.daynight,g.planet.uAtmoOn.value=+!!e.atmosphere,p.current&&(p.current.visible=e.clouds),m.current&&(m.current.visible=e.atmosphere)}}),(0,W.jsx)(`group`,{ref:u,children:(0,W.jsxs)(`group`,{ref:d,rotation:[0,0,S.degToRad(s.tilt)],children:[(0,W.jsx)(`mesh`,{ref:f,geometry:Ue,scale:c,rotation:[0,l?-1.9:s.phase,0],children:(0,W.jsx)(`shaderMaterial`,{vertexShader:je,fragmentShader:Me,uniforms:g.planet,defines:Ge})}),l&&(0,W.jsx)(`mesh`,{ref:p,geometry:Ue,scale:c*1.012,children:(0,W.jsx)(`shaderMaterial`,{vertexShader:je,fragmentShader:Ne,uniforms:g.cloud,defines:Ge,transparent:!0,depthWrite:!1})}),s.atmo&&(0,W.jsx)(`mesh`,{ref:m,geometry:Ue,scale:c*1.06,children:(0,W.jsx)(`shaderMaterial`,{vertexShader:Pe,fragmentShader:Fe,uniforms:g.atmo,side:1,transparent:!0,blending:2,depthWrite:!1})}),s.rings&&(0,W.jsx)(`mesh`,{ref:h,geometry:We,scale:c,rotation:[-Math.PI/2,0,0],children:(0,W.jsx)(`shaderMaterial`,{vertexShader:Le,fragmentShader:Re,uniforms:g.ring,defines:Ge,transparent:!0,depthWrite:!1,side:2})})]})})}function Xe({radius:e}){let t=(0,H.useRef)(null),n=(0,H.useMemo)(()=>({uTime:{value:0}}),[]),r=(0,H.useMemo)(()=>qe??=O([[0,`rgba(255,240,200,1)`],[.12,`rgba(255,190,110,.55)`],[.35,`rgba(255,140,60,.16)`],[1,`rgba(255,120,40,0)`]],256),[]);return L((e,r)=>{let i=o.getState();n.uTime.value+=r*(i.reduced?.15:1),t.current.rotation.y+=r*.02*(i.reduced?.15:1)}),(0,W.jsxs)(`group`,{children:[(0,W.jsx)(`mesh`,{ref:t,geometry:Ue,scale:e,children:(0,W.jsx)(`shaderMaterial`,{vertexShader:je,fragmentShader:Ie,uniforms:n,defines:Ge})}),(0,W.jsx)(`sprite`,{scale:[e*9,e*9,1],children:(0,W.jsx)(`spriteMaterial`,{map:r,blending:2,depthWrite:!1,transparent:!0,opacity:.85})})]})}function Ze({id:e=`earth`,radius:t=2.35}){let n=c(e),r=(0,H.useMemo)(()=>new D(-22,6,6),[]),i=(0,H.useMemo)(()=>O([[0,`rgba(255,248,235,1)`],[.05,`rgba(255,230,190,.8)`],[.25,`rgba(160,190,255,.16)`],[1,`rgba(120,150,255,0)`]],256),[]);return(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(Ye,{body:n,radius:t,sun:r,spinScale:.35,parallax:!0,ambient:.03}),(0,W.jsx)(`sprite`,{position:r,scale:[26,26,1],children:(0,W.jsx)(`spriteMaterial`,{map:i,blending:2,depthWrite:!1,transparent:!0,opacity:.9})})]})}var Qe=e=>.09*Math.sqrt(365.25/e),$e=new D;function et({radius:e,id:t}){let n=(0,H.useRef)(null),r=(0,H.useMemo)(()=>{let t=Array.from({length:256},(t,n)=>new D(Math.cos(n/256*6.2832)*e,0,Math.sin(n/256*6.2832)*e));return new m().setFromPoints(t)},[e]);return L(()=>{let e=o.getState(),r=n.current.material;r.opacity+=((e.selected===t?.5:e.hovered===t?.35:.13)-r.opacity)*.15}),(0,W.jsx)(`lineLoop`,{ref:n,geometry:r,children:(0,W.jsx)(`lineBasicMaterial`,{color:`#8fa0ff`,transparent:!0,opacity:.13,depthWrite:!1})})}function tt(){let e=(0,H.useMemo)(()=>{let e=d.mobile?700:2200,t=new Float32Array(e*3);for(let n=0;n<e;n++){let e=Math.random()*6.2832,r=29.5+Math.random()*8;t.set([Math.cos(e)*r,(Math.random()-.5)*.9,Math.sin(e)*r],n*3)}return new m().setAttribute(`position`,new v(t,3))},[]);return(0,W.jsx)(`points`,{geometry:e,children:(0,W.jsx)(`pointsMaterial`,{size:1.8,sizeAttenuation:!1,color:`#9aa0ae`,transparent:!0,opacity:.6,depthWrite:!1})})}function nt(){let e=o(e=>e.selected),n=o(e=>e.select),r=o(e=>e.view),i=(0,H.useRef)({}),s=(0,H.useRef)(0);return(0,H.useEffect)(()=>{t.forEach(e=>i.current[e.id]?.position.set(Math.cos(e.visual.phase)*e.visual.orbit,0,Math.sin(e.visual.phase)*e.visual.orbit))},[]),L((e,n)=>{s.current+=n*(o.getState().reduced?.1:1),t.forEach(e=>{let t=e.visual.phase+s.current*Qe(e.visual.period);i.current[e.id]?.position.set(Math.cos(t)*e.visual.orbit,0,Math.sin(t)*e.visual.orbit)})}),(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(X,{id:`sun`,name:`Sun`,radius:a[0].visual.radius,selected:e===`sun`,onSelect:n,children:(0,W.jsx)(Xe,{radius:a[0].visual.radius})}),(0,W.jsx)(tt,{}),t.map(t=>(0,W.jsxs)(`group`,{children:[(0,W.jsx)(et,{radius:t.visual.orbit,id:t.id}),(0,W.jsx)(X,{ref:e=>{i.current[t.id]=e},id:t.id,name:t.name,radius:t.visual.radius*(t.visual.rings?1.9:1),selected:e===t.id,onSelect:n,children:(0,W.jsx)(Ye,{body:t,sun:$e,parallax:r===`planet`&&e===t.id})})]},t.id))]})}var rt=[[.7,.8,1],[.85,.9,1],[1,1,1],[1,.93,.8],[1,.8,.6]];function it(){let e=(0,H.useRef)(null),{camera:t,gl:n}=A(),r=(0,H.useMemo)(()=>{let e=d.stars,t=new Float32Array(e*3),n=new Float32Array(e*3),r=new Float32Array(e),i=new Float32Array(e);for(let a=0;a<e;a++){let e=Math.random()*2-1,o=Math.random()*Math.PI*2,s=Math.sqrt(1-e*e);t.set([s*Math.cos(o)*500,e*500,s*Math.sin(o)*500],a*3);let c=rt[Math.random()*rt.length|0],l=.5+Math.random()*.5;n.set([c[0]*l,c[1]*l,c[2]*l],a*3),r[a]=1.3+Math.random()**6*3.4,i[a]=Math.random()*6.28}let a=new m;return a.setAttribute(`position`,new v(t,3)),a.setAttribute(`aColor`,new v(n,3)),a.setAttribute(`aSize`,new v(r,1)),a.setAttribute(`aPhase`,new v(i,1)),a},[]),i=(0,H.useMemo)(()=>({uTime:{value:0},uPx:{value:Math.min(devicePixelRatio,d.dpr)},uTw:{value:1}}),[]);return L(({pointer:r},a)=>{let s=o.getState().reduced;i.uTime.value+=a,i.uTw.value=+!s,i.uPx.value=n.getPixelRatio(),e.current.position.copy(t.position),s||(e.current.rotation.y+=a*.0025,e.current.rotation.x+=(r.y*.012-e.current.rotation.x)*.02)}),(0,W.jsxs)(`group`,{ref:e,children:[(0,W.jsxs)(`mesh`,{renderOrder:-10,frustumCulled:!1,children:[(0,W.jsx)(`sphereGeometry`,{args:[900,32,16]}),(0,W.jsx)(`shaderMaterial`,{vertexShader:Be,fragmentShader:ze,defines:{OCT:d.mobile?3:4},side:1,depthWrite:!1})]}),(0,W.jsx)(`points`,{geometry:r,frustumCulled:!1,renderOrder:-9,children:(0,W.jsx)(`shaderMaterial`,{vertexShader:Ve,fragmentShader:He,uniforms:i,transparent:!0,depthWrite:!1,blending:2})})]})}var at=i({default:()=>dt}),ot=(0,H.lazy)(()=>f(()=>import(`./GalaxyMap-BOeMFMBo.js`).then(e=>({default:e.GalaxyMap})),__vite__mapDeps([0,1,2,3,4]))),st=(0,H.lazy)(()=>f(()=>import(`./DeepSpace-RDvZ8oo_.js`).then(e=>({default:e.DeepSpace})),__vite__mapDeps([5,1,2,3,4]))),ct=class extends H.Component{state={failed:!1};static getDerivedStateFromError(){return{failed:!0}}componentDidCatch(e){console.error(`Scene failed`,e),o.getState().set({webglFailed:!0})}render(){return this.state.failed?null:this.props.children}};function lt(){let[e,t]=(0,H.useState)(0);return L(()=>{e<4?t(e+1):e===4&&(t(5),o.getState().set({ready:!0}))}),null}function ut(){let e=o(e=>e.view);return(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(Ae,{}),(0,W.jsx)(it,{}),e===`hero`&&(0,W.jsx)(Ze,{}),(e===`solar`||e===`planet`)&&(0,W.jsx)(nt,{}),(0,W.jsxs)(H.Suspense,{fallback:null,children:[e===`galaxy`&&(0,W.jsx)(ot,{}),e===`deep`&&(0,W.jsx)(st,{})]})]})}function dt(){let[e,t]=(0,H.useState)(d.dpr);return(0,H.useEffect)(()=>{let e=setTimeout(()=>o.getState().set({ready:!0}),6e3);return()=>clearTimeout(e)},[]),(0,W.jsx)(ct,{children:(0,W.jsxs)(pe,{dpr:[1,e],flat:!0,camera:{fov:45,near:.05,far:3e3,position:[0,.5,34]},gl:{antialias:!d.mobile,powerPreference:`high-performance`,alpha:!1},onCreated:({gl:e})=>e.domElement.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),o.getState().set({webglFailed:!0})}),"aria-label":`Interactive 3D view of the universe`,role:`img`,children:[(0,W.jsx)(`color`,{attach:`background`,args:[`#050509`]}),(0,W.jsx)(we,{onDecline:()=>t(1)}),(0,W.jsx)(lt,{}),(0,W.jsx)(ut,{})]})})}export{dt as default,Ee as n,X as r,at as t};