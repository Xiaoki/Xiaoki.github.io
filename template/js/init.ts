import sign from '../assets/sign.glb';
import background from '../assets/ai.png';
import 'babylonjs-loaders';
import { PlayerController } from './PlayerController';

import {
    Engine, 
    Scene, 
    ArcRotateCamera,
    MeshBuilder,
    Vector3,
    HemisphericLight,
    SceneLoader,
    UniversalCamera,
    StandardMaterial,
    Texture,
    Color3,
    Plane,
    Tools,
    Mesh,
    CubeTexture,
} from 'babylonjs';

// Import Skybox images
import _px from '../assets/skybox/px.png';
import _py from '../assets/skybox/py.png';
import _pz from '../assets/skybox/pz.png';
import _nx from '../assets/skybox/nx.png';
import _ny from '../assets/skybox/ny.png';
import _nz from '../assets/skybox/nz.png';

export let engine : Engine ;
export let canvas : HTMLCanvasElement ;
export let scene : Scene ;
export let camera : UniversalCamera ;
export let player : PlayerController;

// export let wispMesh : object;

export const SetupEnvironment = () => {
 
    // Setup the canvas and append to the webpage.
    canvas = document.createElement("canvas")
    canvas.classList.add('webgl');
    document.body.appendChild(canvas);

    // Setup the engine
    engine = new Engine(canvas, true);
    scene = new Scene(engine);

    // Create a new player with a firstperson camera.
    player = new PlayerController(scene, canvas, engine);

    // Add light to the scene.
    const light = new HemisphericLight('light1', new Vector3(3, 3, 0), scene);

};


export const LoadModels = () => {

    //Setup Universe Plane image.
    const universePlaneMaterial : StandardMaterial = new StandardMaterial('UniverseImage', scene);
    universePlaneMaterial.diffuseTexture = new Texture(background, scene);
    universePlaneMaterial.specularColor = new Color3(0,0,0);
    universePlaneMaterial.backFaceCulling = false;

    // Create Universe Background plane
    //const backgroundPlane = MeshBuilder.CreatePlane("backgroundPlane", {size: 120}, scene);
    //backgroundPlane.rotation.x = Tools.ToRadians(90); 
    //backgroundPlane.position = new Vector3(0,0,0);
    //backgroundPlane.material = universePlaneMaterial;

    //load skybox
    const skybox = MeshBuilder.CreateBox('Skybox', {size: 8000 }, scene);
    const skyboxMaterial = new StandardMaterial('skyboxMaterial', scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new CubeTexture(' ', scene, [_px, _py, _pz, _nx, _ny, _nz])
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new Color3(0,0,0);
    skyboxMaterial.specularColor = new Color3(0,0,0);
    skybox.material = skyboxMaterial;

    console.log(_px)
    

    // Load custom model.
    SceneLoader.ImportMeshAsync("", "", sign, scene ).then( (result) => {
        // Use the result variable to do something.
    });

}

const getCurrentTime = () => {
    let date = new Date();
    return date.getMilliseconds();
}