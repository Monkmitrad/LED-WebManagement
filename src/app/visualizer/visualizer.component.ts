import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit, AfterViewInit {

  @ViewChild('visualizer') canvas;

  canvasElement: HTMLCanvasElement;
  audioCtx: AudioContext;
  analyser: AnalyserNode;
  canvasCtx: CanvasRenderingContext2D;
  drawVisual: number;
  source: MediaStreamAudioSourceNode;

  stream: MediaStream;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.audioCtx = new (window.AudioContext);
    
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.minDecibels = -90;
    this.analyser.maxDecibels = 0;
    this.analyser.smoothingTimeConstant = 0.85;

    this.canvasElement = this.canvas.nativeElement;
    
    this.canvasCtx = this.canvasElement.getContext("2d");
    this.canvasElement.setAttribute('width', '800');

    //main block for doing the audio recording

    if (navigator.mediaDevices.getUserMedia) {
      console.log('getUserMedia supported.');
      const constraints = { audio: true };
      navigator.mediaDevices.getUserMedia(constraints)
        .then((audioStream: MediaStream) => {
          this.stream = audioStream;
          this.source = this.audioCtx.createMediaStreamSource(audioStream);
          
          this.source.connect(this.analyser);
          this.visualize();
        })
        .catch(function (err) { console.error('The following gUM error occured: ' + err); })
    } else {
      console.log('getUserMedia not supported on your browser!');
    }
  }

  visualize(): void {
    const WIDTH = this.canvasElement.width;
    const HEIGHT = this.canvasElement.height;

    this.analyser.fftSize = 128;
    var bufferLength = this.analyser.frequencyBinCount;
    console.log(bufferLength);
    const dataArray = new Uint8Array(bufferLength);

    this.canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    const draw = () => {
      
        this.drawVisual = requestAnimationFrame(draw);
  
        this.analyser.getByteFrequencyData(dataArray);
  
        this.canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        this.canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  
        const barWidth = (WIDTH / bufferLength) * 1.5;
        let barHeight;
        let x = 0;
  
        for (var i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i];
  
          this.canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
          this.canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);
  
          x += barWidth + 1;
        
      }
    };

    draw();

  }
}
