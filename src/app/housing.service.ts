import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';
import { Data,User } from './user';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  url = 'https://backguep.guepardoprod.com/';

  async getAllHousingLocations(): Promise<any[]> {
    const data = await fetch(`${this.url}/user`);
    const somedata:Promise<Data> = data.json()
    console.log((await somedata).data)
    return (await somedata).data as any[] ?? [];
  }

  async getHousingLocationById(id: number): Promise<any> {
    const data = await fetch(`${this.url}/user/${id}`);
    const somedata:Promise<Data> = data.json()
    return (await somedata).data ?? {};
  }
  async commentIncident(comment: string): Promise<any[]> {
    const data = await fetch(`${this.url}/incident/find/addComment/648889944d23277d9c61f375`,
    {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-originonly-if-cached
    headers: {
      "Content-Type": "application/json",
      "Authentication" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2RuaSI6MSwidXNlcl9yb2xlIjoiQWRtaW5pc3RyYWRvciIsInVzZXJfZnVsbG5hbWUiOiJSb290IHJvb3QiLCJ1c2VyX2NvbG9yIjoiIzZjMTE4ZCIsInVzZXJfaWQiOiI2NDZlMTNhMjJhN2VmMTM3OWEzMzYyM2QiLCJpYXQiOjE2ODY2NzI2NjIsImV4cCI6MTY4NjcwMTQ2Mn0.6ES0xQEpGr5mpAixEhJp9OBflj6MK-MRkWK6t6xCA04"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }, 
    body: JSON.stringify({
      comment: comment,
      user_fullname: "Donald Trump",
    }),
    });
    const somedata:Promise<Data> = data.json()
    return (await somedata).data as any[] ?? [];
  }
  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }
}