import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/users/home/home.component';
import { NavbarComponent } from './pages/users/navbar/navbar.component';
import { CarouselComponent } from './pages/users/carousel/carousel.component';
import { SliderComponent } from './pages/users/slider/slider.component';
import { CarscardComponent } from './pages/users/carscard/carscard.component';
import { InfoaditionalComponent } from './pages/users/infoaditional/infoaditional.component';
import { FooterComponent } from './pages/users/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    CarouselComponent,
    SliderComponent,
    CarscardComponent,
    InfoaditionalComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
