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
function init(evt) {
  evt.preventDefault();

  let rockButton = document.getElementById("rockButton")
  let creditButton = document.getElementById("nameButton")
  let clearButton = document.getElementById("clearButton")
  let credits = document.getElementById("credits")
  let canvas = document.getElementById("matter");
  let ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  width = canvas.width;
  height = canvas.height;


  // console.log(width, height)
  var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Runner = Matter.Runner,
    Composite = Matter.Composite,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Vertices = Matter.Vertices,
    Svg = Matter.Svg;

  var engine = Engine.create({
    enableSleeping: true
  }),
    world = engine.world;

  // var render
  if (debug) {
    render = Render.create({
      element: document.body,
      canvas: canvas,
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
    var runner = Runner.create();
    Runner.run(runner, engine);
  }

  let ranCol;
  (function render() {
    ranCol = Math.floor(Math.random() * rockColors.length)
    var bodies = engine.world.bodies;
    // debugger;
    window.requestAnimationFrame(render);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);

    // console.log(bodies)
    for (var i = 0; i < bodies.length; i += 1) {
      ctx.beginPath();
      var vertices = bodies[i].vertices;
      ctx.moveTo(vertices[0].x, vertices[0].y);

      for (var j = 1; j < vertices.length; j += 1) {
        ctx.lineTo(vertices[j].x, vertices[j].y)
      }
      ctx.lineTo(vertices[0].x, vertices[0].y);
      ctx.fillStyle = bodies[i].render.fillStyle;
      ctx.fill();
    }

    // ctx.stroke();
  })();

  //variable for friction
  let fr = .9;
  // let afr = .001;
  let d = .01;


  if (debug) {
    addBounds();
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
    addBounds();
    newRock();
  }

  var mouse = Mouse.create(debug ? render.canvas : canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          angularStiffness: 0.5,
          visible: false
        }
      }
    });

  World.add(world, mouseConstraint);

  // render.mouse = mouse;

  // }
  engine.world.gravity.y = 2;
  // run the engine
  Engine.run(engine);


  rockButton.addEventListener("click", () => {
    let ranX = Math.random() * Math.floor(window.innerWidth - 100);
    // console.log(ranX)
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
    let ranCol = Math.floor(Math.random() * rockColors.length)
    let ranStone = Math.floor(Math.random() * svgPaths.length)
    let newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace 
    newElement.setAttribute("d", svgPaths[ranStone]); //Set path's data;
    let vertices = Svg.pathToVertices(newElement, 30);
    let body = Bodies.fromVertices(ranX, 0, vertices, {
      render: {
        fillStyle: rockColors[ranCol]
      },
      friction: fr,
      // frictionAir: afr,
      // density: d
    });
    Body.scale(body, width * .0006, height * .0009)

    World.add(engine.world, body);
  }

  clearButton.addEventListener("click", () => {
    let worldBodies = world.bodies.length
    for (let i = 3; i < world.bodies.length; i + 1) {
      World.remove(world, world.bodies[i])
    }
  })
  function addBounds() {
    let floor = Bodies.rectangle(canvas.width, canvas.height / 1.1, canvas.width * 10, 200, {
      isStatic: true, render: {
        fillStyle: "#fff"
      }
    });

    let rwall = Bodies.rectangle(canvas.width, canvas.height / 2, 200, canvas.width * 2, {
      isStatic: true, render: {
        fillStyle: "#fff"
      }
    });

    let lwall = Bodies.rectangle(0, canvas.height / 2, 200, canvas.height * 2, {
      isStatic: true, render: {
        fillStyle: "#fff"
      }
    });

    let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

    if (isMobile) {
      Body.scale(floor, 1, .5)
      Body.scale(lwall, .0005, height * .01)
      Body.scale(rwall, .0005, height * .01)
      //Conditional script here
    }

    World.add(world, [floor, rwall, lwall]);
  }

  creditButton.addEventListener("click", () => {
    if (credits.style.display == "none") {
      credits.style.display = "flex";
    } else {
      creditsOff();
    }
  });

}


function creditsOff() {
  credits.style.display = "none";
}

//stone shapes
let vect0 = "M3.00005 37C40 -20 294 0.499996 320 25C346 49.5 -33.9999 94 3.00005 37Z";
let vect1 = "M319.369 61.47C309.99 111.374 253.491 130 159.934 130C66.3781 130 -6.78307 88.6597 0.500287 61.47C7.78364 34.2802 182.209 37.2638 239.652 10.4053C297.095 -16.4532 328.747 11.5658 319.369 61.47Z";
let vect2 = "M1.09963 79.5359C1.07552 145.452 155.447 132.167 167.76 53.2738C174.79 8.22891 79.63 -8.96568 30.8623 5.98787C-5.7838 17.2246 1.10998 51.255 1.09963 79.5359Z"
let vect3 = "M116 86C136 115.6 69 128.333 33 131C-19 139.889 2.00001 26 27 5C52 -16 91 49 116 86Z";
let vect4 = "M140.203 85.0547C108.533 90.3752 4.27688 38.8734 8.08112 106.654C11.8854 174.435 252.317 145.657 257.052 78.9884C261.787 12.3196 171.872 79.7342 140.203 85.0547Z";
let vect5 = "M9.06621 98.3274C119.265 106.859 345.196 113.01 367.325 69.3627C394.986 14.8036 -41.707 11.7441 9.06621 98.3274Z";
let vect6 = "M15.8174 62.1006C138.157 144.867 445.809 118.94 483.26 52.1287C522.199 -17.3381 -106.522 -20.6658 15.8174 62.1006Z";
let vect7 = "M0.589256 33.7639C6.2743 2.8468 41.4506 -13.1638 60.9929 13.5206C80.5352 40.205 52.9983 33.7639 52.9983 60.4483C52.9983 87.1327 -6.51706 72.4102 0.589256 33.7639Z";
let vect8 = "M209.127 26.0634C159.527 9.88126 56.5583 4.2713 14.4438 42.1444C-25.2634 77.8527 41.0209 86.6106 82.9993 74.3592C124.978 62.1077 250.74 80.6281 281.473 84.8082C312.207 88.9882 324.928 63.1586 295.292 58.0866C265.657 53.0147 258.726 42.2456 209.127 26.0634Z";
let svgPaths = [vect0, vect1, vect2, vect3, vect4, vect5, vect6, vect7, vect8];

let rockColors = ["#47403a", "#c2d4dc", "#b4b6b7", "#b0afa4", "#bba289", "#989591", "#9e8877", "#d2d2c9"]

