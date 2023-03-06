import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Friend } from '../model/friend';
import { User } from '../model/user';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};
@Injectable({
  providedIn: 'root'
})
export class FriendService {
  apiURL: string = 'http://localhost:8080/social/api';
  constructor(private router: Router, private http: HttpClient) { }


  getall(): Observable<Friend[]> {
    const url = `http://localhost:8080/social/api/getallfriend`;

   return this.http.get<Friend[]>(url);
   }


   
   

   getbyid(id:number): Observable<Friend> {
    const url = `${this.apiURL}/getfriendbyid/${id}`;
  
  
   return this.http.get<Friend>(url,httpOptions);
   }

   friendreq( u: Friend,username: String,idfriend:number){
    const url = `${this.apiURL}/friendreq/${username}/${idfriend}`;
   
    return this.http.post<Friend>(url, u);
    }

    
}
