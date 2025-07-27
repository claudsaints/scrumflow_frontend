import { Injectable } from '@angular/core';
import { HttpModelService } from '../model/http-model.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Section } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class SectionService extends HttpModelService {

  constructor(http:HttpClient) { 
    super(http)
  }

  create(title: string, description: string, projectId: number):Observable<Section>{
    return this.http.post<Section>(`${this.serverUrl}/project/sections/${projectId}`, {title,description});
  }

  findSectionById(sectionId: number):Observable<Section>{
    return this.http.get<Section>(`${this.serverUrl}/project/sections/${sectionId}`)
  }


  findAllSectionInProject(projectId:number):Observable<Section[]>{
    return this.http.get<Section[]>(`${this.serverUrl}/project/sections?projectId=${projectId}`)
  }



}
