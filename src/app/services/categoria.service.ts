import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helperUrl';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http:HttpClient) {}

  public listarCategorias(){
    return this.http.get(`${baserUrl}/categoria/`);
  }

  public agregarCategoria(categoria:any){
    return this.http.post(`${baserUrl}/categoria/`,categoria);
  }

  public actualizarCategoria(categoria:any){
    return this.http.put(`${baserUrl}/categoria/`,categoria);
  }

  public eliminarCategoria(id:number){
    return this.http.delete(`${baserUrl}/categoria/${id}`);
  }
  
}