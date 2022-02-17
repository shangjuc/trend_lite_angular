import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[panelHost]',
})
export class PanelDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

