// const THREE = require("three");
// const GLTFLoader = require("three-gltf-loader");
// const OrbitControls = require('three-orbitcontrols')
// // import THREE from "three";
// // const GLTFLoader = require("./GLTFLoader");

// document.addEventListener("DOMContentLoaded", ()=>{

//     let car;

//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color("black");

//     const camera = new THREE.PerspectiveCamera
//     (40, window.innerWidth/window.innerHeight, 1, 5000);

//     camera.rotation.y = 45/180*Math.PI;
//     camera.position.x = 800;
//     camera.position.y = 100;
//     camera.position.z = 1000;


//     light = new THREE.PointLight(0xc4c4c4,10);
//     light.position.set(0,300,500);
//     scene.add(light);
//     light2 = new THREE.PointLight(0xc4c4c4,10);
//     light2.position.set(500,100,0);
//     scene.add(light2);
//     light3 = new THREE.PointLight(0xc4c4c4,10);
//     light3.position.set(0,100,-500);
//     scene.add(light3);
//     light4 = new THREE.PointLight(0xc4c4c4,10);
//     light4.position.set(-500,300,500);
//     scene.add(light4);

//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.domElement.id = "threeCanvas";
//     document.body.appendChild(renderer.domElement);

//     let animate = ()=>{
//         let speed = 10;
//         renderer.render(scene, camera);
//         requestAnimationFrame(animate);
//         // car.rotateZ(0.02);
//     }

//     const loader = new GLTFLoader();
//     loader.load('/3dmodel/scene.gltf',(gltf)=>{
//         console.log("loaded");
//         car = gltf.scene.children[0];
//         car.scale.set(0.5,0.5,0.5);
//         scene.add(car);
//     });

//     let controls = new OrbitControls(camera, renderer.domElement);
//     controls.rotate
//     animate();


//     // const scene = new THREE.Scene();
//     // const camera = new THREE.PerspectiveCamera
//     // (75, window.innerWidth/window.innerHeight, 0.1, 1000);

//     // const renderer = new THREE.WebGLRenderer();
//     // renderer.setSize(window.innerWidth, window.innerHeight);
//     // renderer.domElement.id = "threeCanvas";
//     // document.body.appendChild(renderer.domElement);
    
//     // const geometry = new THREE.BoxGeometry();
//     // const material = new THREE.MeshBasicMaterial({color: "blue"});
//     // const cube = new THREE.Mesh(geometry, material);
//     // scene.add(cube);
//     // cube.position.x = 3;
    
//     // camera.position.z = 5;

//     // let animate = ()=>{
//     //     let speed = 0.05;
//     //     renderer.render(scene, camera);
//     //     requestAnimationFrame(animate);
//     // }

//     // animate();
    
//     // const App = require("./App");
//     // let app = new App();
//     // app.load().then(()=>{
//     //     app.getCurrentState((data)=>{
//     //         if(data.status != "waiting") {
//     //             let direct = data.directInPercent;
//     //             let speedDecr = 30;
//     //             if(direct.up) {
//     //                 cube.rotateX(-(direct.up/speedDecr));
//     //             }
//     //             if(direct.right) {
//     //                 cube.rotateY(-(direct.right/speedDecr));
//     //             }
//     //             if(direct.down) {
//     //                 cube.rotateX(direct.down/speedDecr);
//     //             }
//     //             if(direct.left) {
//     //                 cube.rotateY(direct.left/speedDecr);
//     //             }   
//     //         }
//     //     }, 10);
//     // });
// });