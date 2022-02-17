import { Component, Input, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';

import { PanelDirective } from './panel.directive';
import { PanelItem } from './panel-item';
import { PanelComponent } from './panel.component';

@Component({
  selector: 'app-panel-banner',
  templateUrl: './panel-banner.component.html',
})
export class PanelBannerComponent implements AfterViewInit, OnDestroy {
  @Input() panels: any = {};
  @Input() panel_type: string = "";

  @ViewChild(PanelDirective, {static: true}) panelHost!: PanelDirective;

  ngAfterViewInit() {
    this.getPanels();
  }

  ngOnDestroy() {
  }

  loadComponent_by_type() {
    console.log(this.panel_type);
    let panelItem = this.panels[this.panel_type];
    const viewContainerRef = this.panelHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<PanelComponent>(panelItem.component);
    componentRef.instance.data = panelItem.data;

  }

  getPanels() {
    setTimeout(() => {
      this.loadComponent_by_type();

    }, 1000);
  }
}
