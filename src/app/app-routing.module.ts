import { MinichatComponent } from './components/minichat/minichat.component';

import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InscrireComponent } from './components/inscrire/inscrire.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ShowPostComponent } from './components/show-post/show-post.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  {path: "home", component : HomeComponent, pathMatch: 'full'},
  {path: "login", component : LoginComponent},
  {path: "inscrire", component : InscrireComponent},
  {path: "myprofile", component : MyprofileComponent},
  {path: "profile/:id", component : ProfileComponent},
  {path:'search/:id',component: ProfileComponent},
  {path:'post/:id',component: ShowPostComponent},
  { path: 'chat', component: MinichatComponent },
  {path:'**',component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
