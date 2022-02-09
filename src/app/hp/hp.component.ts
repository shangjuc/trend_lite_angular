import { Component, OnInit } from '@angular/core';

interface Panel {
  [pf:string]: PF,
}

interface PF {
  post_arr: Array<Post>
}

interface Post {
  pf: string,
  hash: number,
  content: string,
  board?: string,
  from_name?: string,
}

interface SearchConfig {
  q: string,
  st: string,
  et: string,
}

@Component({
  selector: 'app-hp',
  templateUrl: './hp.component.html',
  styleUrls: ['./hp.component.scss']
})

export class HotPostComponent implements OnInit {

  constructor() { 

  }

  pf: string = "FB";
  page: number = 1;
  page_arr: Array<number> = [];
  // post_open_arr: Array<number> = [0];
  post_open_arr: Array<number> = [];

  FB:PF = {
    post_arr: []
  };
  FORUM:PF = {
    post_arr: []
  }

  HP:Panel = {
    FB: this.FB,
    FORUM: this.FORUM,
  }
  
  search_config:SearchConfig = {
    q: "",
    st: "",
    et: "",
  }

  query:string = "";
  temp_query:string = "";
  resp_query:string = "";

  toggle_post_open(post_idx: number):void{
    if (this.post_open_arr.includes(post_idx)){
      this.post_open_arr.splice(this.post_open_arr.indexOf(post_idx), 1);
    }else{
      this.post_open_arr.push(post_idx);
    }
    console.log(this.post_open_arr)
  }

  toggle_post_open_all(tf:boolean):void{
    this.post_open_arr = [];
    if(tf){
      for(let i = (this.page - 1) * 10; i < this.page * 10; i++){
        this.post_open_arr.push(i)
      }
    }
    console.log(this.post_open_arr)
  }

  count_final_page():void{
    this.page_arr = [];
    let p_length = 0;
    if(this.pf === "FB"){
      p_length = Math.ceil(this.FB.post_arr.length / 10) + 1;
    } else if(this.pf === "FORUM"){
      p_length = Math.ceil(this.FORUM.post_arr.length / 10) + 1;
    }
    for (let i = 1; i < p_length; i++) {
      this.page_arr.push(i);
    }
    // console.log(this.page_arr)
  }


  async read_url():Promise<any>{

    let urlstr:string = document.location.toString();
    let params:any = new URL(urlstr).searchParams;
    return await params
  }
  
  async fetch_data():Promise<void> {
    this.resp_query = "";

    let response = await fetch(`http://localhost:3000/trendapi/api_analytics_hotpost?q=${this.search_config.q}`);

    if (!response.ok) {
      throw new Error(`HTTP 錯誤 status: ${response.status}`);
    }
    return await response.json()
  }

  convert_resp(resp:any){
    // console.log(resp)
          let arr = [];
          if ("forum_raw" in resp.data[0]) {
            let raw = resp.data[0]["forum_raw"];
            let temp_arr = [];
            for (let i = 0; i < raw.length; i++) {
              let item: Post = raw[i];
              item.pf = "FORUM";
              item.hash = i + 1;
              item.from_name = item.board;
  
              // item.time = format(item.ts, 'yyyy-MM-dd HH:mm');
              // item.time2 = format(item.ts, 'yyyy年MM月dd日 HH:mm');
              temp_arr.push(item);
            }
            arr = temp_arr;
            // this.FORUM.post_arr = temp_arr.slice(0, 110);
            this.FORUM.post_arr = temp_arr;
            this.count_final_page();
  
          }
          if ("fb_raw" in resp.data[0]) {
            let raw = resp.data[0]["fb_raw"];
            let temp_arr = [];
            for (let i = 0; i < raw.length; i++) {
              let item = raw[i];
              item.pf = "FB";
              item.hash = i + 1;
              // item.time = format(item.ts, 'yyyy-MM-dd HH:mm');
              // item.time2 = format(item.ts, 'yyyy年MM月dd日 HH:mm');
              item.content = item.text;
              temp_arr.push(item);
            }
            arr = temp_arr;
            this.FB.post_arr = temp_arr.slice(0,99);
            this.count_final_page();
  
          }
          // console.log(this)
  }
  enter_input_query(event:any): void{

    if(event.keyCode === 13){
      // console.log("13");
      this.click_input_query();
    }
  }
  click_input_query(): void{

    this.search_config.q = this.temp_query;
    this.fetch_data().then((resp)=>{
      this.resp_query = this.temp_query;
      this.convert_resp(resp);
      // processAjaxData(null, "AAAAA");
      let urlstr:string = document.location.toString();
      const url = new URL(urlstr);
      url.searchParams.set('q', this.search_config.q);
      window.history.pushState({}, '', url);
    })
    .catch(e => {
      console.log('錯誤! 描述: ' + e.message);
    }); 
  
  }

  ngOnInit(): void {

    this.read_url().then((params)=>{

      let st = params.get('st');
      let et = params.get('et');
      let query = params.get('q');


      if(!query){
        console.log("Please input your query")
        this.search_config.q = "";

      } else {
        this.search_config.q = query;
        this.fetch_data().then((resp)=>{
          this.resp_query = this.search_config.q;
          this.convert_resp(resp)
        })
        .catch(e => {
          console.log('錯誤! 描述: ' + e.message);
        }); 
      }  
    })
  }

}
