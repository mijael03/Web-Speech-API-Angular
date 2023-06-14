import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {

  recognition: any
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords = '';

  constructor() {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      console.log("soportado")
    } else {
      console.log("no soportado")

    }

  }

  init() {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      console.log("soportado")
      this.recognition = new webkitSpeechRecognition()
      this.recognition.interimResults = true;
      this.recognition.lang = 'es-PE';
      this.recognition.maxAlternatives = 5
      this.recognition.onresult = (e: any) => {
        let res: any[] = []
        const transcript = Array.from(e.results)
          .map((result: any) => {
            res = result
            return result[0]
          })
          .map((result) => result.transcript)
          .join('');
        console.log(res)
        this.tempWords = transcript;
        console.log(transcript);
      }
    }


    // this.recognition.addEventListener('result', (e:any) => {
    //   const transcript = Array.from(e.results)
    //     .map((result: any) => result[0])
    //     .map((result) => result.transcript)
    //     .join('');
    //   this.tempWords = transcript;
    //   console.log(transcript);
    // });

  }

  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Speech recognition started")
    // this.recognition.addEventListener('end', (condition:any) => {
    //   if (this.isStoppedSpeechRecog) {
    //     this.recognition.stop();
    //     console.log("End speech recognition")
    //   } else {
    //     this.wordConcat()
    //     this.recognition.start();
    //   }
    // });
  }
  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat()
    this.recognition.stop();
    console.log("End speech recognition")
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';
  }
}
