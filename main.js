sound=""

function setup(){
    canvas= createCanvas(600, 500);
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
    
    fill("red");
    stroke("red");

    if(scoreRightWrist>0.2){
        circle(rightWristX,rightWristY, 20);

        if(rightWristY > 0 && rightWristY <= 100){
            document.getElementById("speed").innerHTML= "Speed= 0.5x";
            sound.rate(0.5);
        }
        else if(rightWristY > 100 && rightWristY <= 200){
            document.getElementById("speed").innerHTML= "Speed= 1x";
            sound.rate(1);
        }
        else if(rightWristY > 200 && rightWristY <= 300){
            document.getElementById("speed").innerHTML= "Speed= 1.5x";
            sound.rate(1.5);
        }
        else if(rightWristY > 300 && rightWristY <= 400){
            document.getElementById("speed").innerHTML= "Speed= 2x";
            sound.rate(2);
        }
        else if(rightWristY > 400){
            document.getElementById("speed").innerHTML= "Speed= 2.5x";
            sound.rate(2.5);
        }
    }

    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY, 20);
        numberLeftWristY= Number(leftWristY);
        remove_decimals= floor(numberLeftWristY);
        volume= remove_decimals/500;
        sound.setVolume(volume);
        document.getElementById("volume").innerHTML= "Volume= " + volume;
    }
}

function preload(){
    sound=loadSound("music.mp3")
}

scoreRightWrist=0;
scoreLeftWrist=0;

leftWristX=0;
leftWristY=0;

rightWristX=0;
rightWristY=0;

function play(){
    sound.play();
    sound.volume(1);
    sound.rate(1);
}

function gotPoses(results){
    if (results.length > 0){
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist );

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;

    }
}