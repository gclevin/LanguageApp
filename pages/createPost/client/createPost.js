var File;



Template.createPost.helpers({
  recording: function(){
    const status = Recording.findOne();
    console.log("status='"+status.recording+"'"); console.dir(status);
    if (status.recording == true){
      toggleRecording(recordButton);
    }
    return status;
  }
})

let recordButton=null;

Template.createPost.onRendered(function(){
  initAudio();
  recordButton = document.getElementById("record")
})

Template.createPost.events({
  "click #record": function(event){
    toggleRecording(document.getElementById("record"));
  },
  "click .js-submit": function(event){
    event.preventDefault();
    const title= $(".js-title").val();
    const text= $(".js-text").val();


    File.metadata= {
      ownerId:Meteor.userId(),
      title:title,
      text:text
    }

    Recordings.insert(File);
    //console.dir(blob);
    Router.go('/posts');
  }
})

Template.audio.helpers({
  recording: function(){
    const status = Recording.findOne();
    console.log("status='"+status.recording+"'"); console.dir(status);
    if (status.recording == true){
      toggleRecording(recordButton);
    }
    return status;
  }
})

//let recordButton=null;

Template.audio.onRendered(function(){
  initAudio();
  recordButton = document.getElementById("record")
})

Template.audio.events({
  "click #record": function(event){
    toggleRecording(document.getElementById("record"));
  },
  "click .js-submit": function(event){
    event.preventDefault();
    //const title= $(".js-title").val();
    //const text= $(".js-text").val();
    Recordings.insert(File);
    //console.dir(blob);
    Router.go('/posts');
  }

})

Template.createAssignment.helpers({
  recording: function(){
    const status = Recording.findOne();
    console.log("status='"+status.recording+"'"); console.dir(status);
    if (status.recording == true){
      toggleRecording(recordButton);
    }
    return status;
  }
})



Template.createAssignment.onRendered(function(){
  initAudio();
  recordButton = document.getElementById("record")
})

Template.createAssignment.events({
  "click #record": function(event){
    toggleRecording(document.getElementById("record"));

  },



  "click .js-submit": function(event){
    event.preventDefault();
    const title= $(".js-title").val();
    const text= $(".js-text").val();
    const audio= $(".js-audio").val();
    if (audio=="no audio"){
      File= new FS.File({});
      File.metadata={
      userId:Meteor.userId(),
      title:title,
      text:text,
      course:this._id,
      showAudio: false,
      posted: false

      }
    }

    else{
    console.dir(this._id);
    console.log("test what this contains");
    console.dir(this);

    //Assginment fields;
    File.metadata= {
      userId:Meteor.userId(),
      title:title,
      text:text,
      course:this._id,
      showAudio:true,
      posted: false
    }
  }
   const assignmentId= Assignments.insert(File);
    Router.go('makeQuestions',{"_id":assignmentId._id});
    //console.dir(blob);


    //const instance= Template.instance();
    //const c = instance.state.get("newAssignment");
    //console.dir(c);
    //instance.state.set("newAssignment", false);
  }
})

Template.answerQuestion.helpers({
  recording: function(){
    const status = Recording.findOne();
    console.log("status='"+status.recording+"'"); console.dir(status);
    if (status.recording == true){
      toggleRecording(recordButton);
    }
    return status;
  }
})

//let recordButton=null;

Template.answerQuestion.onRendered(function(){
  initAudio();
  recordButton = document.getElementById("record")
})

Template.answerQuestion.events({
  "click #record": function(event){
    toggleRecording(document.getElementById("record"));
  },
  "click .js-submit": function(event, template){
    event.preventDefault();

    const x= Answers.findOne({"metadata.question": this._id, "metadata.ownerId": Meteor.userId()})
    const y= TextAnswers.findOne({"question": this._id, "ownerId": Meteor.userId()})
    if(x){
    Answers.remove({_id: x._id})
  }
    if(y){
    TextAnswers.remove({_id: y._id})
  }
    const title= $("").val();
    const text= $(".js-text").val();
    //const title= $("").val();

    if (this.metadata.type=="text"){
      const answer={
        ownerId:Meteor.userId(),
        question:this._id,
        text:text,
      }

      TextAnswers.insert(answer)
    } else{


    //console.dir(File);

    File.metadata= {
      ownerId:Meteor.userId(),
      question:this._id,
      text:text,
    }


    Answers.insert(File);
  //console.log("the submission insert returns this id ");
  //console.dir(this);
    //console.dir(blob);
  }
    Router.go('showAssignment',{"_id":this.metadata.assignment});
  }


})



Template.makeQuestions.helpers({
  recording: function(){
    const status = Recording.findOne();
    console.log("status='"+status.recording+"'"); console.dir(status);
    if (status.recording == true){
      toggleRecording(recordButton);
    }
    return status;
  }
})

//let recordButton=null;

Template.makeQuestions.onRendered(function(){
  initAudio();
  recordButton = document.getElementById("record")
})

Template.makeQuestions.events({
  "click #record": function(event){
    toggleRecording(document.getElementById("record"));
  },
  "click .js-enter": function(event){
    event.preventDefault();
    const instance= Template.instance();
    const audio= instance.state.get("audio");
    const questions= Questions.find({"metadata.assignment": this._id}).count()+1;

    const text= $(".js-text").val();
    const type=$(".js-type").val();

    if(audio){
    //const title= $("").val();
    //const text= $(".js-text").val();

    File.metadata= {
      ownerId:Meteor.userId(),
      assignment:this._id,
      question:questions,
      text:text,
      type: type,
      audio: true
    }
  } else{
    File= new FS.File({})
    File.metadata={
      ownerId:Meteor.userId(),
      assignment:this._id,
      question:questions,
      text:text,
      type: type,
      audio: false
    }
  }

   Questions.insert(File);
  //console.log("the submission insert returns this id ");
  //console.dir(submissionId);
    //console.dir(blob);
    const c = instance.state.get("showQuestion");
    console.dir(c);
    instance.state.set("showQuestion", false);
    instance.state.set("audio", false);
  }


})

function extract(data,h){
  // this returns the slice of the data whose absolute value
  // is at least h
  let pos=0;
  while (pos < data.length && Math.abs(data[pos])< h) {
    pos=pos+1;
  }
  const start = pos;
  pos = data.length-10000;
  while (pos > start && Math.abs(data[pos])<h) {
    pos = pos -1;
  }
  const end = pos;
  let len = data.length-20000;
  const allRMS = rms(data);
  const vowelRMS =  rms(data.slice(10000+len/3,10000+2*len/3));
  const status = Recording.findOne();
  Recording.update(this._id,
    {$set:{rms:vowelRMS,recording:"not recording"}});
  console.log("rms = "+allRMS);
  console.log("vowel rms = "+vowelRMS);
  return theData.slice(Math.max(0,start-20000),Math.min(data.length,end+20000));

}

function rms(data){
  let pos=0;
  let sum=0;
  for(pos=0; pos<data.length;pos++){
    const x = data[pos];
    sum = sum+x*x;
  }
  return Math.sqrt(sum/data.length);
}


function drawBuffer( width, height, context, data ) {
  theData = data; // data is an array of 32 bit doubles
  // in the range -1 to 1
  console.log("theData.length="+data.length);
  data=extract(theData,0.15);
  console.log("data.length="+data.length);

    var step = Math.ceil( data.length / width );
    var amp = height / 2;
    context.fillStyle = "silver";
    context.clearRect(0,0,width,height);
    for(var i=0; i < width; i++){
        var min = 1.0;
        var max = -1.0;
        for (j=0; j<step; j++) {
            var datum = data[(i*step)+j];
            if (datum < min)
                min = datum;
            if (datum > max)
                max = datum;
        }
        context.fillRect(i,(1+min)*amp,1,Math.max(1,(max-min)*amp));
    }
}


/* NEXT We define the Recorder object */
/*License (MIT)

Copyright Â© 2013 Matt Diamond

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of
the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
*/

(function(window){

  var WORKER_PATH = '/recorderWorker.js';




  var Recorder = function(source, cfg){
    var config = cfg || {};
    var bufferLen = config.bufferLen || 4096;
    this.context = source.context;
    if(!this.context.createScriptProcessor){
       this.node = this.context.createJavaScriptNode(bufferLen, 2, 2);
    } else {
       this.node = this.context.createScriptProcessor(bufferLen, 2, 2);
    }

    var worker = new Worker(config.workerPath || WORKER_PATH);
    worker.postMessage({
      command: 'init',
      config: {
        sampleRate: this.context.sampleRate
      }
    });
    var recording = false,
      currCallback;

    this.node.onaudioprocess = function(e){
      if (!recording) return;
      worker.postMessage({
        command: 'record',
        buffer: [
          e.inputBuffer.getChannelData(0),
          e.inputBuffer.getChannelData(1)
        ]
      });
    }

    this.configure = function(cfg){
      for (var prop in cfg){
        if (cfg.hasOwnProperty(prop)){
          config[prop] = cfg[prop];
        }
      }
    }

    this.record = function(){
      recording = true;
    }

    this.stop = function(){
      recording = false;
    }

    this.clear = function(){
      worker.postMessage({ command: 'clear' });
    }

    this.getBuffers = function(cb) {
      currCallback = cb || config.callback;
      worker.postMessage({ command: 'getBuffers' })
    }

    this.exportWAV = function(cb, type){
      currCallback = cb || config.callback;
      type = type || config.type || 'audio/wav';
      if (!currCallback) throw new Error('Callback not set');
      worker.postMessage({
        command: 'exportWAV',
        type: type
      });
    }

    this.exportMonoWAV = function(cb, type){
      currCallback = cb || config.callback;
      type = type || config.type || 'audio/wav';
      if (!currCallback) throw new Error('Callback not set');
      worker.postMessage({
        command: 'exportMonoWAV',
        type: type
      });
    }

    worker.onmessage = function(e){
      var blob = e.data;
      currCallback(blob);
    }

    source.connect(this.node);
    this.node.connect(this.context.destination);   // if the script node is not connected to an output the "onaudioprocess" event is not triggered in chrome.
  };

  Recorder.setupDownload = function(blob, filename){
    var url = (window.URL || window.webkitURL).createObjectURL(blob);
    var link = document.getElementById("save");
    link.href = url;
    link.download = filename || 'output.wav';

    var newFile= new FS.File(blob);
    newFile.ownerId= this.userId;
    File=newFile;

    //Recordings.insert(newFile);
    //console.dir(Recordings.find());


  }




  window.Recorder = Recorder;

})(window);




/* Copyright 2013 Chris Wilson

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();
var audioInput = null,
    realAudioInput = null,
    inputPoint = null,
    audioRecorder = null;
var rafID = null;
var analyserContext = null;
var canvasWidth, canvasHeight;
var recIndex = 0;

/* TODO:

- offer mono option
- "Monitor input" switch
*/

function saveAudio() {
    audioRecorder.exportWAV( doneEncoding );
    // could get mono instead by saying
    // audioRecorder.exportMonoWAV( doneEncoding );
}

function gotBuffers( buffers ) {
    var canvas = document.getElementById( "wavedisplay" );

    drawBuffer( canvas.width, canvas.height, canvas.getContext('2d'), buffers[0] );

    // the ONLY time gotBuffers is called is right after a new recording is completed -
    // so here's where we should set up the download.
    audioRecorder.exportWAV( doneEncoding );
}

function doneEncoding( blob ) {
    Recorder.setupDownload( blob, "myRecording" + ((recIndex<10)?"0":"") + recIndex + ".wav" );
    recIndex++;
}

function toggleRecording( e ) {
  console.dir(e);
    if (e.classList.contains("recording")) {
        // stop recording
        audioRecorder.stop();
        e.classList.remove("recording");
        audioRecorder.getBuffers( gotBuffers );
        var blob=e.data;



        const status = Recording.findOne();
        Recording.update(this._id,{$set:{recording:"not recording"}});
    } else {
        // start recording
        if (!audioRecorder)
            return;
        e.classList.add("recording");
        audioRecorder.clear();
        audioRecorder.record();
        window.setTimeout(function(){toggleRecording(e);}, 100000);
    }
}

function convertToMono( input ) {
    var splitter = audioContext.createChannelSplitter(2);
    var merger = audioContext.createChannelMerger(2);

    input.connect( splitter );
    splitter.connect( merger, 0, 0 );
    splitter.connect( merger, 0, 1 );
    return merger;
}

function cancelAnalyserUpdates() {
    window.cancelAnimationFrame( rafID );
    rafID = null;
}

function updateAnalysers(time) {
    if (!analyserContext) {
        var canvas = document.getElementById("analyser");
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        analyserContext = canvas.getContext('2d');
    }

    // analyzer draw code here
    {
        var SPACING = 3;
        var BAR_WIDTH = 1;
        var numBars = Math.round(canvasWidth / SPACING);
        var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);

        analyserNode.getByteFrequencyData(freqByteData);

        analyserContext.clearRect(0, 0, canvasWidth, canvasHeight);
        analyserContext.fillStyle = '#F6D565';
        analyserContext.lineCap = 'round';
        var multiplier = analyserNode.frequencyBinCount / numBars;

        // Draw rectangle for each frequency bin.
        for (var i = 0; i < numBars; ++i) {
            var magnitude = 0;
            var offset = Math.floor( i * multiplier );
            // gotta sum/average the block, or we miss narrow-bandwidth spikes
            for (var j = 0; j< multiplier; j++)
                magnitude += freqByteData[offset + j];
            magnitude = magnitude / multiplier;
            var magnitude2 = freqByteData[i * multiplier];
            analyserContext.fillStyle = "hsl( " + Math.round((i*360)/numBars) + ", 100%, 50%)";
            analyserContext.fillRect(i * SPACING, canvasHeight, BAR_WIDTH, -magnitude);
        }
    }

    rafID = window.requestAnimationFrame( updateAnalysers );
}

function toggleMono() {
    if (audioInput != realAudioInput) {
        audioInput.disconnect();
        realAudioInput.disconnect();
        audioInput = realAudioInput;
    } else {
        realAudioInput.disconnect();
        audioInput = convertToMono( realAudioInput );
    }

    audioInput.connect(inputPoint);
}

function gotStream(stream) {
  console.log("creating the audio nodes");
  console.dir(stream);
  console.dir(audioContext);
    inputPoint = audioContext.createGain();

    // Create an AudioNode from the stream.
    realAudioInput = audioContext.createMediaStreamSource(stream);
    audioInput = realAudioInput;
    audioInput.connect(inputPoint);
    console.log("conecting audioInput to inputPoint")
//    audioInput = convertToMono( input );
    // connect an analyzer to the AudioInput
    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 2048;
    inputPoint.connect( analyserNode );
    console.log("connecting analyzer to inputPoint")

    console.log("creating recorder from inputpoint");
    audioRecorder = new Recorder( inputPoint );

    zeroGain = audioContext.createGain();
    zeroGain.gain.value = 0.0;
    inputPoint.connect( zeroGain );
    zeroGain.connect( audioContext.destination );
    console.log("connecting zeroGain to destination")
    updateAnalysers();
}

function initAudio() {
        if (!navigator.getUserMedia)
            navigator.getUserMedia = (navigator.getUserMedia ||
                                      navigator.webkitGetUserMedia ||
                                      navigator.mozGetUserMedia ||
                                      navigator.msGetUserMedia);

        if (!navigator.cancelAnimationFrame)
            navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
        if (!navigator.requestAnimationFrame)
            navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

    navigator.getUserMedia (
               // constraints: audio and video for this app
               {
                  audio: true,
                  video: true
               },
               // Success callback
               gotStream, function(e) {
                   alert('Error getting audio');
                   console.log(e);
               });
}
