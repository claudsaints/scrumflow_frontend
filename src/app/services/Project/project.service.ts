import { Injectable } from '@angular/core';
import { HttpModelService } from '../model/http-model.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends HttpModelService {

  constructor(http: HttpClient) { 
    super(http);
  }

  
}
