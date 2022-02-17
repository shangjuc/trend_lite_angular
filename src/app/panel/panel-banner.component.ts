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

  currentPanelIndex = -1;

  @ViewChild(PanelDirective, {static: true}) panelHost!: PanelDirective;
  // interval: number|undefined;
  interval: any;

  ngAfterViewInit() {
    this.loadComponent();
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
  loadComponent_list() {
    // this.currentPanelIndex = (this.currentPanelIndex + 1) % this.panels.length;
    console.log(this.panels)
    const panelItem = this.panels[0];
    const viewContainerRef = this.panelHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<PanelComponent>(panelItem.component);
    componentRef.instance.data = panelItem.data;
  }

  getPanels() {
    setTimeout(() => {
      this.loadComponent_list();

    }, 3000);
    // this.interval = setInterval(() => {
    //  this.loadComponent();
    // }, 3000);
  }
}
