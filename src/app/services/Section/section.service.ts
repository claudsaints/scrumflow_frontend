import { Injectable } from '@angular/core';
import { HttpModelService } from '../model/http-model.service';
import { HttpClient } from '@angular/common/http';
import { Observable ,BehaviorSubject, tap, catchError, throwError} from 'rxjs';
import { List, Section } from '../../types';
import { ListService } from '../List/list.service';

@Injectable({
  providedIn: 'root'
})
export class SectionService extends HttpModelService {

  private _section = new BehaviorSubject<Section>({
    id: 0,
    uuid: "",
    description: '',
    title: '',
    lists: [],
  });

  readonly section$: Observable<Section> = this._section.asObservable();
   
  constructor(http:HttpClient, private listService: ListService) { 
    super(http)
  }

  create(title: string, description: string, projectUuid: string):Observable<Section>{
    return this.http.post<Section>(`${this.serverUrl}/project/sections/${projectUuid}`, {title,description});
  }
  
  findAllSectionInProject(projectUuid:string):Observable<Section[]>{
    return this.http.get<Section[]>(`${this.serverUrl}/project/sections?projectId=${projectUuid}`)
  }

  findSectionById(sectionUuid: string):Observable<Section>{
    return this.http.get<Section>(`${this.serverUrl}/project/sections/${sectionUuid}`).pipe(
      tap(section => {
        section.lists.sort((a,b) => a.position - b.position);
        
        this._section.next(section); 
      }),
      catchError(error => {
        console.error('Erro ao buscar seção por ID:', error);
        return throwError(() => new Error('Falha ao buscar seção por ID.'));
      })
    );
  }
  
  setCurrentSection(section: Section): void {
    this._section.next(section);
  }

  addListToCurrentSection(title: string): Observable<List> {
    const currentSection = this._section.getValue();

    if (!currentSection || !currentSection.id) {
      return throwError(() => new Error('Nenhuma seção ativa selecionada para adicionar lista.'));
    }

    return this.listService.create(currentSection.uuid, title).pipe(
      tap(createdListFromApi => {
        const updatedLists = [...currentSection.lists, createdListFromApi];
        const updatedSection = { ...currentSection, lists: updatedLists };
        this._section.next(updatedSection); 
      }),
      catchError(error => {
        console.error('Erro ao adicionar lista à seção atual:', error);
        return throwError(() => new Error('Falha ao adicionar lista à seção atual.'));
      })
    );
  }

  deleteListFromCurrentSection(listUuid: string): Observable<void> {
    const currentSection = this._section.getValue();
    if (!currentSection || !currentSection.uuid) {
      return throwError(() => new Error('Nenhuma seção ativa selecionada para deletar lista.'));
    }

    return this.listService.delete(listUuid).pipe(
      tap(() => {
        const updatedLists = currentSection.lists.filter(list => list.uuid !== listUuid);
        const updatedSection = { ...currentSection, lists: updatedLists };
        this._section.next(updatedSection); 
      }),
      catchError(error => {
        console.error('Erro ao deletar lista da seção atual:', error);
        return throwError(() => new Error('Falha ao deletar lista da seção atual.'));
      })
    );
  }




}
