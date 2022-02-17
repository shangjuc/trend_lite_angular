import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
export interface Translation {
  [key: string]: string
}

export interface SearchConfig  {
  q: string,
  st: string,
  et: string,
  pf: string,
  pfs: string,
  pls: string
}
export const search_config  = {
  q: "",
  st: "",
  et: "",
  pf: "",
  pfs: "",
  pls: ""
}

export const translation_zhtw: Translation = {
  'hash': 'No.',
  'from_name': '來源',
  'content': '內容',
  'engagement_score': '影響力',
  'reaction_all': '互動數',
  'share_count': '分享數',
  'comment_count': '留言數',
  'push': '推文數',
  'boo_count': '噓文數',
  'dif_count': '淨推數',
}
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

      Object.keys(search_config).forEach(item=>{
        this.set_url_param(item, this.search_config[item as keyof Object]);
      })
      // this.set_url_param('q', this.search_config["q"]);

    })
  }

  async read_url_to_searchconfig(): Promise<any> {

    let urlstr: string = document.location.toString();
    let params: any = new URL(urlstr).searchParams;

    let today = new Date();
    let et = formatDate(today, 'yyyy-MM-dd', this.locale);
    let st = formatDate(today.setDate(today.getDate() - 7), 'yyyy-MM-dd', this.locale);

    this.search_config.q = params.get('q') || "";
    this.search_config.st = params.get('st') || st;
    this.search_config.et = params.get('et') || et;
    this.search_config.pf = params.get('pf') || "FB";
    this.search_config.pfs = params.get('pfs') || "FB,FORUM";
    this.search_config.pls = params.get('pls') || "HP,LC";

    return await params
  }



  set_url_param(param_key: string, param_value: any): void {
    let urlstr: string = document.location.toString();
    const url = new URL(urlstr);
    url.searchParams.set(param_key, param_value);
    window.history.pushState({}, '', url);
  }



}
