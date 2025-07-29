import { Injectable } from '@angular/core';
import { HttpModelService } from '../model/http-model.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../User/user.service';
import { Observable } from 'rxjs';
import {  Project, ProjectDTO} from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends HttpModelService {

  constructor(http: HttpClient, private userService: UserService) { 
    super(http);
    this.serverUrl += "/project";
  }

  findUserProjects():Observable<ProjectDTO[]>{
    return this.http.get<ProjectDTO[]>(`${this.serverUrl}?email=${this.userService.getEmailFromSessionStorage()}`)
  }

  findProjectById(projectUuid: string): Observable<Project>{
    return this.http.get<Project>(`${this.serverUrl}/${projectUuid}`)
  }


}
