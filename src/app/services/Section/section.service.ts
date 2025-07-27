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
    description: '',
    title: '',
    lists: [],
  });

  readonly section$: Observable<Section> = this._section.asObservable();
   
  constructor(http:HttpClient, private listService: ListService) { 
    super(http)
  }

  create(title: string, description: string, projectId: number):Observable<Section>{
    return this.http.post<Section>(`${this.serverUrl}/project/sections/${projectId}`, {title,description});
  }
  
  findAllSectionInProject(projectId:number):Observable<Section[]>{
    return this.http.get<Section[]>(`${this.serverUrl}/project/sections?projectId=${projectId}`)
  }

  findSectionById(sectionId: number):Observable<Section>{
    return this.http.get<Section>(`${this.serverUrl}/project/sections/${sectionId}`).pipe(
      tap(section => {
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

    return this.listService.create(currentSection.id, title).pipe(
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

  deleteListFromCurrentSection(listId: number): Observable<void> {
    const currentSection = this._section.getValue();
    if (!currentSection || !currentSection.id) {
      return throwError(() => new Error('Nenhuma seção ativa selecionada para deletar lista.'));
    }

    return this.listService.delete(listId).pipe(
      tap(() => {
        const updatedLists = currentSection.lists.filter(list => list.id !== listId);
        const updatedSection = { ...currentSection, lists: updatedLists };
        this._section.next(updatedSection); // Atualiza o estado compartilhado
      }),
      catchError(error => {
        console.error('Erro ao deletar lista da seção atual:', error);
        return throwError(() => new Error('Falha ao deletar lista da seção atual.'));
      })
    );
  }




}
