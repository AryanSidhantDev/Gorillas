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
    
    //generate background buildings
    for(let i=0; i<15; i++){
        generateBackgroundBuildings(i);
    }

    // generate buildings
    for(let i=0; i<8; i++){
        generateBuildings(i);
    }
    
    draw();
}

function generateBackgroundBuildings(i){
    const previousbuilding=state.backgroundBuildings[i-1];

    const x= previousbuilding ? previousbuilding.x + previousbuilding.width + 4: -30;

    const minWidth=80;
    const maxWidth=130;

    const width = minWidth + Math.random()*(maxWidth-minWidth);


    const minHeight=120;
    const maxHeight=420;

    const height= minHeight + Math.random()*(maxHeight-minHeight);

    state.backgroundBuildings.push({x,width,height});
}

function generateBuildings(i){
    const previousbuilding=state.buildings[i-1];

    const x= previousbuilding ? previousbuilding.x + previousbuilding.width + 4: 200;

    const minWidth=80;
    const maxWidth=130;
    const width = minWidth + Math.random()*(maxWidth-minWidth);

    const platformWithGorilla=i===1||i===6;
 

    const minHeight=80;
    const maxHeight=350;
    const minHeightGorilla=50;
    const maxHeightGorilla=100;
    
    const height= platformWithGorilla? minHeightGorilla+Math.random()*(maxHeightGorilla-minHeightGorilla)
    : minHeight+Math.random()*(maxHeight-minHeight);

    state.buildings.push({x,width,height});
}

function draw(){
    ctx.save();

    //flip coordinate system upside down
    ctx.translate(0,window.innerHeight);
    ctx.scale(1,-1);

    //draw scene
    drawBackground();
    drawBackgroundBuildings();
    drawBuildings();
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

function drawBackgroundBuildings(){
    state.backgroundBuildings.forEach((building) => {
        ctx.fillStyle= "rgba(160,32,240,0.6)";
        ctx.fillRect(building.x,0,building.width,building.height);
    });
}

function drawBuildings(){
    state.buildings.forEach((building) => {
        ctx.fillStyle= "rgba(160,56,256,1)";
        ctx.fillRect(building.x,0,building.width,building.height);
    });
}
