import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {
  // url ="http://localhost:3000/register"
  constructor(public http:HttpClient) { }

//register
  register(obj:any){
    const body = JSON.stringify(obj);
    return this.http.post(`${environment.base_url}/register`,obj,{})
  }
// login
login(obj:any) {
  return this.http.post(`${environment.base_url}/login`, obj)
}
//verify mail
verifyMail(email:any,token:any){
  return this.http.get(`${environment.base_url}/confirm/${email}/${token}`);
}
//forgot email
forgot(obj:any){
  return this.http.post(`${environment.base_url}/reset`,obj);
}
validToken(obj:any){
  return this.http.post(`${environment.base_url}/valid-token`, obj);
}
newPassword(obj:any){
  return this.http.post(`${environment.base_url}/new-password`, obj);
}
}
