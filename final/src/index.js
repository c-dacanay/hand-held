//notes from max

//scaling bodies: the world doesn't have a size, because you have walls. 
//can calculate ext of walls so that it fits the screen
//always make the world 200px wide, and then renderer, scale to fit
//OR have the world respond according to frame

//vote predetermined stones
//if renderer is outputting svg elements 
//SVG paths are different than arbitrary SVGs
//path is DSL 
//    if (!debug) {
//  box.innerHTML = ` ${paths.join("\n")} `;
// }

//https://observablehq.com/@plmrry/positioning-text-with-matter-js
//Matter.Svg.pathToVertices(path, [sampleLength=15])
//verteces is just points as a data structure

//path as a mask in svg
//https://coderwall.com/p/blx8kw/svg-clippath-images


window.addEventListener("load", init);

let debug = false;
// let debug = true;

function init() {

  let myCanvas = document.getElementById("matter");
  let width = window.innerWidth;
  let height = window.innerHeight;
  let button = document.getElementById("newButton")

  console.log(width, height)
  var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Runner = Matter.Runner,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Vertices = Matter.Vertices,
    Svg = Matter.Svg;

  var engine = Engine.create({
    // positionIterations: 5,
    // constraintIterations: 5,
    // enableSleeping: true
  }),
    world = engine.world;

  // if (debug) {
  var render = Render.create({
    element: document.body,
    canvas: myCanvas,
    engine: engine,
    options: {
      width: window.innerWidth,
      height: window.innerHeight,
      // showAxes: true,
      // showVelocity: true,
      background: 'transparent',
      wireframes: false
    }
  });
  Render.run(render);
  // }

  var runner = Runner.create();
  Runner.run(runner, engine);


  //variable for friction
  let fr = .6;
  let afr = .001;
  let d = 10;

  World.add(world, [
    // floor
    Bodies.rectangle(window.innerWidth / 2, window.innerHeight * .9, window.innerWidth * 5, 50, { isStatic: true }),
    //right wall
    Bodies.rectangle(window.innerWidth - 20, window.innerHeight / 2, 50, window.innerHeight, { isStatic: true }),
    // left wall
    Bodies.rectangle(0, window.innerHeight / 2, 50, window.innerHeight, { isStatic: true })
  ]);

  if (debug) {
    //all the bodies
    let bodiesArray = [
      Bodies.rectangle(200, 200, width / 4, height / 8, {
        chamfer: { radius: [20, 50, 10, 70] },
        friction: fr,
        frictionAir: afr,
        density: d
      })];

    World.add(world, bodiesArray);
  } else {

    // var path = '<svg width="322" height="65" viewBox="0 0 322 65" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M3.00005 37C40 -20 294 0.499996 320 25C346 49.5 -33.9999 94 3.00005 37Z" fill="#C4C4C4"/></svg>';
    // for (i = 0; i < 3; i++) {
    newRock();
    // World.add(engine.world, body);
    // }
    // let pathData = `M 3.00005 37C40 -20 294 0.499996 320 25C346 49.5 -33.9999 94 3.00005 37Z`;
    // let svgData = `<svg width="322" height="65" viewBox="0 0 322 65" fill="none" xmlns="http://www.w3.org/2000/svg">
    // <path d="M3.00005 37C40 -20 294 0.499996 320 25C346 49.5 -33.9999 94 3.00005 37Z" fill="#C4C4C4"/>
    // </svg>`
    // Svg.pathToVertices(pathData);

    // let path = null;
    // const style = `fill: "white"; fill-opacity: 1; stroke: grey; stroke-width: 1px; stroke-opacity: 0.5`;

    // path = `<path d="${pathData}" style="${style}"></path>`;
    // console.log(path, 20)
    // return path;

  }

  var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

  World.add(world, mouseConstraint);

  render.mouse = mouse;

  // fit the render viewport to the scene
  // Render.lookAt(render, {
  //   min: { x: 0, y: 0 },
  //   max: { x: window.innerHeight, y: window.innerWidth }
  // });

  // engine.world.gravity.y = .9;
  // run the engine
  Engine.run(engine);

  button.addEventListener("click", () => {
    // let ranX = Math.random() * Math.floor(window.innerWidth - 100);
    console.log(ranX)

    if (debug) {
      let newBod = [Bodies.rectangle(ranX, 200, 200, 50, {
        chamfer: { radius: [25, 25, 10, 2] },
        friction: fr,
        frictionAir: afr,
        density: d
      })];

      World.add(world, newBod)
    } else {
      newRock();
    }
  })

  function newRock() {
    ranX = Math.random() * Math.floor(window.innerWidth - 100);
    let newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace 
    newElement.setAttribute("d", "M3.00005 37C40 -20 294 0.499996 320 25C346 49.5 -33.9999 94 3.00005 37Z"); //Set path's data
    newElement.style.stroke = "#000"; //Set stroke colour
    newElement.style.strokeWidth = "5px";
    newElement.style.strokelinecap = "round";

    // debugger;
    let vertices = Svg.pathToVertices(newElement, 30);

    let body = Bodies.fromVertices(ranX, 0, vertices, {
      friction: fr,
      // frictionAir: afr,
      // density: d
    });

    World.add(engine.world, body);
  }
}


