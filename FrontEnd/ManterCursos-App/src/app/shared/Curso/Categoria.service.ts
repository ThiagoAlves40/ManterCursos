import { Injectable } from '@angular/core';
import { Categoria } from './Categoria.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  readonly baseURL = 'https://localhost:5001/api/Categorias'
  formData: Categoria = new Categoria();
  list: Categoria[] = [];

  constructor(private http: HttpClient) { }

  postCategoria() {
    return this.http.post(this.baseURL, this.formData);
  }

  putCategoria() {
    return this.http.put(`${this.baseURL}/${this.formData.categoriaId}`, this.formData);
  }

  deleteCategoria(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>this.list = res as Categoria[]);
  }
}
