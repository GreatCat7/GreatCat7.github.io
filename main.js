var radians=function(degrees){

    return(PI*degrees/180);

 };

 var degrees=function(radians){

    return(radians*180/PI);

 };

 

 

    var sketchProc = function(processingInstance) {

     with (processingInstance) {

        

        size(600, 600);

        frameRate(50);

        scale(1);

        

      

var dayColor=color(255);

var dayCubeColor=color(0, 255, 0);

var dayLight=color(255);

var dayParticleColor=dayCubeColor;

var dayCrystalColor=color(0,255,150);

var daySparkColor=color(255,255,255);





var nightSkyColor=color(0, 74, 184);

var nightGroundColor=color(0, 28, 71);

var nightCubeColor=color(0,162,255);

var nightLight=color(209, 237, 255);

var nightParticleColor=color(76, 192, 255);

var nightCrystalColor=color(76, 191, 181);

var nightSparkColor=color(150,255,0);



var sc=color(0, 28, 71);

var gc=color(0, 13, 33);

var cc=color(0, 60, 74);

var crc=color(0,0,0);

var lt=color(0, 99, 156);

var pc=color(0,255,0);

var spc=color(150,255,0,0);

var cursorColor=color(0,255,255);



var TIMER=-3600;





var firstFrame=true;



var testing=false;



//{

var cubes=[];



var xs=0;

var ys=0;

var zs=0;



var White=[255,255,255];



var Red=[255,0,0];

var Green=[0,255,0];

var Blue=[0,0,255];



var Orange=[255,170,0];



var Cyan=[0,255,255];

var Yellow=[255,255,0];

var Violet=[255,0,255];



var Test=[0,255,150];



var Black=[0,0,0];



var Grass=[150,255,0];



var SIDE=0;

var FACE=1;



var LC=function(c1,c2,am1){

    return(lerpColor(color(c1[0],c1[1],c1[2]),color(c2[0],c2[1],c2[2]),am1));

};

var C=function(c){

    return color(c[0],c[1],c[2]);

};



var Binary=function(num){

    var mice=[];

    if(num>=4){

        num-=4;

        mice.push(1);

    }else{

        mice.push(0);

    }

    if(num>=2){

        num-=2;

        mice.push(1);

    }else{

        mice.push(0);

    }

    if(num>=1){

        num-=1;

        mice.push(1);

    }else{

        mice.push(0);

    }

    return mice;

};

var Decimal=function(arr){

    var cat=0;

    if(arr[0]===1){

        cat+=4;

    }

    if(arr[1]===1){

        cat+=2;

    }

    if(arr[2]===1){

        cat+=1;

    }

    return cat;

};



var adjacent=function(num,place,MODE){

    var mouse=Binary(num);

    var rabbit=mouse;

    if(MODE===SIDE){

        if(rabbit[place]===1){

            rabbit[place]=0;

        }else{

            rabbit[place]=1;

        }

    }else if(MODE===FACE){

        for(var i=0;i<rabbit.length;i++){

            if(rabbit[i]===1){

                rabbit[i]=0;

            }else{

                rabbit[i]=1;

            }

        }

        if(rabbit[place]===1){

            rabbit[place]=0;

        }else{

            rabbit[place]=1;

        }

    }

    var cats=Decimal(rabbit);

    return cats;

};

var opposite=function(num){

    return(7-num);

};



var particle=function(x,y,z,c){

    if(z>0){

    noStroke();

    fill(c,255-z/2);

    rect((x-1)/pow(z,1/3)*20,(y-1)/pow(z,1/3)*20,2/pow(z,1/3)*20,2/pow(z,1/3)*20);

    }

};



var Cursor=function(){

    particle(mouseX/2-150,150,-mouseY+700,color(0,255,255));

    

    if(-mouseY+700>0){

    noStroke();

    fill(150,255,0,255-(mouseY+700)/2);

    rect((mouseX/2-150-1)/pow((mouseY+700),1/3)*20,(149)/pow((mouseY+700),1/3)*20,2/pow((mouseY+700),1/3)*20,2/pow((mouseY+700),1/3)*20);

    }

};



//particle(0,0,400,Grass);



var connection=function(x1,y1,z1,x2,y2,z2){

    var vx1=x1/pow(z1,1/3)*20;

    var vy1=y1/pow(z1,1/3)*20;

    var vx2=x2/pow(z2,1/3)*20;

    var vy2=y2/pow(z2,1/3)*20;

    if(z1>0||z2>0){

    stroke(0,0,0,255-(z1+z2)/4);

    strokeWeight(2);

    line(vx1,vy1,vx2,vy2);

    }

};



var face=function(x1,y1,z1,x2,y2,z2,x3,y3,z3,x4,y4,z4){

    var vx1=x1/pow(z1,1/3)*20;

    var vy1=y1/pow(z1,1/3)*20;

    

    var vx2=x2/pow(z2,1/3)*20;

    var vy2=y2/pow(z2,1/3)*20;

    

    var vx3=x3/pow(z3,1/3)*20;

    var vy3=y3/pow(z3,1/3)*20;

    

    var vx4=x4/pow(z4,1/3)*20;

    var vy4=y4/pow(z4,1/3)*20;

    

    var Z=(z1+z2+z3+z4)/4;

    noStroke();

    quad(vx1,vy1,vx2,vy2,vx3,vy3,vx4,vy4);

    fill(sc,Z/2);

    stroke(255,255,255,0);

    strokeWeight(1);

    quad(vx1,vy1,vx2,vy2,vx3,vy3,vx4,vy4);

};



var Dist=function(x1,y1,z1,x2,y2,z2){

    return(sqrt(sq(x1-x2)+sq(y1-y2)+sq(z1-z2)));

};



var test1=function(){

    

};



var test2=function(){

    

};



var cube=function(x,y,z,size,type,xs,ys,zs){

    this.type=type;

    if(this.type==="creature"){

        this.x=x;

        this.y=y;

        this.z=z;

        this.size=size;

        this.xr=random(0,0);

        this.yr=random(0,360);

        this.xs=0;

        this.zs=0;

        this.ys=0;

        this.mode="wander";

        this.emotion="normal";

        this.color=Green;

        this.turn="None";

        this.shift=0;

    }else if(this.type==="crystal"){

        this.x=x;

        this.y=y;

        this.z=z;

        this.size=size;

        this.xr=random(0,360);

        this.yr=random(0,360);

        this.xrs=random(-3,3);

        this.yrs=random(-3,3);

        this.xs=xs;

        this.zs=zs;

        this.ys=ys;

        this.mode="wander";

    }else if(this.type==="particle"||this.type==="spark"){

        this.x=x;

        this.y=y;

        this.z=z;

        this.xs=xs;

        this.ys=ys;

        this.zs=zs;

        this.dead=false;

    }

};



cube.prototype.show=function(){

    

    if(this.type==="creature"){

    //{

    var p0=[0-this.size,0-this.size,0-this.size,0];

    var p1=[0-this.size,0-this.size,0+this.size,1];

    var p2=[0-this.size,0+this.size,0-this.size,2];

    var p3=[0-this.size,0+this.size,0+this.size,3];

    var p4=[0+this.size,0-this.size,0-this.size,4];

    var p5=[0+this.size,0-this.size,0+this.size,5];

    var p6=[0+this.size,0+this.size,0-this.size,6];

    var p7=[0+this.size,0+this.size,0+this.size,7];

    

    var points=[p0,p1,p2,p3,p4,p5,p6,p7];

    //}

    //point setting

    

    //{

    

    

    

    

    ///RotateX3D

    var sinTheta = sin(radians(this.xr));

    var cosTheta = cos(radians(this.xr));

    

    for (var n=0; n<points.length; n++) {

        var Point = points[n];

        

        var z = Point[2];

        var y = Point[1];

        Point[2] = z * cosTheta - y * sinTheta;

        Point[1] = y * cosTheta + z * sinTheta;

        

    }

    

    ///RotateY3D

    var sinTheta = sin(radians(this.yr));

    var cosTheta = cos(radians(this.yr));

    

    if(this.r===undefined){

        sinTheta = sin(radians(this.yr));

        cosTheta = cos(radians(this.yr));

    }else{

        sinTheta = sin(radians(this.yr+this.r));

        cosTheta = cos(radians(this.yr+this.r));

    }

    

    for (var n=0; n<points.length; n++) {

        var Point = points[n];

        var x = Point[0];

        var z = Point[2];

        Point[0] = x * cosTheta - z * sinTheta;

        Point[2] = z * cosTheta + x * sinTheta;

    }

    

    

    //}

    //Rotation

    

    //{

    for(var i=0;i<points.length;i++){

        points[i][0]+=this.x;

        points[i][1]+=this.y-this.shift;

        points[i][2]+=this.z;

    }

    

    

    var shortest=Infinity;

    var arr=[];

    for(var i=0;i<points.length;i++){

        if(Dist(0,0,0,points[i][0],points[i][1],points[i][2])<shortest){

            arr=[points[i]];

            shortest=Dist(0,0,0,points[i][0],points[i][1],points[i][2]);

        }else if(Dist(0,0,0,points[i][0],points[i][1],points[i][2])<=shortest+1){

            arr.push(points[i]);

        }

    }

    //}

    //Define shortest distance

    

    

    

    

    

    //{

    {

        var tag=arr[0][3];

        var P0=arr[0];

        var P1=points[adjacent(tag,0,SIDE)];

        var P2=points[adjacent(tag,1,SIDE)];

        var P3=points[adjacent(tag,2,SIDE)];

        var P4=points[adjacent(tag,0,FACE)];

        var P5=points[adjacent(tag,1,FACE)];

        var P6=points[adjacent(tag,2,FACE)];

        var P7=points[opposite(tag)];

        

        var d4=Dist(P4[0],P4[1],P4[2],0,0,0);

        var d5=Dist(P5[0],P5[1],P5[2],0,0,0);

        var d6=Dist(P6[0],P6[1],P6[2],0,0,0);

        

        fill(cc);

        face(P7[0],P7[1],P7[2],P4[0],P4[1],P4[2],P2[0],P2[1],P2[2],P6[0],P6[1],P6[2]);

        fill(cc);

        face(P7[0],P7[1],P7[2],P5[0],P5[1],P5[2],P3[0],P3[1],P3[2],P4[0],P4[1],P4[2]);

        fill(cc);

        face(P7[0],P7[1],P7[2],P6[0],P6[1],P6[2],P1[0],P1[1],P1[2],P5[0],P5[1],P5[2]);

        

        if(d6>=d4&&d6>=d5){

            fill(cc);

            face(P0[0],P0[1],P0[2],P1[0],P1[1],P1[2],P6[0],P6[1],P6[2],P2[0],P2[1],P2[2]);

        if(d4>=d5){

            fill(lerpColor(cc,lt,(d6-d4)/this.size/3));

            face(P0[0],P0[1],P0[2],P2[0],P2[1],P2[2],P4[0],P4[1],P4[2],P3[0],P3[1],P3[2]);

            fill(lerpColor(cc,lt,(d6-d5)/this.size/3));

            face(P0[0],P0[1],P0[2],P3[0],P3[1],P3[2],P5[0],P5[1],P5[2],P1[0],P1[1],P1[2]);

        }else{

            fill(lerpColor(cc,lt,(d6-d5)/this.size/3));

            face(P0[0],P0[1],P0[2],P3[0],P3[1],P3[2],P5[0],P5[1],P5[2],P1[0],P1[1],P1[2]);

            fill(lerpColor(cc,lt,(d6-d4)/this.size/3));

            face(P0[0],P0[1],P0[2],P2[0],P2[1],P2[2],P4[0],P4[1],P4[2],P3[0],P3[1],P3[2]);

        }

        }

        if(d4>=d5&&d4>=d6){

            fill(cc);

            face(P0[0],P0[1],P0[2],P2[0],P2[1],P2[2],P4[0],P4[1],P4[2],P3[0],P3[1],P3[2]);

            if(d5>=d6){

                fill(lerpColor(cc,lt,(d4-d5)/this.size/3));

                face(P0[0],P0[1],P0[2],P3[0],P3[1],P3[2],P5[0],P5[1],P5[2],P1[0],P1[1],P1[2]);

                fill(lerpColor(cc,lt,(d4-d6)/this.size/3));

                face(P0[0],P0[1],P0[2],P1[0],P1[1],P1[2],P6[0],P6[1],P6[2],P2[0],P2[1],P2[2]);

            }else{

                fill(lerpColor(cc,lt,(d4-d6)/this.size/3));

                face(P0[0],P0[1],P0[2],P1[0],P1[1],P1[2],P6[0],P6[1],P6[2],P2[0],P2[1],P2[2]);

                fill(lerpColor(cc,lt,(d4-d5)/this.size/3));

                face(P0[0],P0[1],P0[2],P3[0],P3[1],P3[2],P5[0],P5[1],P5[2],P1[0],P1[1],P1[2]);

            }

        }

        if(d5>=d4&&d5>=d6){

            fill(cc);

            face(P0[0],P0[1],P0[2],P3[0],P3[1],P3[2],P5[0],P5[1],P5[2],P1[0],P1[1],P1[2]);

            if(d4>=d6){

                fill(lerpColor(cc,lt,(d5-d4)/this.size/3));

                face(P0[0],P0[1],P0[2],P2[0],P2[1],P2[2],P4[0],P4[1],P4[2],P3[0],P3[1],P3[2]);

                fill(lerpColor(cc,lt,(d5-d6)/this.size/3));

                face(P0[0],P0[1],P0[2],P1[0],P1[1],P1[2],P6[0],P6[1],P6[2],P2[0],P2[1],P2[2]);

            }else{

                fill(lerpColor(cc,lt,(d5-d6)/this.size/3));

                face(P0[0],P0[1],P0[2],P1[0],P1[1],P1[2],P6[0],P6[1],P6[2],P2[0],P2[1],P2[2]);

                fill(lerpColor(cc,lt,(d5-d4)/this.size/3));

                face(P0[0],P0[1],P0[2],P2[0],P2[1],P2[2],P4[0],P4[1],P4[2],P3[0],P3[1],P3[2]);

            }

        }

        }//Drawing faces

    //}

    //Drawing faces oh... so messy

    }else if(this.type==="crystal"&&this.size>0){

         //{

    var p0=[0-this.size,0-this.size,0-this.size,0];

    var p1=[0-this.size,0-this.size,0+this.size,1];

    var p2=[0-this.size,0+this.size,0-this.size,2];

    var p3=[0-this.size,0+this.size,0+this.size,3];

    var p4=[0+this.size,0-this.size,0-this.size,4];

    var p5=[0+this.size,0-this.size,0+this.size,5];

    var p6=[0+this.size,0+this.size,0-this.size,6];

    var p7=[0+this.size,0+this.size,0+this.size,7];

    

    var points=[p0,p1,p2,p3,p4,p5,p6,p7];

    //}

    //point setting

    

    //{

    ///RotateX3D

    var sinTheta = sin(radians(this.xr));

    var cosTheta = cos(radians(this.xr));

    

    for (var n=0; n<points.length; n++) {

        var Point = points[n];

        

        var z = Point[2];

        var y = Point[1];

        Point[2] = z * cosTheta - y * sinTheta;

        Point[1] = y * cosTheta + z * sinTheta;

        

    }

    

    ///RotateY3D

    var sinTheta = sin(radians(this.yr));

    var cosTheta = cos(radians(this.yr));

    

    if(this.r===undefined){

        sinTheta = sin(radians(this.yr));

        cosTheta = cos(radians(this.yr));

    }else{

        sinTheta = sin(radians(this.yr+this.r));

        cosTheta = cos(radians(this.yr+this.r));

    }

    //}

    //Rotation

    

    //{

    for(var i=0;i<points.length;i++){

        points[i][0]+=this.x;

        points[i][1]+=this.y;

        points[i][2]+=this.z;

    }

    

    var shortest=Infinity;

    var arr=[];

    for(var i=0;i<points.length;i++){

        if(Dist(0,0,0,points[i][0],points[i][1],points[i][2])<shortest){

            arr=[points[i]];

            shortest=Dist(0,0,0,points[i][0],points[i][1],points[i][2]);

        }else if(Dist(0,0,0,points[i][0],points[i][1],points[i][2])<=shortest+1){

            arr.push(points[i]);

        }

    }

    //}

    //Define shortest distance

    

    //{

    {

        var tag=arr[0][3];

        var P0=arr[0];

        var P1=points[adjacent(tag,0,SIDE)];

        var P2=points[adjacent(tag,1,SIDE)];

        var P3=points[adjacent(tag,2,SIDE)];

        var P4=points[adjacent(tag,0,FACE)];

        var P5=points[adjacent(tag,1,FACE)];

        var P6=points[adjacent(tag,2,FACE)];

        var P7=points[opposite(tag)];

        

        var d4=Dist(P4[0],P4[1],P4[2],0,0,0);

        var d5=Dist(P5[0],P5[1],P5[2],0,0,0);

        var d6=Dist(P6[0],P6[1],P6[2],0,0,0);

        

        fill(crc);

        face(P7[0],P7[1],P7[2],P4[0],P4[1],P4[2],P2[0],P2[1],P2[2],P6[0],P6[1],P6[2]);

        fill(crc);

        face(P7[0],P7[1],P7[2],P5[0],P5[1],P5[2],P3[0],P3[1],P3[2],P4[0],P4[1],P4[2]);

        fill(crc);

        face(P7[0],P7[1],P7[2],P6[0],P6[1],P6[2],P1[0],P1[1],P1[2],P5[0],P5[1],P5[2]);

        

        

        if(d6>=d4&&d6>=d5){

            fill(crc);

            face(P0[0],P0[1],P0[2],P1[0],P1[1],P1[2],P6[0],P6[1],P6[2],P2[0],P2[1],P2[2]);

        if(d4>=d5){

            fill(lerpColor(crc,lt,(d6-d4)/this.size/3));

            face(P0[0],P0[1],P0[2],P2[0],P2[1],P2[2],P4[0],P4[1],P4[2],P3[0],P3[1],P3[2]);

            fill(lerpColor(crc,lt,(d6-d5)/this.size/3));

            face(P0[0],P0[1],P0[2],P3[0],P3[1],P3[2],P5[0],P5[1],P5[2],P1[0],P1[1],P1[2]);

        }else{

            fill(lerpColor(crc,lt,(d6-d5)/this.size/3));

            face(P0[0],P0[1],P0[2],P3[0],P3[1],P3[2],P5[0],P5[1],P5[2],P1[0],P1[1],P1[2]);

            fill(lerpColor(crc,lt,(d6-d4)/this.size/3));

            face(P0[0],P0[1],P0[2],P2[0],P2[1],P2[2],P4[0],P4[1],P4[2],P3[0],P3[1],P3[2]);

        }

        }

        if(d4>=d5&&d4>=d6){

            fill(crc);

            face(P0[0],P0[1],P0[2],P2[0],P2[1],P2[2],P4[0],P4[1],P4[2],P3[0],P3[1],P3[2]);

            if(d5>=d6){

                fill(lerpColor(crc,lt,(d4-d5)/this.size/3));

                face(P0[0],P0[1],P0[2],P3[0],P3[1],P3[2],P5[0],P5[1],P5[2],P1[0],P1[1],P1[2]);

                fill(lerpColor(crc,lt,(d4-d6)/this.size/3));

                face(P0[0],P0[1],P0[2],P1[0],P1[1],P1[2],P6[0],P6[1],P6[2],P2[0],P2[1],P2[2]);///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            }else{

                fill(lerpColor(crc,lt,(d4-d6)/this.size/3));

                face(P0[0],P0[1],P0[2],P1[0],P1[1],P1[2],P6[0],P6[1],P6[2],P2[0],P2[1],P2[2]);

                fill(lerpColor(crc,lt,(d4-d5)/this.size/3));

                face(P0[0],P0[1],P0[2],P3[0],P3[1],P3[2],P5[0],P5[1],P5[2],P1[0],P1[1],P1[2]);

            }

        }

        if(d5>=d4&&d5>=d6){

            fill(crc);

            face(P0[0],P0[1],P0[2],P3[0],P3[1],P3[2],P5[0],P5[1],P5[2],P1[0],P1[1],P1[2]);

            if(d4>=d6){

                fill(lerpColor(crc,lt,(d5-d4)/this.size/3));

                face(P0[0],P0[1],P0[2],P2[0],P2[1],P2[2],P4[0],P4[1],P4[2],P3[0],P3[1],P3[2]);

                fill(lerpColor(crc,lt,(d5-d6)/this.size/3));

                face(P0[0],P0[1],P0[2],P1[0],P1[1],P1[2],P6[0],P6[1],P6[2],P2[0],P2[1],P2[2]);

            }else{

                fill(lerpColor(crc,lt,(d5-d6)/this.size/3));

                face(P0[0],P0[1],P0[2],P1[0],P1[1],P1[2],P6[0],P6[1],P6[2],P2[0],P2[1],P2[2]);

                fill(lerpColor(crc,lt,(d5-d4)/this.size/3));

                face(P0[0],P0[1],P0[2],P2[0],P2[1],P2[2],P4[0],P4[1],P4[2],P3[0],P3[1],P3[2]);

            }

        }

        

        }//Drawing faces

    //}

    //Drawing faces oh... so messy

    }else if(this.type==="particle"){

        particle(this.x,this.y,this.z,pc);

    }else if(this.type==="spark"){

        particle(this.x,this.y,this.z,spc);

    }

    

    

};



cube.prototype.move=function(){

    if(this.type==="creature"){

    //{

    while(this.z<100){

        this.z+=400;

    }

    while(this.z>500){

        this.z-=400;

    }

    while(this.x<-125){

        this.x+=250;

    }

    while(this.x>125){

        this.x-=250;

    }

    //}//Position

    

    

    //{

    if(this.y>=150-this.size&&this.ys>0){

        if(this.ys<2){

            this.ys=0;

            this.y=150-this.size;

            this.mode="wander";

            if(random(0,100)>50){

                this.mode="shake";

            }

        }

        if(this.ys>=2){

            this.ys*=-0.5;

        }

    }

    

    if(this.y<150-this.size){

        this.mode="fly";

    }

    //}

    

    this.x+=this.xs;

    this.z+=this.zs;

    this.y+=this.ys;

    

    if(this.mode==="wander"){

        this.xs=cos(radians(this.yr+90))*0.5;

        this.zs=sin(radians(this.yr+90))*0.5;

        if(random(0,100)>99&&this.y===150-this.size){

            this.mode="jump";

        }

        if(random(0,100)>99){

            this.mode="rotate1";

        }

        if(random(0,100)>99){

            this.mode="rotate2";

        }

        if(random(0,100)>97){

            this.mode="roll";

        }

        if(random(0,100)>99.9){

            this.mode="shake";

        }

    }

    if(this.mode==="rotate1"){

        this.xs=0;

        this.zs=0;

        this.yr--;

        if(random(0,100)>98){

            this.mode="wander";

        }

    }

    if(this.mode==="rotate2"){

        this.xs=0;

        this.zs=0;

        this.yr++;

        if(random(0,100)>98){

            this.mode="wander";

        }

    }

    if(this.mode==="jump"){

        this.xs=cos(this.yr+90)*0.5;

        this.zs=sin(this.yr+90)*0.5;

        this.ys-=random(2,3);

        if(this.mode==="happy"){

            

        }

        this.mode="fly";

    }

    if(this.mode==="fly"){

        this.ys+=0.1;

        if(this.emotion==="happy"){

            if(this.turn==="clock"){

                this.yr+=5;

            }else{

                this.yr-=5;

            }

        }

        

    }

    

    if(this.mode!=="fly"&&this.emotion==="happy"&&random(0,100)>90){

        this.mode="jump";

    }

    

    if(random(0,100)>99.9){

        this.emotion="normal";

        this.color=Green;

    }

    

    if(this.emotion==="normal"){

        this.color=Green;

    }

    if(this.emotion==="happy"){

        this.color=Grass;

        this.xr=0;

    }

    if(this.mode==="roll"){

        this.xr+=30/this.size;

        this.xs=cos(radians(this.yr+90))*0.5;

        this.zs=sin(radians(this.yr+90))*0.5;

        var e0=[0+sin(radians(-this.xr-45))*this.size*sqrt(2),0+cos(radians(-this.xr-45))*this.size*sqrt(2),0];

        var e1=[0+sin(radians(-this.xr+45))*this.size*sqrt(2),0+cos(radians(-this.xr+45))*this.size*sqrt(2),1];

        var e2=[0+sin(radians(-this.xr+135))*this.size*sqrt(2),0+cos(radians(-this.xr+135))*this.size*sqrt(2),2];

        var e3=[0+sin(radians(-this.xr+225))*this.size*sqrt(2),0+cos(radians(-this.xr+225))*this.size*sqrt(2),3];

        var edges=[e0,e1,e2,e3];

        

        var num=-Infinity;

        var Save;

        for(var q=0;q<edges.length;q++){

            if(num<edges[q][1]){

                num=edges[q][1];

                Save=q;

            }

        }

        this.shift=edges[Save][1]-this.size;

        

        if(this.xr>=89&&this.xr<=91&&random(0,100)>30){

            this.shift=0;

            this.xr=0;

            this.mode="wander";

        }

        if(this.xr>90){

            this.xr-=90;

        }

    }

    if(this.mode==="shake"){

        if(random(0,100)>9){

        cubes.push(new cube(this.x,this.y,this.z,0,"particle",random(-1,1),random(-3,-1),random(-1,1)));

        }

        this.xs=0;

        this.zs=0;

        if(this.r===undefined){

            this.r=0;

            this.R=0;

        }

        this.r=sin(radians(this.R))*20;

        this.R+=10;

        if(abs(this.r)<2&&random(0,100)>50){

            this.mode="wander";

        }

    }

    

    if(this.mode==="seeking"){

        this.xr=0;

        this.shift=0;

        if(this.turn==="clock"){

            this.yr--;

        }else if(this.turn==="counter"){

            this.yr++;

        }else{

            this.xs*=0.2;

            this.ys*=0.2;

        }

        this.xs=cos(radians(this.yr+90))*0.25;

        this.zs=sin(radians(this.yr+90))*0.25;

        if(random(0,100)>99){

            this.emotion="normal";

            this.mode="shake";

        }else{

            

        }

    }

    

    if(this.emotion==="interested"){

        this.mode="seeking";

        if(random(0,100)>95){

            this.emotion="normal";

            var chance=random(0,100);

            if(chance<30){

                this.mode="jump";

            }else if(chance<60){

                this.mode="roll";

            }else if(chance<70){

                this.mode="shake";

            }else{

                this.emotion="happy";

            }

        }

    }else if(this.mode==="seeking"){

        this.mode="wander";

    }

    

    }else if(this.type==="crystal"&&this.size>0){

        if(this.z<100){

        this.size=0;

    }

    if(this.z>500){

        this.size=0;

    }

    if(this.x<-125){

        this.size=0;

    }

    if(this.x>125){

        this.size=0;

    }

    

    if(this.y<125-this.size){

        this.ys+=0.2;

    }

    this.x+=this.xs;

    this.z+=this.zs;

    this.y+=this.ys;

    

    if(this.y>145-this.size){

        this.ys*=-0.6;

        this.xs*=0.6;

        this.zs*=0.6;

    }

    

    this.size-=0.01;

    

    this.xr+=this.xrs*2/this.size;

    this.xrs*=0.99;

    this.yr+=this.yrs*2/this.size;

    this.yrs*=0.99;

    if(random(0,100)>95){

        this.xrs+=random(5,-5);

        this.yrs+=random(5,-5);

    }

    }else if(this.type==="particle"){

        if(this.dead===false){

        if(this.y<149){

            this.ys+=0.2;

        }else{

            this.y=149;

            this.xs=0;

            this.ys=0;

            this.zs=0;

        }

        this.x+=this.xs;

        this.y+=this.ys;

        this.z+=this.zs;

        if(random(0,100)>99){

            this.dead=true;

        }

        }

    

    }else if(this.type==="spark"){

        if(this.y>=150){

            this.ys=-abs(this.ys);

        }else if(this.y<=120){

            this.ys=abs(this.ys);

        }

        if(this.z<100){

            this.z=500;

        }else if(this.z>500){

            this.z=100;

        }

        if(this.x>125){

            this.x=-125;

        }else if(this.x<-125){

            this.x=125;

        }

        this.x+=this.xs;

        this.y+=this.ys;

        this.z+=this.zs;

    }

};



cube.prototype.interact=function(that){

    if(this.type==="creature"&&that.type==="crystal"&&that.size>0){

        if(Dist(this.x,this.y,this.z,that.x,that.y,that.z)<60&&this.mode==="wander"&&random(0,100)>99){

            if(random(0,100)>30){

                this.turn="clock";

            }else{

                this.turn="counter";

            }

            this.color=Grass;

            this.emotion="happy";

            

        }

    }

    if(this.type==="creature"&&that.type==="particle"&&that.dead===false&&this.mode!=="roll"){

        if(Dist(this.x,this.y,this.z,that.x,that.y,that.z)<20&&this.mode==="wander"&&random(0,100)>70){

            if(random(0,100)<25){

                this.turn="clock";

            }else if(random(0,100)<33.333333333333333333333){

                this.turn="counter";

            }else{

                this.turn="stay";

            }

            this.color=[0,255,0];

            this.emotion="interested";

        }

    }

};



//}

//Constructor and methods

for(var i=0;i<15;i++){

    cubes.push(new cube(random(-125,125),random(100,50),random(100,400),random(3,7),"creature"));

    

}

for(var i=0;i<40;i++){

cubes.push(new cube(random(-125,125),random(119,149),random(100,400),random(3,7),"spark",random(-0.1,0.1),random(-0.1,0.1),random(-0.1,0.1)));

}



cursor("none");

mouseReleased=function(){

    cubes.push(new cube(mouseX/2-150,140,-mouseY+700,7,"crystal",0,0,0));

};

var fr=0;

var F=createFont("monospace");

textFont(F);



var textY=600;

var Speed=-15;



if(testing){

    test1();

}



//scale(1/4);



draw= function() {

    

    TIMER++;

    //println(1+(sin(TIMER/1))*2);

    

    var KEY=1+(sin(TIMER/400))*2;

    

    if(KEY!==constrain(KEY,0,2)){

        TIMER+=3;

        //println("WHAT");

    }

    

    KEY=constrain(KEY,0,2);

    KEY/=2;

    

    sc=lerpColor(dayColor,nightSkyColor,KEY);

    crc=lerpColor(dayCrystalColor,nightCrystalColor,KEY);

    cc=lerpColor(dayCubeColor,nightCubeColor,KEY);

    lt=lerpColor(dayLight,nightLight,KEY);

    pc=lerpColor(dayParticleColor,nightParticleColor,KEY);

    spc=lerpColor(daySparkColor,nightSparkColor,KEY);

    

    fill(0,255,150,50);

    stroke(0,255,150,100);

    rect(0,500,600,100);

    

    pushMatrix();

    translate(300,0);

    background(sc);

    

    

    

    

    

    

    if(testing===false){

    for(var i=0;i<cubes.length-1;i++){

        for(var j=0;j<cubes.length-1;j++){

            if(cubes[j].z<cubes[j+1].z){

                var s1=cubes[j];

                var s2=cubes[j+1];

                cubes[j]=s2;

                cubes[j+1]=s1;

            }

        }

    }

    for(var i=0;i<cubes.length;i++){

        cubes[i].show();

        cubes[i].move();

        for(var j=0;j<cubes.length;j++){

            if(j!==i){

                cubes[i].interact(cubes[j]);

            }

        }

    }

    

    }

    

    Cursor();



    popMatrix();

    

    if(testing===false){

    fill(255,255,255,textY);

    rect(0,0,600,600);

    textY-=abs(Speed);

    Speed+=0.4;

    fill(100,255,100,255);

    textSize(40);

    textAlign(CENTER,DOWN);

    text("Great Cat\nPresents",300,textY);

    }

    var alive=[];

    for(var i=0;i<cubes.length;i++){

        if(cubes[i].type!=="particle"){

            alive.push(cubes[i]);

        }else if(cubes[i].dead===false){

            alive.push(cubes[i]);

        }

    }

    cubes=alive;

    firstFrame=false;

};



      









    }};



    // Get the canvas that Processing-js will use

    var canvas = document.getElementById("mycanvas"); 

    // Pass the function sketchProc (defined in myCode.js) to Processing's constructor.

    var processingInstance = new Processing(canvas, sketchProc); 
