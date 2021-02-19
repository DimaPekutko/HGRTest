const { softmax } = require("@tensorflow/tfjs-core");
const Model = require("./Model");
let videoElement = document.querySelector("#videoElement");
let videoCanvas = document.querySelector("#videoCanvas");
let model = new Model();

module.exports = class App {
    constructor() {
        this.currentState = {
            gesturesHistory: [],
            lastPosX: "",
            lastPosY: "",
            status: "waiting",
            directInPercent: {
                up: "",
                right: "",
                down: "",
                left: ""
            }
        };

        /* afkScore need to execute model mistake (sometimes it don't
        recognise a hand). If afkScore is under 3, then person just took 
        his hand away */
        this.afkScore = 0; 
        

    }
    async load() {
        this.userCamera = await this.loadCamera().then(async () => {
            this.handposeModel = await model.load().then(() => {
                this.videoElement = videoElement;
                this.ctxVideo = videoCanvas.getContext("2d");
                this.changeCanvas();
            });
        });
    }
    async detect() {
        let predictions = model.detectGesture(this.videoElement);
        predictions.then((prediction) => {
            if (prediction) {
                this.afkScore = 0;
                this.updateCurrentState(prediction);
                this.drawPoint(prediction.landmarks[0][0], prediction.landmarks[0][1]);
            } else {
                //update current state for no hand case
                this.afkScore++;
                this.currentState.directInPercent = {
                    up: 0,
                    right: 0,
                    down: 0,
                    left: 0
                };
                if(this.afkScore > 3) {
                    this.gesturesHistory = [];
                    this.currentState.lastPosX = 0;
                    this.currentState.lastPosY = 0;
                    this.currentState.status = "no_hand";
                    console.log("!no hand");
                } 
            }
        });
    }
    getCurrentState(callback, speed) {
        setInterval(() => {
            this.detect();
            callback(this.currentState);
        }, speed);
    }
    async loadCamera() {
        if (navigator.mediaDevices.getUserMedia) {
            try {
                videoElement.srcObject = await navigator.mediaDevices.getUserMedia({ video: true });
            } catch (error) {
                console.log("Camera is not loaded");
            }
        }
    }
    changeCanvas() {
        videoCanvas.width = this.videoElement.clientWidth;
        videoCanvas.height = this.videoElement.clientHeight;
    }
    drawPoint(x, y) {
        this.ctxVideo.beginPath();
        this.ctxVideo.arc(x, y, 5, 0, 2 * Math.PI);

        // Set line color
        this.ctxVideo.fillStyle = "red";
        this.ctxVideo.fill();
    }
    updateCurrentState(prediction) {
        //update gesturesHistory and status
        let cs = this.currentState;
        if (cs.gesturesHistory.length) {
            if (cs.gesturesHistory[cs.gesturesHistory.length - 1] != prediction.gestureName) {
                this.currentState.gesturesHistory.push(prediction.gestureName);
            }
        } else {
            this.currentState.gesturesHistory.push(prediction.gestureName);
        }
        if (prediction.gestureName == "Fist") {
            this.currentState.status = "waiting"
        } else {
            this.currentState.status = "tracking"
        }
        //update lastPosX, lastPosY and directions
        if (cs.lastPosX && cs.lastPosY) {
            let
                lastX = cs.lastPosX,
                lastY = cs.lastPosY,
                x = prediction.landmarks[0][0],
                y = prediction.landmarks[0][1];
            let xVector = x - lastX;
            let yVector = y - lastY;
            let horisontalPercent = (Math.abs(xVector) / this.videoElement.clientWidth) * 100;
            let verticalPercent = (Math.abs(yVector) / this.videoElement.clientHeight) * 100;
            if (xVector > 0) {
                this.currentState.directInPercent.right = horisontalPercent;
                this.currentState.directInPercent.left = 0;
            } else {
                this.currentState.directInPercent.left = horisontalPercent;
                this.currentState.directInPercent.right = 0;
            }
            if (yVector > 0) {
                this.currentState.directInPercent.down = verticalPercent;
                this.currentState.directInPercent.up = 0;
            } else {
                this.currentState.directInPercent.up = verticalPercent;
                this.currentState.directInPercent.down = 0;
            }
        }
        this.currentState.lastPosX = prediction.landmarks[0][0];
        this.currentState.lastPosY = prediction.landmarks[0][1];
    }
}