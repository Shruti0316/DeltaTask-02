var canvas =document.getElementById('mygame');
var ctx= canvas.getContext("2d");
var score=0, highscore=0;

//player
var block={
    x:5,
    y:300,
    side:50,
    color:"blue",
    drawBlock: function(){ 
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.side,this.side);}
}
//boundary
var component={
    x:0,
    y:0,
    side:50,
    w:800,
    h:50,
    color:'black',
    drawBound: function(){
        ctx.fillStyle=this.color;
        ctx.fillRect(this.x,this.y,this.w,this.h);
        ctx.fillRect(this.x,this.y+350,this.w,this.h);
    }
}
//obstacle or holes
var obstacle={
    x1:750,
    x2:600,
    side:50,
    dx:3,
    c:'rgb(179, 174, 174)',
    ceilHole: function(x1){
        if(x1==undefined || null){
            x1=this.x1;
        ctx.fillStyle=this.c;
        ctx.fillRect(x1,0,this.side,this.side);
        }
        else{
            ctx.fillStyle=this.c;
        ctx.fillRect(x1,0,this.side,this.side);
        }
    },
    groundHole: function(x2){
        if(x2 == undefined || null){
            x2=this.x2;
        ctx.fillStyle=this.c;
        ctx.fillRect(x2,350,this.side,this.side);
        }
        else{
            ctx.fillStyle=this.c;
        ctx.fillRect(x2,350,this.side,this.side);
        }
    }
}
function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    component.drawBound();
    obstacle.ceilHole();
    obstacle.groundHole();
    block.drawBlock();
    obstacle.x1 += -obstacle.dx;
    obstacle.x2+= -obstacle.dx;
    
    
        if(obstacle.x1<0){
            obstacle.x1=Math.floor(Math.random()*(750 - 150 + 1) + 150);
            obstacle.ceilHole(obstacle.x1);
        }
        if(obstacle.x2<0){
             obstacle.x2=Math.floor(Math.random()*(750 - 100 + 1) + 100);
             obstacle.groundHole(obstacle.x2);
        }
        //calculate score
        score++;
        //Collision Detection
        document.getElementById('score').textContent="Score: "+score;
        if((obstacle.x1>=0 && obstacle.x1<=50 && block.y==50) ||(obstacle.x2>=0 && obstacle.x2<=50 && block.y==300)){   
            document.getElementById('gameover').play();      
            document.getElementById('overlay').style.display="block";
            document.getElementById('urscore').textContent='Score: '+score;
        
        //retriving highscore value from local storage
        var highscore=localStorage.getItem('hscore');
        if(highscore!==null){
            if(score>highscore){
                //storing new highscore in local storage
                localStorage.setItem('hscore',score);
                document.getElementById('highscore').textContent='HighScore: '+score;
            }
        }
        else{
            localStorage.setItem('hscore',score);
            document.getElementById('highscore').textContent='HighScore: '+score;
        }
        //console.log('ur score:',score);
        //console.log('urhighscore:',localStorage.getItem('hscore'));
    }
    else{
    requestAnimationFrame(update);
    }
}
document.getElementById('highscore').textContent='HighScore: '+localStorage.getItem('hscore');
requestAnimationFrame(update);

//event listeners
canvas.addEventListener('click',function(e){
    //console.log('click');
    if(block.y===300){
        document.getElementById("jump").play();
        block.y=50;
    }
    else{
        document.getElementById("jump").play();
        block.y=300;
    }
});
document.addEventListener('keyup',function(e){
    if(e.code==='Space'){
        //console.log('space');
        if(block.y===300){
            document.getElementById("jump").play();
            block.y=50;
        }
        else{
            document.getElementById("jump").play();
            block.y=300;
        }
    }
});
//RESTART
function again(){
    window.location.reload();
}