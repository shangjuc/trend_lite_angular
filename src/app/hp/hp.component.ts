import { Component, OnInit } from '@angular/core';

interface PFS {
  FB: PF,
  FORUM: PF,
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

export class HPComponent implements OnInit {

  constructor() { }

  pf: string = "FB";
  page: number = 1;
  page_arr: Array<number> = [1];

  FB:PF = {
    post_arr: []
  };
  FORUM:PF = {
    post_arr: []
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
            // item.time = format(item.ts, 'yyyy-MM-dd HH:mm');
            // item.time2 = format(item.ts, 'yyyy年MM月dd日 HH:mm');
            temp_arr.push(item);
          }
          arr = temp_arr;
          this.FORUM.post_arr = temp_arr.slice(0, 110);
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
          this.FB.post_arr = temp_arr.slice(0,125);
          this.count_final_page();

        }
        console.log(this)
      })
      .catch(e => {
        console.log('錯誤描述: ' + e.message);
      });


  }

}
