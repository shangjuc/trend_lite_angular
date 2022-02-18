import { Component, OnInit } from '@angular/core';
import { translation_zhtw } from '../app-config/translation';
import { search_config } from '../app-config/searchconfig';
import { PanelItem } from '../panel/panel-item';
import { PanelService } from '../panel/panel.service';



@Component({
  selector: 'app-mcp',
  templateUrl: './mcp.component.html',
  styleUrls: ['./mcp.component.scss']
})
export class McpComponent implements OnInit {
  panel_list: any = {};
  panel_type: string = "";
  search_config = search_config;
  selected_pls:any = [];

  constructor(private panelService: PanelService) { }

  ngOnInit(): void {
    this.read_url().then(
      ()=>{
        this.panel_list = this.panelService.getPanels();
      }
    )
  }


  async read_url(): Promise<any> {

    let urlstr: string = document.location.toString();
    let params: any = new URL(urlstr).searchParams;
    let pls = params.get('pls') || "";
    this.selected_pls = pls.split(",");
    return await params
  }

}
