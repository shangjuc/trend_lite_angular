import { AfterViewInit, Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { search_config } from '../app-config/searchconfig';
import { translation_zhtw } from '../app-config/translation';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { server_origin } from '../app-config/location'
import { formatDate } from '@angular/common';

interface Panel {
  [pf: string]: Platform,
}
interface Platform {
  // post_arr: Array<Post>
  post_arr: Post[],
  selected_columns: string[];
  max_of_columns: any;
  color_of_columns: any;
}

interface Post {
  pf: string,
  hash: number,
  content: string,
  board?: string,
  from_name?: string,
  reaction_all?: number,
  share_count?: number,
  comment_count?: number,
  engagement_score?: number,
  colors?: any,
  maxes?: any,
}

@Component({
  selector: 'app-hp-mat',
  templateUrl: './hp-mat.component.html',
  styleUrls: ['./hp-mat.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class HpMatComponent implements OnInit, AfterViewInit {



  translation_zhtw = translation_zhtw;
  search_config = search_config;
  server_origin = server_origin;
  resp_query: string = "";


  pf_now: string = "FB";
  FB: Platform = {
    post_arr: [],
    selected_columns: ['reaction_all', 'comment_count', 'share_count', 'engagement_score'],
    max_of_columns: {},
    color_of_columns: {},
  };
  FORUM: Platform = {
    post_arr: [],
    selected_columns: ['push', 'boo_count', 'dif_count'],
    max_of_columns: {},
    color_of_columns: {},
  }
  HP: Panel = {
    FB: this.FB,
    FORUM: this.FORUM,
  }

  temp_colors: string[] = ['255, 59, 17,', '125, 206, 160,', '133, 193, 233,', '165, 105, 189,']
  dataSource = new MatTableDataSource<Post>();
  default_columns: string[] = ['hash', 'from_name', 'content', 'time'];
  columnsToDisplay: string[] = [];
  expandedElement: Post | null = null;
  expandedElementArr: Post[] = [];
  expand_all: boolean = false;
  totalCount: number = 0;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(@Inject(LOCALE_ID) private locale: string) { }


  ngOnInit(): void {

    this.read_url().then((params) => {

      if(this.search_config.pf !== ""){
        this.pf_now = this.search_config.pf;
      }

      if (this.search_config.q !== "") {
        this.fetch_data().then((resp) => {
          this.resp_query = this.search_config.q;
          this.convert_resp(resp)
        })
        .catch(e => {
          this.resp_query = this.search_config.q;
          console.log('錯誤! 描述: ' + e.message);
        });
      }
      this.dataSource.paginator = this.paginator;

    })
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }



  toggle_post_open_mat(post: Post): void {
    if (this.expandedElementArr.includes(post)) {
      this.expandedElementArr.splice(this.expandedElementArr.indexOf(post), 1);
    } else {
      this.expandedElementArr.push(post);
    }
    // console.log(this.expandedElementArr)
  }



  async read_url(): Promise<any> {

    let urlstr: string = document.location.toString();
    let params: any = new URL(urlstr).searchParams;
    return await params
  }

  async fetch_data(): Promise<void> {
    this.resp_query = "";

    let url = `${this.server_origin}/trendapi/api_analytics_hotposts?`;
    let params = {
      q: JSON.stringify(this.search_config.q.split(',')),
      st: this.search_config.st,
      et: this.search_config.et,
      nation: this.search_config.nation,
      channels: JSON.stringify(this.search_config.pfs.split(","))
    }

    // let response = await fetch(`http://localhost:3000/trendapi/api_analytics_hotpost?q=${this.search_config.q}`);
    let response = await fetch(url + String(new URLSearchParams(params)));

    if (!response.ok) {
      throw new Error(`HTTP 錯誤 status: ${response.status}`);
    }
    return await response.json()
  }


  convert_resp(resp: any) {
    // console.log(resp)

    let pf_arr = [
      ['FORUM', 'forum_raw'],
      ['FB', 'fb_raw'],
    ];

    pf_arr.forEach((pf_item)=>{
      if (pf_item[1] in resp.data[0]) {
        let raw = resp.data[0][pf_item[1]];
        let temp_arr = [];
        let temp_pf = pf_item[0];
        for (let i = 0; i < this.HP[temp_pf].selected_columns.length; i++) {
          this.HP[temp_pf].max_of_columns[this.HP[temp_pf].selected_columns[i]] = 0;
          this.HP[temp_pf].color_of_columns[this.HP[temp_pf].selected_columns[i]] = this.temp_colors[i];
        }
        for (let i = 0; i < raw.length; i++) {
          let item = raw[i];
          item.pf = temp_pf;
          item.hash = i + 1;
          if (temp_pf === "FORUM") {
            item.from_name = item.board;
          }
          if (temp_pf === "FB"){
            item.content = item.text;
          }
          item.time = formatDate(item.ts, 'yyyy-MM-dd HH:mm', this.locale);
          item.engagement_score = Math.floor(item.engagement_score * 10) / 10;
          temp_arr.push(item);
          item.colors = {};
          item.maxes = {};
          for (let j = 0; j < this.HP[temp_pf].selected_columns.length; j++) {
            this.HP[temp_pf].max_of_columns[this.HP[temp_pf].selected_columns[j]] = Math.max(this.HP[temp_pf].max_of_columns[this.HP[temp_pf].selected_columns[j]], item[this.HP[temp_pf].selected_columns[j]]);
          }
        }
        for (let i = 0; i < raw.length; i++) {
          let item = raw[i];
          for (let j = 0; j < this.HP[temp_pf].selected_columns.length; j++) {
            item.colors[this.HP[temp_pf].selected_columns[j]] = this.HP[temp_pf].color_of_columns[this.HP[temp_pf].selected_columns[j]]
            item.maxes[this.HP[temp_pf].selected_columns[j]] = this.HP[temp_pf].max_of_columns[this.HP[temp_pf].selected_columns[j]]
          }

        }
        this.HP[temp_pf].post_arr = temp_arr;
        // this.pf = temp_pf;
      }
    })

    this.reset_table_data(this.pf_now);
    console.log(this)
  }

  set_bg_color(element:any, column:string, pf:string){
    // console.log(element,column,pf)

    let bg_color = "#FFF";
    if (element.colors[column]){
      bg_color = `rgba(${element.colors[column]} ${element[column] / element.maxes[column]})`;
    }
    // console.log(bg_color)
    return bg_color;

  }
  reset_table_data(pf: string){
    let arr = this.HP[pf].post_arr;
    this.dataSource = new MatTableDataSource<Post>(arr);
    this.totalCount = arr.length;
    this.dataSource.paginator = this.paginator;
    this.columnsToDisplay = this.default_columns.concat(this.HP[pf].selected_columns);
  }

  click_pf(pf:string){
    this.pf_now = pf;
    this.reset_table_data(pf);
    this.set_url_pf(pf);
  }



  set_url_pf(pf:string):void{
    let urlstr: string = document.location.toString();
    const url = new URL(urlstr);
    url.searchParams.set('pf', pf);
    window.history.pushState({}, '', url);
  }



}
