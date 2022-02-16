import { Component } from '@angular/core';

export interface Translation {
  [key: string]: string
}

export interface SearchConfig {
  q: string,
  st: string,
  et: string,
  pf: string,
  pfs: string,
}

export const search_config: SearchConfig  = {
  q: "",
  st: "",
  et: "",
  pf: "FB",
  pfs: "FB,FORUM",
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
}
