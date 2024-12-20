import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import baserUrl from '../helperUrl';
import { Usuario } from 'src/app/interfaces/usuario';
import { Login } from 'src/app/interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  /* la propiedad loginStatusSubjec es un observable que se 
  utiliza para saber si el usuario esta logeado o no */
  public loginStatusSubjec = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  //generamos el token mediante el endpoint del backend
  public generateToken(loginData:Login){
    return this.http.post(`${baserUrl}/api/auth/generate-token`,loginData);
    
  }
  //iniciamos sesión y establecemos el token en el localStorage
  public loginUser(token:string){
    localStorage.setItem('token',token);
    return true;
  }
  //obtenemos el token del localStorage
  public getToken(){
    return localStorage.getItem('token');
  }
  

  public getCurrentUser(){
    return this.http.get(`${baserUrl}/api/auth/actual-usuario`);
  }

  
  //comprobamos si el usuario esta logeado
  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }

  //cerramos sesion y eliminamos el token del localStorage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  

  //establecemos el usuario en el localStorage
  public setUser(user:string){
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

}
