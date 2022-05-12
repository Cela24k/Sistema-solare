window.onload = function(){
    const w = window.innerWidth;
    const h = window.innerHeight;
    const loader = new THREE.TextureLoader();
    //const sun_texture = loader.load('sun.jpg');

    //Scena
    let scene = new THREE.Scene();

    //Camera
    let camera = new THREE.PerspectiveCamera(30, w/h, 0.1, 1000);
    camera.position.z = 60
    camera.position.y = 2
    
    //Renderer
    let renderer = new THREE.WebGLRenderer(antialias=false);
    renderer.setSize(w,h);
    document.body.appendChild(renderer.domElement);

    //Mesh e oggetti 
    let light = new THREE.PointLight(0x404040,20);
    let light2 = new THREE.AmbientLight("white",1);

    light.position.x +=10;
    scene.add(light,light2);

    /*
    let sun_geometry = new THREE.SphereGeometry(15,64,64);
    let sun_mat = new THREE.MeshLambertMaterial({map: sun_texture color:"yellow"});
    let sun = new THREE.Mesh(sun_geometry,sun_mat);
    sun.position = new THREE.Vector3(0,0,0);
    */

    let sun = new THREE.Mesh(new THREE.SphereGeometry(13.92700,64,64),new THREE.MeshLambertMaterial({
        color:"white", 
        //emissive:"white", 
        //wireframe:true, 
        map:loader.load("sun.jpg"),
    }));

    let earth = new THREE.Mesh(new THREE.SphereGeometry(0.12742,64,64),new THREE.MeshLambertMaterial({
        color:"white",
        map:loader.load("earth.jpg")
    }));
    earth.position.z += 50;
    /*
    let planet1 = new THREE.Mesh(new THREE.SphereGeometry(15,64,64),new THREE.MeshLambertMaterial())
    scene.add(planet1);
    */
    scene.add(sun, earth);

    //Controls
    let controls = new THREE.OrbitControls(camera,renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.241;
    controls.rotateSpeed = 0.005;
    scene.add(controls);
    
    //RENDER

    let animation = function(){
        sun.rotation.y += 0.001;
        controls.update();
    }

    let render_scene = function(){
        renderer.render(scene,camera);
        requestAnimationFrame(render_scene);
    }
    render_scene();
}