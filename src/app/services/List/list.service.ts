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

  create(sectionId: string, title: string): Observable<List>{
    return this.http.post<List>(`${this.serverUrl}/${sectionId}`, {title});
  }

  updatePosition(sectionId: string, listId: string, newPosition: number):Observable<List>{
    return this.http.put<List>(`${this.serverUrl}sectionId=${sectionId}&listId=${listId}&newPos=${newPosition}`, {});
  }

  delete(listUuid: string): Observable<any>{
    return this.http.delete(`${this.serverUrl}/${listUuid}`);
  }




}
