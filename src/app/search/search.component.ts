import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { SearchConfig, search_config } from '../app.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  temp_config: any = {}
  search_config = search_config;

  constructor(private route: Router, @Inject(LOCALE_ID) private locale: string) {}

  ngOnInit(): void {

    this.read_url().then((params) => {

      Object.keys(search_config).forEach(item => {
        // if (this.search_config[item as keyof Object] !== "") {
        // }
        this.temp_config[item as keyof Object] = this.search_config[item as keyof Object];
      })



    })
  }

  enter_input_param(param_key: string, event: any): void {
    if (event.keyCode === 13) {
      // console.log("13");
      this.input_param(param_key);
    }
  }

  input_param(param_key:string){
    this.search_config[param_key as keyof SearchConfig] = this.temp_config[param_key as keyof SearchConfig];
    this.set_url_param(param_key, this.search_config[param_key as keyof SearchConfig]);
  }

  click_search(){

    Object.keys(search_config).forEach(item => {
      this.input_param(item)
    })
    let navigationExtras = {
      queryParams: this.search_config,
    };
    this.route.navigate(['/mcp'], navigationExtras);
  }

  set_url_param(param_key:string, param_value:string):void{
    let urlstr: string = document.location.toString();
    const url = new URL(urlstr);
    url.searchParams.set(param_key, param_value);
    window.history.pushState({}, '', url);
  }


  async read_url(): Promise<any> {

    let urlstr: string = document.location.toString();
    let params: any = new URL(urlstr).searchParams;
    return await params
  }

}
