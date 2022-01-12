import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HPComponent } from './hp/hp.component';
import { LcComponent } from './lc/lc.component';

@NgModule({
  declarations: [
    AppComponent,
    HPComponent,
    LcComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
