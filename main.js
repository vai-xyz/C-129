song="";
leftWristX="";
leftWristY="";
rightWristX="";
rightWristY="";
scoreleftWrist="";
function preload(){
    song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is initialized");
}

function gotPoses(results){
if(results.length >0){
   console.log(results);

   scoreleftWrist= results[0].pose.keypoints[9].score;
   console.log("scoreLeftWrist= "+scoreleftWrist);

   leftWristX= results[0].pose.leftWrist.x;
   leftWristY= results[0].pose.leftWrist.y;
   console.log("leftWristX= "+leftWristX+"leftWristY= "+leftWristY);

   rightWristX= results[0].pose.rightWrist.x;
rightWristY= results[0].pose.rightWrist.y;
   console.log("rightWristX= "+rightWristX+"rightWristY= "+rightWristY);
}
}

function draw(){
    image(video,0,0,600,500);
    if(scoreleftWrist>0.2){
    fill("#FF0000");
    stroke("#FF0000");
    circle(leftWristX,leftWristY,20);
    InNumberLeftWristY= Number(leftWristY);
    remove_decimal=floor(leftWristY);
    volume=remove_decimal/500;
    document.getElementById("volume").innerHTML="Volume = "+volume;
    song.setVolume(volume);
    }
}

function play(){
song.play();
song.setVolume(1);
song.rate(1);
}