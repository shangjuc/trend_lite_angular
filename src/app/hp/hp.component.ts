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

@Component({
  selector: 'app-hp',
  templateUrl: './hp.component.html',
  styleUrls: ['./hp.component.scss']
})

export class HotPostComponent implements OnInit {

  constructor() { }

  pf: string = "FB";
  page: number = 1;
  page_arr: Array<number> = [];
  post_open_arr: Array<number> = [0];

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

  ngOnInit(): void {

    // console.log(window.location);

    let urlstr:string = document.location.toString();
    let params = new URL(urlstr).searchParams;
    let st = params.get('st');
    let query = params.get('q');
    console.log(st,query);

    async function myFetch() {
      let response = await fetch('http://localhost:3000/trendapi/api_analytics_hotpost');

      if (!response.ok) {
        throw new Error(`HTTP 錯誤 status: ${response.status}`);
      }
      return await response.json()
    }

    myFetch()
      .then((resp)=>{
        console.log(resp)
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
        console.log(this)
      })
      .catch(e => {
        console.log('錯誤描述: ' + e.message);
      });


  }

}
