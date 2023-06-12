import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';
import { Data,User } from './user';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  url = 'https://backguep.guepardoprod.com/user';

  async getAllHousingLocations(): Promise<any[]> {
    const data = await fetch(this.url);
    const somedata:Promise<Data> = data.json()
    console.log((await somedata).data)
    return (await somedata).data as any[] ?? [];
  }

  async getHousingLocationById(id: number): Promise<any> {
    const data = await fetch(`${this.url}/${id}`);
    const somedata:Promise<Data> = data.json()
    return (await somedata).data ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }
}