import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  users! : User [];
  value!: boolean;
  constructor(private router: Router,private userservice: UserService) { }

  ngOnInit(): void {
    this.chargerusers();
  }

  chargerusers(){
    this.userservice.getall().subscribe 
    (u => {console.log(u); 
    this.users = u;
    });
    }

  keyword = 'nom';


  selectEvent(item: any){
    console.log(`value=${item.nom}`);
    this.router.navigateByUrl(`/search/${item.id}`);
  }
  
}
