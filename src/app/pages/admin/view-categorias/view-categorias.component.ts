import  Swal  from 'sweetalert2';
import { CategoriaService } from './../../../services/categoriaservice/categoria.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-categorias',
  templateUrl: './view-categorias.component.html',
  styleUrls: ['./view-categorias.component.css']
})
export class ViewCategoriasComponent implements OnInit {

  categorias:any = [

  ]

  constructor(private categoriaService:CategoriaService) { }

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe({
      next:(dato:any) => {
        this.categorias = dato;
        console.log(this.categorias);
      },
      error:(error) => {
        console.log(error);
        Swal.fire('Error !!','Error al cargar las categorías','error');
      }
    })
  }

}
