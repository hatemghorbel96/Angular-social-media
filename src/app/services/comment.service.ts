import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/model/comment';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  apiURL: string = 'http://localhost:8080/social/comment';
  constructor(private http : HttpClient) { }

  addcomment(com: Comment,id:number,username: string):Observable<Comment>{
  
   const url = `${this.apiURL}/add/${id}/${username}`;
 
   return this.http.post<Comment>(url,com,httpOptions);
   }

   updatecomment(com: Comment,id:number):Observable<Comment>{
   
     const url = `${this.apiURL}/update/${id}`;
   
     return this.http.put<Comment>(url,com,httpOptions);
     }

   consulterComments(id: number): Observable<Comment[]> {
  
    const url = `${this.apiURL}/${id}`;
   
    return this.http.get<Comment[]>(url,httpOptions);
    }

    getcommentbyid(id: number): Observable<Comment> {
    
      const url = `${this.apiURL}/get/${id}`;
     
      return this.http.get<Comment>(url,httpOptions);
      }

      supprimerComment(id : number) {
      
         const url = `${this.apiURL}/delete/${id}`;
     
         return this.http.delete(url,httpOptions);
      }
}
