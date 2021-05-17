import { HttpClient, HttpParams } from '@angular/common/http';
import { templateJitUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Gif, SearchGIFResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  private urlService: string = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = 'NgORlAKP9A0a4ylcS03j3hHmoA1v2Z2I';
  private _historial: string[] = []

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient ) {
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }
    
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string){
    
    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('q', query)
            .set('limit', '10');


    this.http.get<SearchGIFResponse>(`${this.urlService}/search`, {params})
      .subscribe((response ) => {
        console.log(response.data);
        this.resultados = response.data;
        localStorage.setItem('resultados', JSON.stringify(response.data))
      })
  }
}
