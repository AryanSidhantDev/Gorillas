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
        blastholes:[],
        
        scale:1,
    };   
    
    //generate background buildings
    for(let i=0; i<11; i++){
        generateBackgroundBuildings(i);
    }

    // generate buildings
    for(let i=0; i<8; i++){
        generateBuildings(i);
    }

    calculateScale();
    
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

    const x= previousbuilding ? previousbuilding.x + previousbuilding.width + 4: 170;

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

    const lightsOn=[];
    for(let i=0; i<50; i++){
        const light=Math.random()<=0.33? true:false;
        lightsOn.push(light);
    }

    state.buildings.push({x,width,height,lightsOn});
}

function draw(){
    ctx.save();

    //flip coordinate system upside down
    ctx.translate(0,window.innerHeight);
    ctx.scale(1,-1);
    ctx.scale(state.scale,state.scale);
    //draw scene
    drawBackground();
    drawBackgroundBuildings();
    drawBuildings();
    drawGorilla(1);
    drawGorilla(2);
    // drawBomb();


    //restore transformation
    ctx.restore();

};


function drawBackground(){
    const gradient=ctx.createLinearGradient(0,0,0,window.innerHeight/state.scale);
    gradient.addColorStop(1,"rgba(248,186,133,1)");
    gradient.addColorStop(0,"rgba(248,186,133,1)");

    //draw sky
    ctx.fillStyle=gradient;
    ctx.fillRect(0,0,window.innerWidth/state.scale,window.innerHeight/state.scale);

    //draw moon
    ctx.fillStyle="rgba(255,255,255,0.6)";
    ctx.beginPath();
    ctx.arc(400,470,50,0,2*Math.PI);
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
    

    //draw windows
    const windowWidth=10;
    const windowHeight=12;
    const gap=15;

    const noOfFloors=Math.ceil((building.height-gap)/(windowHeight+gap));
    const noOfRoomsPerFloor=Math.floor((building.width-gap)/(windowWidth+gap));

    for(let i=0; i<noOfFloors; i++){
    for(let j=0; j<noOfRoomsPerFloor; j++){
        if (building.lightsOn[i*noOfRoomsPerFloor+j]){
            ctx.save();

            ctx.translate(building.x+gap,building.height-gap);
            ctx.scale(1,-1);

            const x=j*(windowWidth+gap);
            const y=i*(windowHeight+gap);

            ctx.fillStyle="rgba(250,250,250,0.6)";
            ctx.fillRect(x,y,windowWidth,windowHeight);

            ctx.restore();
        }
    }
    }
}
);
}

function drawGorilla(player){
    ctx.save();

    const building=player===1 ? state.buildings.at(1):state.buildings.at(-2);

    ctx.translate(building.x+building.width/2,building.height);

    drawGorillaBody();
    drawGorillaLeftArm(player);
    drawGorillaRightArm(player);
    drawGorillaFace(player);

    ctx.restore();
}

function drawGorillaBody() {
    ctx.fillStyle = "rgba(101, 67, 33, 1)";
    
    ctx.beginPath();
    ctx.moveTo(0, 15);
    ctx.lineTo(-7, 0);
    ctx.lineTo(-20, 0);
    ctx.lineTo(-17, 18);
    ctx.lineTo(-20, 44);
  
    ctx.lineTo(-12, 78);
    ctx.lineTo(0, 84);
    ctx.lineTo(11, 77);
  
    ctx.lineTo(20, 44);
    ctx.lineTo(17, 18);
    ctx.lineTo(20, 0);
    ctx.lineTo(7, 0);
    ctx.fill();
  }

function drawGorillaLeftArm(){
    ctx.strokeStyle = "rgba(101, 67, 33, 1)";
    ctx.lineWidth=18;

    ctx.beginPath();
    ctx.moveTo(-14,50);
    
    ctx.quadraticCurveTo(-44,45,-28,12);
    console.log(ctx.fillStyle);
    ctx.stroke();
    
  }

function drawGorillaRightArm(){
    ctx.strokeStyle = "rgba(101, 67, 33, 1)";
    ctx.lineWidth=18;

    ctx.beginPath();
    ctx.moveTo(14,50);
    
    ctx.quadraticCurveTo(44,45,28,12);
    ctx.stroke();
  }

function drawGorillaFace(){
    ctx.fillStyle= "rgba(252, 191, 92,1)";

    ctx.beginPath();
    ctx.arc(0,63,9,0,2*Math.PI);
    ctx.moveTo(-3.5,70);
    ctx.arc(-3.5,70,4,0,2*Math.PI);
    ctx.moveTo(+3.5, 70);
    ctx.arc(+3.5,70,4,0,2*Math.PI);
    ctx.fill();

    // eyes
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.beginPath();
    ctx.arc(-3.5,70,1.4,0,2*Math.PI);
    ctx.moveTo(+3.5, 70);
    ctx.arc(+3.5,70,1.4,0,2*Math.PI);
    ctx.fill();

    ctx.strokeStyle = "rgba(0,0,0,1)";
    ctx.lineWidth = 1.4;

    // nose
    ctx.beginPath();
    ctx.moveTo(-3.5,66.5);
    ctx.lineTo(-1.5,65);
    ctx.moveTo(3.5,66.5);
    ctx.lineTo(1.5,65);
    ctx.stroke();

    // mouth
    ctx.beginPath();
    
    ctx.moveTo(-5,56);
    ctx.quadraticCurveTo(0,60,5,56);
    
    ctx.stroke();
}

function calculateScale(){
    const lastBuilding=state.backgroundBuildings.at(-1);
    const totalWidth=lastBuilding.x+lastBuilding.width;

    state.scale=window.innerWidth/totalWidth;
}

window.addEventListener("resize",()=>{
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    calculateScale();
    draw();
})