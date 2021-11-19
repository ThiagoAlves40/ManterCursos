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

  public curso: any = [];

  public cursosFiltrados: any = [];

  constructor(private http2: HttpClient, public ServiceCurso: CursoService, public ServiceCategoria: CategoriaService, private toastr: ToastrService) { }

  private _filtroLista: string = '';

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.cursosFiltrados = this.filtroLista ? this.filtrarCursos(this.filtroLista) : this.curso;
  }

  filtrarCursos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.curso.filter(
      (curso: { descricao: string; dataInicio: string; dataTermino: string }) =>
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

  getCategoriaFk() {
    let cmbCategoria = (<HTMLSelectElement>document.getElementById("cmbCategoria")).value;
    this.ServiceCurso.formCurso.categoriaFk = Number(cmbCategoria);
    let categorias = this.ServiceCategoria.list;

    for (let i = 0; i <= categorias.length; i++) {
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
   /*  if (this.verificarData(form)) {
      console.log('Data de início é menor que a data atual.');
    }
    else { */
      this.ServiceCurso.postCurso().subscribe(
        res => {
          this.resetForm(form);
          this.getCursos();
          this.toastr.success('Registrado com Sucesso!', 'Curso');
        },
        err => { console.log(err); }
      );
    
  }


  /*async verificarData(form: NgForm): Promise<boolean> {
    let dataIni = new Date(form.controls.dataInicio.value);
    let dataTer = new Date(form.controls.dataTermino.value);
    let dataAtual = new Date();

    console.log(dataIni +" "+ dataTer +" "+ dataAtual);

    if (dataIni > dataTer) {
      this.toastr.error('sdahdushui!', 'Curso');
      return false;
    }

    else if (dataIni < dataAtual || dataTer < dataAtual) {
      this.toastr.error('Erro!', 'Curso');
      return false;
    }

    else if (await this.ServiceCurso.listaTodos().subscribe((cursos: any = []) =>
    cursos.some((curso: any) => {
      var iniciaDuranteOutroCurso = dataIni > curso.dataInicio && dataIni < curso.dataTermino;
      var finalizaDuranteOutroCurso = dataTer > curso.dataInicio && dataTer < curso.dataTermino;
      return iniciaDuranteOutroCurso  || finalizaDuranteOutroCurso;
    }))) {
      this.toastr.error('Erro!', 'Curso');
      return false;
    }

    return true;
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
