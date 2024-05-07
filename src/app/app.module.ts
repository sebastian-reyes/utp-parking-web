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
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptorService } from './services/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';
import { FormRegistroComponent } from './pages/users/form-registro/form-registro.component';

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
    FooterComponent,
    FormRegistroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
