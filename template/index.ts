import './style.css';
import { scene, engine, SetupEnvironment, LoadModels, player } from './js/init';

SetupEnvironment();
LoadModels();


// Called every frame.
engine.runRenderLoop( () => {
    
    scene.render(); 
    player.Update();

});

// Listen for resize event of the browser.
window.addEventListener("resize", () => {
    engine.resize();
})


