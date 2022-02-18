import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotPostComponent } from './hp/hp.component';
import { HpMatComponent } from './hp-mat/hp-mat.component';
import { LineChartComponent } from './lc/lc.component';
import { McpComponent } from './mcp/mcp.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'trend_lite_ng2/search', component: SearchComponent },
  { path: 'trend_lite_ng2/hotpost', component: HotPostComponent },
  { path: 'trend_lite_ng2/hotpost-mat', component: HpMatComponent },
  { path: 'trend_lite_ng2/linechart', component: LineChartComponent },
  { path: 'trend_lite_ng2/mcp', component: McpComponent },
  { path: '**', redirectTo: '/trend_lite_ng2/search', pathMatch: 'full'  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
