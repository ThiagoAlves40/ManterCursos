import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  public curso: any=[];

  public cursosFiltrados: any = [];

  constructor(private http: HttpClient) { }

  private _filtroLista: string = '';

  public get filtroLista(): string{
    return this._filtroLista;
  }

  public set filtroLista(value: string){
    this._filtroLista = value;
    this.cursosFiltrados = this.filtroLista ? this.filtrarCursos(this.filtroLista): this.curso;
  }

  filtrarCursos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.curso.filter(
      (curso:{descricao: string;dataInicio: string;dataTermino: string}) =>
      curso.descricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      curso.dataInicio.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      curso.dataTermino.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  ngOnInit(): void {
    this.getCursos();
  }

  public getCursos(): void {
    this.http.get('https://localhost:5001/api/Cursos').subscribe(
    response => {
      this.curso = response;
      this.cursosFiltrados = this.curso;
    },
    error => console.log(error));

  }

}
