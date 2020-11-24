
window.addEventListener("load", init);

let maxWidth = window.innerWidth;
let maxHeight = window.innerHeight;
function init() {
  // module aliases
  var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Runner = Matter.Runner,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse;

  // create an engine
  var engine = Engine.create(),
    world = engine.world;

  // create a renderer
  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: maxWidth,
      height: maxHeight,
      showAxes: true,
      showVelocity: true
    }
  });

  // run the renderer
  Render.run(render);

  var runner = Runner.create();
  Runner.run(runner, engine);

  //variable for friction
  let fr = 10;
  let afr = .001;
  let d = 10;

  World.add(world, [
    // floor
    Bodies.rectangle(maxWidth / 2, maxHeight * .8, maxWidth * 5, 50, { isStatic: true }),

    //right wall
    Bodies.rectangle(maxHeight, 300, 50, maxHeight, { isStatic: true }),

    //left wall
    Bodies.rectangle(0, 300, 50, maxHeight, { isStatic: true })
  ]);

  //all the bodies
  let bodiesArray = [
    Bodies.rectangle(200, 200, 600, 100, {
      chamfer: { radius: 20 },
      friction: fr,
      frictionAir: afr,
      density: d
    }),

    Bodies.rectangle(300, 200, 100, 100, {
      chamfer: { radius: [90, 0, 0, 0] },
      friction: fr,
      frictionAir: afr,
      density: d
    }),

    Bodies.rectangle(400, 200, 200, 200, {
      chamfer: { radius: [150, 20, 40, 20] },
      friction: fr,
      frictionAir: afr,
      density: d
    }),

    Bodies.rectangle(200, 200, 200, 200, {
      chamfer: { radius: [150, 20, 150, 20] },
      friction: fr,
      frictionAir: afr,
      density: d
    }),

    Bodies.rectangle(300, 200, 200, 50, {
      chamfer: { radius: [25, 25, 0, 0] },
      friction: fr,
      frictionAir: afr,
      density: d
    }),

    Bodies.polygon(200, 100, 8, 80, {
      chamfer: { radius: 30 },
      friction: fr,
      frictionAir: afr,
      density: d
    }),

    Bodies.polygon(300, 100, 5, 80, {
      chamfer: { radius: [10, 40, 20, 40, 10] },
      friction: fr,
      frictionAir: afr,
      density: d
    }),
  ];


  World.add(world, bodiesArray);

  // add mouse control
  var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        // render: {
        //   visible: false
        // }
      }
    });

  World.add(world, mouseConstraint);

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  // fit the render viewport to the scene
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: maxHeight, y: maxWidth }
  });

  engine.world.gravity.y = .9;
  // run the engine
  Engine.run(engine);

}         