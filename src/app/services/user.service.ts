import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { Friend } from '../model/friend';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public loggedUser!:string;
      
  public isloggedIn: Boolean = false;
  public roles!:string[];
  host :string = "http://localhost:8080";
apiURL: string = 'http://localhost:8080/social/api';
token!: string | null;
private helper = new JwtHelperService();
constructor(private router: Router, private http: HttpClient) { }

login(user: User) {
return this.http.post<User>('http://localhost:8080/social/login', user, { observe: 'response' });
}

saveToken(jwt: string) {
localStorage.setItem('jwt', jwt);
this.token = jwt;
this.isloggedIn = true;
this.decodeJWT();
}

decodeJWT() {
if (this.token == undefined)
  return;
const decodedToken = this.helper.decodeToken(this.token);
const g = localStorage.getItem(this.token);
this.roles = decodedToken.roles;
this.isloggedIn = true;
this.loggedUser = decodedToken.sub;

}

/* extra */

public saveUser(user: any): void {
  window.sessionStorage.removeItem(this.token!);
  window.sessionStorage.setItem(this.token!, JSON.stringify(user));
}

public getUser(): any {
  const user = window.sessionStorage.getItem(this.token!);
  if (user) {
    return JSON.parse(user);
  }

  return {};
}

/* extra */

loadToken() {
this.token = localStorage.getItem('jwt')!;
this.decodeJWT();
}

getToken():string {
return this.token!;
}

logout() {
  this.loggedUser = undefined!;
  this.roles = undefined!;
  this.token= undefined!;
  this.isloggedIn = false;
  localStorage.removeItem('jwt');
  this.router.navigate(['/login']);
  }

  isTokenExpired(): Boolean
{
return this.helper.isTokenExpired(this.token!); }




isAdmin():Boolean{
if (!this.roles)
return false;
return this.roles.indexOf('ADMIN') >=0;
}



   register( u: FormData){
    
   
    return this.http.post<User>('http://localhost:8080/social/api', u);
    }

    updateimage(s: FormData,id:number) : Observable<any>
   
    {
   
    const url = `${this.apiURL}/updateimage/${id}`;
    
    return this.http.put<User>(url, s);
    }


    consulterUser(id: number): Observable<User> {
       const url = `${this.apiURL}/getUser/${id}`;
     
     
      return this.http.get<User>(url,httpOptions);
      }

      getall(): Observable<User[]> {
        const url = `${this.apiURL}/getall`;
      
      
       return this.http.get<User[]>(url,httpOptions);
       }

       experience(id:number): Observable<number> {
        const url = `${this.apiURL}/getsum/${id}`;
      
      
       return this.http.get<number>(url,httpOptions);
       }

      consulterUserbyusername(): Observable<User> {
       
        const url = `http://localhost:8080/social/api/getUserByName/${this.loggedUser}`;
       
        return this.http.get<User>(url);
        }

        getUserByNickname(username:string): Observable<User> {
       
          const url = `http://localhost:8080/social/api/getUserByName/${username}`;
         
          return this.http.get<User>(url);
          }


        isfollowed(id:number): Observable<Friend> {
          const url = `${this.apiURL}/requested/${this.loggedUser}/${id}`;
        
        
         return this.http.get<Friend>(url,httpOptions);
         }

         

         wefriends(id:number): Observable<Friend> {
          const url = `${this.apiURL}/isfriend/${this.loggedUser}/${id}`;
        
        
         return this.http.get<Friend>(url,httpOptions);
         }

         receivefriendreq(id:number): Observable<Friend> {
          const url = `${this.apiURL}/receive/${this.loggedUser}/${id}`;
        
        
         return this.http.get<Friend>(url,httpOptions);
         }

         notifriendreq(): Observable<Friend[]> {
          const url = `${this.apiURL}/notireceive/${this.loggedUser}`;
        
        
         return this.http.get<Friend[]>(url);
         }



         countfriend(id:number): Observable<Friend[]> {
          const url = `${this.apiURL}/count/${id}`;      
         return this.http.get<Friend[]>(url,httpOptions);
         }


         findfriend(id: number){
          const url = `${this.apiURL}/findfriendbyreq/${this.loggedUser}/${id}`;
         
          return this.http.get<Friend>(url);
          }

         accept( u: Friend,id: number){
          const url = `${this.apiURL}/accept/${id}`;
         
          return this.http.put<Friend>(url, u);
          }
    
          reject( u: Friend,id: number){
            const url = `${this.apiURL}/reject/${this.loggedUser}/${id}`;
           
            return this.http.put<Friend>(url, u);
            }

            delete(id: number){
              const url = `${this.apiURL}/delete/${this.loggedUser}/${id}`;
             
              return this.http.delete<Friend>(url);
              }


              connected( u: User,username: String){
                const url = `${this.apiURL}/connected/${username}`;
               
                return this.http.put<User>(url, u);
                }

                desconnected( u: User,username: String){
                  const url = `${this.apiURL}/desconnected/${username}`;
                 
                  return this.http.put<User>(url, u);
                  }


}
