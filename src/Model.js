require('@tensorflow/tfjs-backend-webgl'); // handpose does not itself require a backend, so you must explicitly install one.
require('@tensorflow/tfjs-converter');
require('@tensorflow/tfjs-core');
const handpose = require('@tensorflow-models/handpose');
const fp = require('fingerpose');
const {FistGesture} = require("./gestures/FistGesture");


module.exports = class Model {
    constructor() {
        this.handpose = handpose;
        this.fp = fp;
        this.GE = new fp.GestureEstimator([
            FistGesture,
        ]);
    }
    async load() {
        this.model = await this.handpose.load();
    }
    async detectGesture(video) {
        let returnData = {
            landmarks: "",
            gestureName: "",
            gestureConfigence: ""
        };
        let positionPrediction = await this.model.estimateHands(video);
        if(positionPrediction.length) {
            let gesturePrediction = await this.GE.estimate(positionPrediction[0].landmarks, 7.5);
            returnData.landmarks = positionPrediction[0].landmarks;
            if(gesturePrediction.gestures.length) {
                returnData.gestureName = gesturePrediction.gestures[0].name;
                returnData.gestureConfigence = gesturePrediction.gestures[0].confidence;
            } else {
                returnData.gestureName = "JustHand";
                returnData.gestureConfigence = 0;
            }
            return returnData;  
        } 
        return 0;
    }
}