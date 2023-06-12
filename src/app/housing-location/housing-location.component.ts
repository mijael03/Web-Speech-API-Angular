
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HousingLocation } from '../housinglocation';
import { User } from '../user';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule],
  template: `
  <section class="listing">
    <img class="listing-photo" [src]="housingUser.user_photo ? 'https://backguep.guepardoprod.com/user/getPhoto/' + housingUser.user_photo : 'assets/house.avif'" alt="Exterior photo of {{housingUser.user_name}}">
    <h2 class="listing-heading">{{ housingUser.user_fullname }}</h2>
    <p class="listing-location">{{ housingUser.user_position}}, {{housingUser.user_role }}</p>
  </section>
  `,
  styleUrls: ['./housing-location.component.css']
})
export class HousingLocationComponent {
  @Input() housingUser!: any;
}
