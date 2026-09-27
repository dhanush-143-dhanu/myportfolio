// Lightweight 3D particle field + mouse parallax. No build step required.
const canvas=document.getElementById('space');
const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.setSize(innerWidth,innerHeight);
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(55,innerWidth/innerHeight,.1,1000);camera.position.z=8;
const geo=new THREE.BufferGeometry();const count=900;const pos=new Float32Array(count*3);
for(let i=0;i<count;i++){pos[i*3]=(Math.random()-.5)*24;pos[i*3+1]=(Math.random()-.5)*14;pos[i*3+2]=(Math.random()-.5)*18;}
geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
const mat=new THREE.PointsMaterial({color:0x58bfff,size:.025,transparent:true,opacity:.7});
const stars=new THREE.Points(geo,mat);scene.add(stars);
let mx=0,my=0,tx=0,ty=0;addEventListener('mousemove',e=>{tx=(e.clientX/innerWidth-.5)*.5;ty=(e.clientY/innerHeight-.5)*.35});
function loop(){requestAnimationFrame(loop);mx+=(tx-mx)*.03;my+=(ty-my)*.03;stars.rotation.y+=.00035;stars.rotation.x+=.0001;camera.position.x=mx;camera.position.y=-my;camera.lookAt(0,0,0);renderer.render(scene,camera)}loop();
addEventListener('resize',()=>{renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix()});

document.querySelectorAll('.tilt').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(900px) rotateX(${-y*5}deg) rotateY(${x*6}deg) translateY(-4px)`});el.addEventListener('mouseleave',()=>el.style.transform='')});
const video=document.getElementById('heroVideo');video.muted=true;video.play().catch(()=>{});
