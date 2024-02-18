let state={};



const canvas=document.getElementById("game");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
const ctx=canvas.getContext("2d");

newGame();

function newGame(){
    //reset game state
    state={
        phase:"aiming",
        currentPlayer:1,
        bomb:{
            x:undefined,
            y:undefined,
            rotation:0,
            velocity:{x:0,y:0}
        },

        //buildings
        backgroundBuildings:[],
        buildings:[],
        blastholes:[]
    };   
    
    
    draw();
}



function draw(){
    ctx.save();

    //flip coordinate system upside down
    ctx.translate(0,window.innerHeight);
    ctx.scale(1,-1);

    //draw scene
    drawBackground();
    // drawBackgroundBuildings();
    // drawBuildings();
    // drawGorilla1();
    // drawGorilla2();
    


    //restore transformation
    ctx.restore();

};

function drawBackground(){
    const gradient=ctx.createLinearGradient(0,0,0,window.innerHeight);
    gradient.addColorStop(1,"#F8BA85");
    gradient.addColorStop(0,"#F8BA85");

    //draw sky
    ctx.fillStyle=gradient;
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);

    //draw moon
    ctx.fillStyle="rgba(255,255,255,0.6)";
    ctx.beginPath();
    ctx.arc(400,600,80,0,2*Math.PI);
    ctx.fill();

};







