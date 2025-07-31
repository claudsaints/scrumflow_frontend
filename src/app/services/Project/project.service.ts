import { Injectable } from '@angular/core';
import { HttpModelService } from '../model/http-model.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../User/user.service';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Project, ProjectDTO } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends HttpModelService {
  private _project = new BehaviorSubject<Project>({
    id: 0,
    uuid: '',
    title: '',
    description: '',
    create_at: '',
    backgroundImage: '',
    owner: {
      email: '',
      name: '',
    },
    members: [],
    labels: [],
    sections: [{ uuid: '', title: '', description: '' }],
    sprints_ids: [],
  });

  readonly project$: Observable<Project> = this._project;

  constructor(http: HttpClient, private userService: UserService) {
    super(http);
    this.serverUrl += '/project';
  }

  findUserProjects(): Observable<ProjectDTO[]> {
    return this.http.get<ProjectDTO[]>(
      `${this.serverUrl}?email=${this.userService.getEmailFromSessionStorage()}`
    );
  }

  findProjectById(projectUuid: string): Observable<Project> {
    return this.http.get<Project>(`${this.serverUrl}/${projectUuid}`).pipe(
      tap((project) => {
        this._project.next(project);
      }),
      catchError((error) => {
        console.error('Error to find project by id:', error);
        return throwError(() => new Error('Error to find project by id.'));
      })
    );
  }

  setCurrentProject(project: Project): void {
    this._project.next(project);
  }
}
