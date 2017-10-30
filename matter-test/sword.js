
class Sword {
    constructor(){
        this.hilt = Bodies.circle(200, 100, 10, 10); //, { isStatic: true });
        this.hilt.restitution = .9;
        Body.setStatic(this.hilt, true);

        this.stick = Bodies.rectangle(450, 50, 160, 8);
        this.stick.restitution = .4;

        this.sword = Composite.create({
            bodies: [this.stick, this.hilt]
        });

        World.add(world, this.sword);
    }

    move(pos){
        Body.setPosition(this.hilt, pos);
    }

    //on kill set mass to mass + 1
}


// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Body = Matter.Body,
    Bodies = Matter.Bodies;

// create an engine
var W = window.innerWidth;
var H = window.innerHeight;
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: W,
        height: H,
    }
});

// create two boxes and a ground
var box1 = Bodies.rectangle(360, 200, 80, 80, { isStatic: true });
box1.restitution = .9;
var box2 = Bodies.rectangle(560, 380, 80, 80, { isStatic: true });
box2.restitution = .5;
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
ground.restitution = .1;

var group = Body.nextGroup(true);
var pendulum = Composites.stack(350, 160, 2, 1, -20, 0, function(x, y) { 
    return Bodies.rectangle(x, y, 200, 25, { 
        collisionFilter: { group: group },
        frictionAir: 0,
        chamfer: 5,
        render: { 
            fillStyle: 'transparent',
            lineWidth: 1
        }
    });
});
Composites.chain(pendulum, 0.45, 0, -0.45, 0, { 
    stiffness: 0.2, 
    length: 0,
    angularStiffness: 0.2,
    render: {
        strokeStyle: '#4a485b'
    }
});

// add all of the bodies to the world
var world = engine.world;
World.add(world, [box1, box2, pendulum, ground]);

// add mouse control for picking up objects
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

var sword = new Sword();

// keep the mouse in sync with rendering
render.mouse = mouse;

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);





//listeners

$("body").on("mousedown",function(){
    World.add(world, Bodies.rectangle(450, 50, 160, 8));
});

$("body").on("mousemove",function(e){
    var pos = {
        x: e.pageX,
        y: e.pageY
    }
    sword.move(pos);
    
});