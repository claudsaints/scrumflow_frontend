import { Injectable } from '@angular/core';
import { HttpModelService } from '../model/http-model.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sprint } from '../../types/';

@Injectable({
  providedIn: 'root'
})
export class SprintService extends  HttpModelService{

  constructor(http: HttpClient) { 
    super(http);
    this.serverUrl += '/project/sprints';
  }

  findById(id: string): Observable<Sprint>{
    return this.http.get<Sprint>(`${this.serverUrl}/${id}`);
  }

  findAllProjectSprints(projectId: string): Observable<Sprint []>{
    return this.http.get<Sprint[]>(`${this.serverUrl}?projectId=${projectId}`);
  }
  
  updateSprintData(id: string, data: any): Observable<Sprint>{
    return this.http.put<Sprint>(`${this.serverUrl}/${id}`, data);
  }
  
  createSprint(projectId: string, sectionId: string, data: any): Observable<Sprint> {
    return this.http.post<Sprint>(`${this.serverUrl}?projectId=${projectId}&sectionId=${sectionId}`, data);
  }

  deleteSprint(id: string): Observable<Sprint>{
    return this.http.delete<Sprint>(`${this.serverUrl}/${id}`);
  }

}
