
var MAX_V = 14;
var MIN_V = 6;

class Sword {

    constructor(){
        
        //hilt
        this.hilt = Bodies.circle(200, 200, 10, 10);
        Body.setStatic(this.hilt, true);

        //shaft
        this.shaft = Bodies.rectangle(200, 200, 160, 8);
        this.shaft.restitution = .4;

        //sword
        this.sword = Composite.create({
            bodies: [this.shaft, this.hilt]
        });
        Composites.chain(this.sword, 0.45, 0, 0, 0, { 
            stiffness: 0.1, 
            length: 15,
            angularStiffness: 0.2,
            render: {
                strokeStyle: '#4a485b'
            }
        });

        //add to world
        World.add(world, this.sword);

        //initialize where the mouse "is"
        this.setMousePos({x:0,y:0});

        //make it move
        var instance = this;
        setInterval(function(){
            instance.move();
        }, 20);
    }

    setMousePos(pos){
        this.mousePos = pos;
    }

    move(){
        var currentPos = this.hilt.position;
        var d = {
            x: currentPos.x - this.mousePos.x,
            y: currentPos.y - this.mousePos.y,
        };
        if(Math.abs(d.x) < 5 && Math.abs(d.y) < 5) return;
        var h = Math.sqrt(Math.pow(d.x,2) + Math.pow(d.y,2));
        var a = Math.atan2(d.x, d.y);
        var newPos = {
            x: (-MAX_V * h / W - MIN_V) * Math.sin(a) + currentPos.x,
            y: (-MAX_V * h / H - MIN_V) * Math.cos(a) + currentPos.y
        }
        Body.setPosition(this.hilt, newPos);
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
var pendulum = Composites.stack(350, 160, 2, 1, 80, 0, function(x, y) { 
    return Bodies.rectangle(x, y, 200, 25, { 
        //collisionFilter: { group: group },
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
    var mousePos = {
        x: e.pageX,
        y: e.pageY
    }
    sword.setMousePos(mousePos);
    
});