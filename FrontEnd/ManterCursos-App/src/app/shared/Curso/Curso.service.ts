import { Injectable } from '@angular/core';
import { Curso } from './Curso.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  readonly baseURL = 'https://localhost:5001/api/Cursos'
  formCurso: Curso = new Curso();
  listCurso: Curso[]=[];

  constructor(private http: HttpClient) { }

  postCurso() {
    return this.http.post(this.baseURL, this.formCurso);
  }

  putCurso() {
    return this.http.put(`${this.baseURL}/${this.formCurso.cursoId}`, this.formCurso);
  }

  deleteCurso(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>this.listCurso = res as Curso[]);
  }

  listaTodos() {
    return this.http.get(this.baseURL);
  }
}
