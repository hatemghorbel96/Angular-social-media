import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Like } from '../model/like';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};
@Injectable({
  providedIn: 'root'
})
export class LikeService {
  apiURL: string = 'http://localhost:8080/social/like';
  constructor(private http : HttpClient) { }

  liked(username:string,id: number) {
    
    const url = `${this.apiURL}/likepost/${username}/${id}`;

    return this.http.post(url,httpOptions);
  }

    ifliked(username:string,id: number): Observable<Like> {
    
    const url = `${this.apiURL}/ifliked/${username}/${id}`;
   
    return this.http.get<Like>(url);
    }

    getalllikes(): Observable<Like[]> {
    
      const url = `${this.apiURL}/getlikes`;
     
      return this.http.get<Like[]>(url);
      }

    annulelike(username:string,id: number) {
    
       const url = `${this.apiURL}/dislike/${username}/${id}`;
   
       return this.http.delete(url,httpOptions);
    }

    mijoud(username:string): Observable<Like> {
    
      const url = `${this.apiURL}/mawjoud/${username}`;
  
      return this.http.get<Like>(url);
   }


   testpostuser(username:string,id:number): Observable<Like> {
    
    const url = `${this.apiURL}/test/${username}/${id}`;

    return this.http.get<Like>(url);
 }

/*  testpostuser2(username:string,id:number): Observable<number> {
    
  const url = `${this.apiURL}/test2/${username}/${id}`;

  return this.http.get<number>(url);
} */

    
}
