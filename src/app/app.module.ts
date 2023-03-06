import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { InscrireComponent } from './components/inscrire/inscrire.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { HowtofollowComponent } from './components/howtofollow/howtofollow.component';
import { AcceuilprofileComponent } from './components/acceuilprofile/acceuilprofile.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { ProfileComponent } from './components/profile/profile.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessangerComponent } from './components/messanger/messanger.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { PostComponent } from './components/post/post.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { DateAsAgoPipe } from './date-as-ago.pipe';
import { ShowPostComponent } from './components/show-post/show-post.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

import { SumPipeModule } from './sum-pipe';
import { MinichatComponent } from './components/minichat/minichat.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { HomeChatComponent } from './components/home-chat/home-chat.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    InscrireComponent,
    SearchComponent,
    HowtofollowComponent,
    AcceuilprofileComponent,
    MyprofileComponent,
    ProfileComponent,
    
    MessangerComponent,
    SearchFilterPipe,
    PostComponent,
    DateAsAgoPipe,
    ShowPostComponent,
    NotfoundComponent,
    MinichatComponent,
    HomeChatComponent,
    
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    AutocompleteLibModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    CommonModule ,
    Ng2SearchPipeModule, SumPipeModule, NgScrollbarModule, PickerModule
  ],
  providers: [DateAsAgoPipe,SumPipeModule],
  bootstrap: [AppComponent],
  exports: [
    DateAsAgoPipe
  ]
})
export class AppModule { }
