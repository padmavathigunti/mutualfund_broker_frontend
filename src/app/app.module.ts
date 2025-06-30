import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component'; 

@NgModule({
  imports: [
    BrowserModule,
    AppComponent,
    LoginComponent 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
