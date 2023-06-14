import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingService } from '../housing.service';

declare var webkitSpeechRecognition: any;


@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule],
  template: `
  <section>
    <form>
    <input type="text" placeholder="Type a comment here...." value={{something}} #comment>

    <button class="primary" type="button" (click)="commentIncident(comment.value)">Comment</button>
    <button class="primary" type="button" (click)="start()">Speech</button>
    <button class="primary" type="button" (click)="stop()">Stop</button>
    </form>
    
  </section>
  <section>
    <p>
      {{something}} 
    </p>
  </section>
  `,
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  something = ""
  housingService: HousingService = inject(HousingService);
  recognition = new webkitSpeechRecognition()
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords = '';
  constructor(public cd: ChangeDetectorRef){
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      console.log("soportado")
    } else {
      console.log("no soportado")
    
    }
    this.init()
  }
  init() {

    this.recognition.interimResults = true;
    this.recognition.lang = 'es-PE';
    this.recognition.continuous = true
    this.recognition.maxAlternatives = 4
    // this.recognition.addEventListener('result', (e:any) => {
    //   const transcript = Array.from(e.results)
    //     .map((result: any) => result[0])
    //     .map((result) => result.transcript)
    //     .join('');
    //   this.tempWords = transcript;
    //   console.log(transcript);
    // });
    this.recognition.onresult = (e:any) => {
      let res:any[] = []
      const transcript = Array.from(e.results)
        .map((result: any) => {
          res = result
          return result[0]
        })
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript
      this.updatesomething(this.tempWords)
      console.log(e.results)
      console.log(transcript);
      console.log("------------");
      
    }

    this.recognition.onend = (e:any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript
      this.updatesomething(this.tempWords)
      console.log(transcript);
      console.log("------------");
      
    }
  }
  updatesomething(update:string){
    this.something = update
    this.cd.detectChanges()
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
    this.something = this.tempWords
    this.recognition.stop();
    console.log("End speech recognition")
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';
  }
  commentIncident(comment: string){

    this.housingService.commentIncident(comment).then((response: any) =>{
      console.log("Response 200")
    }).catch((e) => {
      console.log(e)
    })
  }
  
}
