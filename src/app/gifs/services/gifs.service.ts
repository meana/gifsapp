import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  private apiKey: string = 'NgORlAKP9A0a4ylcS03j3hHmoA1v2Z2I';
  private _historial: string[] = []

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient ) {}

  buscarGifs(query: string){
    
    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }

    this.http.get('https://api.giphy.com/v1/gifs/search?api_key=NgORlAKP9A0a4ylcS03j3hHmoA1v2Z2I&q=dbz&limit=10')
      .subscribe((response: any) => {
        console.log(response.data);
      })


  }
}
