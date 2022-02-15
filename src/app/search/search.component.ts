import { Component, OnInit } from '@angular/core';
import { translation_zhtw, SearchConfig, search_config } from '../app.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  query: string = "";
  temp_query: string = "";
  resp_query: string = "";
  search_config = search_config;


  enter_input_query(event: any): void {

    if (event.keyCode === 13) {
      // console.log("13");
      this.click_input_query();
    }
  }
  click_input_query(): void {
    this.search_config.q = this.temp_query;
    this.set_url_q(this.search_config.q);
      
  }

  set_url_q(q:string):void{
    let urlstr: string = document.location.toString();
    const url = new URL(urlstr);
    url.searchParams.set('q', q);
    window.history.pushState({}, '', url);
  }

  async read_url(): Promise<any> {

    let urlstr: string = document.location.toString();
    let params: any = new URL(urlstr).searchParams;
    this.search_config.q = params.get('q') || "";
    this.search_config.st = params.get('st') || "";
    this.search_config.et = params.get('et') || "";
    this.search_config.pf = params.get('pf') || "";
    this.search_config.pfs = params.get('pfs') || "";
    return await params
  }


}
