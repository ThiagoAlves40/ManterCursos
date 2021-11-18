import { CursoService } from './../shared/Curso/Curso.service';
import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../shared/Curso/Categoria.service';
import { Categoria } from '../shared/Curso/Categoria.model';
import { Curso } from '../shared/Curso/Curso.model';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  public curso: any=[];

  public cursosFiltrados: any = [];

  constructor(private http2: HttpClient, public ServiceCurso: CursoService, public ServiceCategoria: CategoriaService, private toastr:ToastrService) { }

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
    this.ServiceCategoria.refreshList();
    this.ServiceCurso.refreshList();
  }

  public getCursos(): void {
    this.ServiceCurso.listaTodos().subscribe(
    response => {
      this.curso = response;
      this.cursosFiltrados = this.curso;
    },
    error => console.log(error));

  }

  populateForm(selectedRecord: Curso) {
    this.ServiceCurso.formCurso = Object.assign({}, selectedRecord);
  }

  getCategoriaFk(){
    let cmbCategoria = (<HTMLSelectElement>document.getElementById("cmbCategoria")).value;
    this.ServiceCurso.formCurso.categoriaFk = Number(cmbCategoria);
    let categorias = this.ServiceCategoria.list;

    for(let i = 0; i <= categorias.length; i++){
      console.log(categorias[0].nome)
    }
  }

  onDelete(id: number) {
    if (confirm('Tem Certeza que Deseja Deletar esse Curso?')) {
      this.ServiceCurso.deleteCurso(id)
        .subscribe(
          res => {
            this.getCursos();
            this.toastr.error("Deletado com Sucesso", 'Curso');
          },
          err => { console.log(err) }
        )
    }
  }

  onSubmit(form: NgForm) {
    if (this.ServiceCurso.formCurso.cursoId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.ServiceCurso.postCurso().subscribe(
      res => {
        this.resetForm(form);
        this.getCursos();
        this.toastr.success('Registrado com Sucesso!', 'Curso');
      },
      err => { console.log(err); }
    );
  }

  /* verifyDate(form: NgForm) {
    let dataIni = Date();
    let dataTer = Date();
    dataIni = form.controls.dataInicio.value;
    dataTer = form.controls.dataInicio.value;
    if(this.curso!==null){
      for(let i=0; i<this.curso.length; i++){
        this.curso[i].controls.dataInicio.value      -----curso1----
                                                             -------vurso2--------
            }
    }
  }*/

  updateRecord(form: NgForm) {
    this.ServiceCurso.putCurso().subscribe(
      res => {
        this.resetForm(form);
        this.getCursos();
        this.toastr.info('Atualizado com Sucesso!', 'Curso');
      },
      err => { console.log(err); }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.ServiceCurso.formCurso = new Curso();
  }

}
