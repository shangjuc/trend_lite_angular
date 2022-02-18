import { Component, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { isValidDate } from './app-config/formattime';
import { search_config } from './app-config/searchconfig';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'trend_lite_angular';

  search_config = search_config;

  constructor(@Inject(LOCALE_ID) private locale: string){}
  ngOnInit(): void {

    this.read_url_to_searchconfig().then((params) => {

      Object.keys(this.search_config).forEach(item=>{
        this.set_url_param(item, this.search_config[item as keyof Object]);
      })
      // this.set_url_param('q', this.search_config["q"]);

    })
  }

  async read_url_to_searchconfig(): Promise<any> {

    let url_str: string = document.location.toString();
    let params: any = new URL(url_str).searchParams;

    let today = new Date();
    let st_default: Date = new Date(new Date().getTime() - 86400000 * 7);
    let et_default: Date = new Date();
    let st_min: Date = new Date(new Date().getTime() - 86400000 * 30);
    let et_min: Date = new Date(new Date().getTime() - 86400000 * 30);
    // let et_min: Date = new Date(new Date().setDate(new Date().getDate() - 30));

    this.search_config.q = params.get('q') || "";


    // this.search_config.st = params.get('st') || st_default;
    let st_custom: Date = new Date(params.get('st'))
    if (  isValidDate(st_custom)
          && st_custom.getTime() <= today.getTime()
          && st_custom.getTime() >= st_min.getTime()
          ){
      this.search_config.st = formatDate(st_custom, 'yyyy-MM-dd', this.locale);
      et_min = st_custom;
      et_default = new Date(st_custom.getTime() + 86400000 * 7)
    } else {
      this.search_config.st = formatDate(st_default, 'yyyy-MM-dd', this.locale);
      et_min = st_default;
    }


    // this.search_config.et = params.get('et') || et_default;
    let et_custom: Date = new Date(params.get('et'))
    if (  isValidDate(et_custom)
          && et_custom.getTime() <= today.getTime()
          && et_custom.getTime() >= et_min.getTime()
        ) {
      this.search_config.et = formatDate(et_custom, 'yyyy-MM-dd', this.locale)
    } else {
      this.search_config.et = formatDate(et_default, 'yyyy-MM-dd', this.locale);
    }


    this.search_config.nation = params.get('nation') || "Global";
    this.search_config.pf = params.get('pf') || "FB";
    this.search_config.pfs = params.get('pfs') || "FB,FORUM";
    this.search_config.pls = params.get('pls') || "HP,LC";

    return await params
  }



  set_url_param(param_key: string, param_value: any): void {
    let url_str: string = document.location.toString();
    const url = new URL(url_str);
    url.searchParams.set(param_key, param_value);
    window.history.pushState({}, '', url);
  }



}
