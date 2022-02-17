import { Component, OnInit } from '@angular/core';

import { PanelService } from '../panel/panel.service';
import { PanelItem } from '../panel/panel-item';
import { translation_zhtw, search_config } from '../app.component';

@Component({
  selector: 'app-mcp',
  templateUrl: './mcp.component.html',
  styleUrls: ['./mcp.component.scss']
})
export class McpComponent implements OnInit {
  panels: any = {};
  panel_type: string = "";
  search_config = search_config;
  selected_pls:any = [];

  constructor(private panelService: PanelService) { }

  ngOnInit(): void {
    this.read_url().then(
      ()=>{
        this.panels = this.panelService.getPanels();
      }
    )
  }


  async read_url(): Promise<any> {

    let urlstr: string = document.location.toString();
    let params: any = new URL(urlstr).searchParams;
    this.search_config.pls = params.get('pls') || "";
    this.selected_pls = this.search_config.pls.split(",");
    return await params
  }

}
