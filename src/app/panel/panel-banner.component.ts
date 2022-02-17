import { Component, Input, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';

import { PanelDirective } from './panel.directive';
import { PanelItem } from './panel-item';
import { PanelComponent } from './panel.component';

@Component({
  selector: 'app-panel-banner',
  templateUrl: './panel-banner.component.html',
})
export class PanelBannerComponent implements AfterViewInit, OnDestroy {
  @Input() panels: PanelItem[] = [];
  @Input() panel_type: string = "hp-mat";

  currentPanelIndex = -1;

  @ViewChild(PanelDirective, {static: true}) panelHost!: PanelDirective;
  // interval: number|undefined;
  interval: any;

  ngAfterViewInit() {
    // this.loadComponent();
    this.getPanels();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentPanelIndex = (this.currentPanelIndex + 1) % this.panels.length;
    const panelItem = this.panels[this.currentPanelIndex];

    const viewContainerRef = this.panelHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<PanelComponent>(panelItem.component);
    componentRef.instance.data = panelItem.data;
  }
  loadComponent_by_type() {
    // this.currentPanelIndex = (this.currentPanelIndex + 1) % this.panels.length;
    console.log(this.panel_type);

    let panelItem = this.panels[0];
    if(this.panel_type === 'hp-mat'){
      panelItem = this.panels[1];
    } else if (this.panel_type === 'lc'){
      panelItem = this.panels[0];
    }
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
  // getPanels() {

  //   this.interval = setInterval(() => {
  //    this.loadComponent();
  //   }, 3000);
  // }
}
