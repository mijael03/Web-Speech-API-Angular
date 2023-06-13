import { HousingService } from '../housing.service';
import { Component, ElementRef, ViewChild, inject } from '@angular/core'; import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SpeechRecognitionService } from '../speech-recognition.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent,
    RouterLink,
    RouterOutlet
  ],
  template: `
  <section>
    <form>
    <input type="text" placeholder="Type a name here...." value={{something}} #filter>
    <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
    <button class="primary" type="button" (click)="startService()">Speech Start</button>
    <button class="primary" type="button" (click)="stopService()">Speech Stop</button>
    <a [routerLink] = "[ 'comments' ]" >
      comments
    </a>
    </form>
    
  </section>
  <section class="results">
  <app-housing-location *ngFor="let housingUser of filteredUserList" [housingUser]="housingUser"></app-housing-location>
  </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  filteredUserList: any[] = [];
  housingUserList: any[] = [];
  housingService: HousingService = inject(HousingService);
  speechService: SpeechRecognitionService = inject(SpeechRecognitionService)
  something = "Filter by name"
  constructor() {
    this.housingService.getAllHousingLocations().then((housingUserList: any[]) => {
      this.housingUserList = housingUserList;
      this.filteredUserList = housingUserList;
      this.speechService.init()
    });
  }
  filterResults(text: string) {
    if (!text) {
      this.filteredUserList = this.housingUserList;
    }
  
    this.filteredUserList = this.housingUserList.filter(
      housingUser => housingUser?.user_fullname.toLowerCase().includes(text.toLowerCase())
    );
    console.log(this.filteredUserList)
  }
  startService(){
    this.speechService.start()
    
  }

  stopService(){
    this.something = this.speechService.tempWords
    this.speechService.stop()
  }


}
