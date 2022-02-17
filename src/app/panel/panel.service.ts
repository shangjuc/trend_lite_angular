import { Injectable } from '@angular/core';

import { LineChartComponent } from '../lc/lc.component';
import { HpMatComponent } from '../hp-mat/hp-mat.component';
import { PanelItem } from './panel-item';

@Injectable()
export class PanelService {
  getPanels() {
    return {
      HP: new PanelItem(
        HpMatComponent,
        { name: '', bio: '' }
      ),
      LC: new PanelItem(
        LineChartComponent,
        { name: '', bio: '' }
      ),
    }
  }

}
