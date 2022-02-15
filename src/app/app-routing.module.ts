import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotPostComponent } from './hp/hp.component';
import { HpMatComponent } from './hp-mat/hp-mat.component';
import { LineChartComponent } from './lc/lc.component';
import { McpComponent } from './mcp/mcp.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'hotpost', component: HotPostComponent },
  { path: 'hotpost-mat', component: HpMatComponent },
  { path: 'linechart', component: LineChartComponent },
  { path: 'mcp', component: McpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
