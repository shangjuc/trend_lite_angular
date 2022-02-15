import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotPostComponent } from './hp/hp.component';
import { LineChartComponent } from './lc/lc.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import * as PlotlyJS from 'plotly.js-dist-min';
// import { PlotlyModule } from 'angular-plotly.js';
import { PlotlyViaCDNModule } from 'angular-plotly.js';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HpMatComponent } from './hp-mat/hp-mat.component';
import { McpComponent } from './mcp/mcp.component';
import { SearchComponent } from './search/search.component';

// PlotlyModule.plotlyjs = PlotlyJS;
PlotlyViaCDNModule.setPlotlyVersion('latest');
PlotlyViaCDNModule.setPlotlyBundle('basic');

@NgModule({
  declarations: [
    AppComponent,
    HotPostComponent,
    LineChartComponent,
    NavbarComponent,
    HpMatComponent,
    McpComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    // PlotlyModule,
    PlotlyViaCDNModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
