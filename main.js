sound=""

function setup(){
    canvas= canvasCreate(600, 500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet Is Initialized!")
}
function draw(){
    image(video, 0,0, 600,500);
}

function preload(){
    sound=loadSound("music.mp3")
}

function play(){
    song.play();
}

function gotPoses(results){
    if (results.length > 0){
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist")
    }
}