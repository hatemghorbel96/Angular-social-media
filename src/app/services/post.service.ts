import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { Post } from '../model/post';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};
@Injectable({
  providedIn: 'root'
})
export class PostService {
  apiURL: string = 'http://localhost:8080/social/api';
  constructor(private http : HttpClient) { }


    ajouterpost( p: FormData,username:string){
    
    const url = `${this.apiURL}/postphoto/${username}`;
    return this.http.post<Post>(url,p);
    }

    ajoutestatut( p: Post,username:string){
      const url = `${this.apiURL}/poststatut/${username}`;
  
      return this.http.post<Post>(url,p);
      }

      getmyposts( username:string): Observable<Post[]>{
        const url = `${this.apiURL}/myposts/${username}`;
    
        return this.http.get<Post[]>(url);
        }

        getmypostsbyid( id:number): Observable<Post[]>{
          const url = `${this.apiURL}/otherposts/${id}`;
      
          return this.http.get<Post[]>(url);
          }

          getallposts(): Observable<Post[]>{
            const url = `${this.apiURL}/allpost`;
        
            return this.http.get<Post[]>(url);
            }

            getpostbyid(id:number): Observable<Post>{

              const url = `${this.apiURL}/getpostbyid/${id}`;
          
              return this.http.get<Post>(url);
              }


              testifliked(username:string): Observable<Post[]>{

                const url = `${this.apiURL}/testlike/${username}`;
            
                return this.http.get<Post[]>(url);
                }

                
              testlikedbyothers(username:string): Observable<Post[]>{

                const url = `${this.apiURL}/testlikebyother/${username}`;
            
                return this.http.get<Post[]>(url);
                }

                test(username:string): Observable<Post[]>{

                  const url = `${this.apiURL}/testtest/${username}`;
              
                  return this.http.get<Post[]>(url);
                  }
}
