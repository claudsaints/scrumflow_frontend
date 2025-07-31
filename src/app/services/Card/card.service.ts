import { Injectable } from '@angular/core';
import { HttpModelService } from '../model/http-model.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card, UpdateCardDto } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class CardService extends HttpModelService {

  constructor(http: HttpClient) { 
    super(http);
    this.serverUrl += "/project/cards"
  }

  create(listUuid: string, title: string):Observable<Card>{
    return this.http.post<Card>(`${this.serverUrl}/${listUuid}`,{title});
  }

  findCardById(cardUuid: string):Observable<Card>{
    return this.http.get<Card>(`${this.serverUrl}/${cardUuid}`)
  }

  update(cardUuid: string, updateCardData: UpdateCardDto):Observable<Card>{
    return this.http.put<Card>(`${this.serverUrl}/${cardUuid}`, {...updateCardData})
  }

  delete(cardUuid: string):Observable<any>{
    return this.http.delete<Card>(`${this.serverUrl}/${cardUuid}`)
  }

}
