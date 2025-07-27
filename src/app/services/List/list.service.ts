import { Injectable } from '@angular/core';
import { HttpModelService } from '../model/http-model.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ListService extends HttpModelService {

  constructor(http: HttpClient) { 
    super(http);
    this.serverUrl += "/project/lists";
  }

  create(sectionId: number, title: string): Observable<List>{
    return this.http.post<List>(`${this.serverUrl}/${sectionId}`, {title});
  }

  updatePosition(sectionId: number, listId: number, newPosition: number):Observable<List>{
    return this.http.put<List>(`${this.serverUrl}sectionId=${sectionId}&listId=${listId}&newPos=${newPosition}`, {});
  }

  delete(listId: number): Observable<any>{
    return this.http.delete(`${this.serverUrl}/${listId}`);
  }




}
