import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotPostComponent } from './hp/hp.component';
import { LineChartComponent } from './lc/lc.component';

const routes: Routes = [
  { path: 'hotpost', component: HotPostComponent },
  { path: 'linechart', component: LineChartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
