import { Component, OnInit } from '@angular/core';

import { PanelService } from '../panel/panel.service';
import { PanelItem } from '../panel/panel-item';
@Component({
  selector: 'app-mcp',
  templateUrl: './mcp.component.html',
  styleUrls: ['./mcp.component.scss']
})
export class McpComponent implements OnInit {
  panels: PanelItem[] = [];
  paneltype: string = "";
  constructor(private panelService: PanelService) { }

  ngOnInit(): void {
    this.panels = this.panelService.getPanels();
  }

}
