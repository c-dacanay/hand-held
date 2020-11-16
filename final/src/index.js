
window.addEventListener("load", init);

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
      width: window.innerWidth,
      height: window.innerHeight,
      showAxes: true,
      showVelocity: true
    }
  });

  // run the renderer
  Render.run(render);

  var runner = Runner.create();
  Runner.run(runner, engine);


  //variable for friction
  let fr = 2;
  let afr = .001;
  let d = 1;
  World.add(world, [
    // walls
    Bodies.rectangle(400, 600, window.innerWidth, 50, { isStatic: true }),
    Bodies.rectangle(window.innerHeight, 300, 50, window.innerHeight, { isStatic: true }),
    Bodies.rectangle(0, 300, 50, window.innerHeight, { isStatic: true })
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

  // for (i in bodiesArray.length) {
  //   Body.setDensity(bodiesArray[1], 200)
  //   console.log('bam')
  // }

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
    max: { x: 800, y: 600 }
  });

  engine.world.gravity.y = .6;
  // run the engine
  Engine.run(engine);

}