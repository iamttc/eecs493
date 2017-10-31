
var VELOCITY = 6;

class Sword {

    constructor(){

        //hilt
        this.hilt = Bodies.circle(200, 100, 10, 10); //, { isStatic: true });
        this.hilt.restitution = .9;
        Body.setStatic(this.hilt, true);

        //shaft
        this.shaft = Bodies.rectangle(450, 50, 160, 8);
        this.shaft.restitution = .4;

        //sword
        this.sword = Composite.create({
            bodies: [this.shaft, this.hilt]
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
        console.log(currentPos);
        var d = {
            x: currentPos.x - this.mousePos.x,
            y: currentPos.y - this.mousePos.y
        };
        if(Math.abs(d.x) < 5 && Math.abs(d.y) < 5)
            return;
        console.log(d);
        var a = Math.atan2(d.x, d.y);
        console.log(a);
        var newPos = {
            x: -VELOCITY * Math.sin(a) + currentPos.x,
            y: -VELOCITY * Math.cos(a) + currentPos.y
        }
        console.log(newPos);
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