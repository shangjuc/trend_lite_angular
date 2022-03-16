import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { search_config } from '../app-config/searchconfig';
import { translation_zhtw } from '../app-config/translation';
import { server_origin } from '../app-config/location'



interface Panel {
  [pf: string]: PF,
}
interface PF {
  x:string[],
  y:number[],
  date_obj_arr?: object[] | undefined[]
}

interface DateObj {
  date: string,
  engagement_score?: number,
}


@Component({
  selector: 'app-lc',
  templateUrl: './lc.component.html',
  styleUrls: ['./lc.component.scss']
})
export class LineChartComponent implements OnInit {

  constructor(@Inject(LOCALE_ID) private locale: string) { }

  translation_zhtw = translation_zhtw;
  search_config = search_config;
  server_origin = server_origin;
  resp_query: string = "";
  // formatDate = formatDate;


  pf: string = "FB";
  FB: PF = {
    x:[],
    y:[],
    date_obj_arr:[]
  };
  FORUM: PF = {
    x: [],
    y: [],
    date_obj_arr: []
  }
  HP: Panel = {
    FB: this.FB,
    FORUM: this.FORUM,
  }

  ngOnInit(): void {
    this.read_url().then((params) => {


      if (this.search_config.pf !== "") {
        this.pf = this.search_config.pf;
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

    })
  }



  async read_url(): Promise<any> {

    let urlstr: string = document.location.toString();
    let params: any = new URL(urlstr).searchParams;
    return await params
  }

  async fetch_data(): Promise<void> {

    // this.resp_query = "";
    let url = `${this.server_origin}/trendapi/api_analytics_timeseries?`;
    let params = {
      q: JSON.stringify(this.search_config.q.split(',')),
      st: this.search_config.st,
      et: this.search_config.et,
      nation: this.search_config.nation,
      channels: JSON.stringify(this.search_config.pfs.split(","))
    }

    // let response = await fetch(`http://localhost:3000/trendapi/api_analytics_timeseries?q=${this.search_config.q}`);
    let response = await fetch(url + String(new URLSearchParams(params)));

    if (!response.ok) {
      throw new Error(`HTTP 錯誤 status: ${response.status}`);
    }
    return await response.json()
  }


  convert_resp(resp: any) {
    console.log(resp);

    let date_arr:string[] = [];
    let st = new Date(resp.st);
    let et = new Date(resp.et);
    let days = (et.getTime() - st.getTime())/ 86400000;

    for(let i = 0; i <= days; i++){
      let st = new Date(resp.st);
      let date = formatDate(st.setDate(st.getDate() + i), 'yyyy-MM-dd', this.locale);
      date_arr.push(date)
    }

    console.log(date_arr);

    if(true){
      this.HP["FB"].x = date_arr;
      for(let i = 0; i < date_arr.length; i++){

        let temp_obj = resp.data[0].time.find((item: any) => item.date === date_arr[i])
        let date_obj:DateObj = {date:"", };
        if(temp_obj){
          date_obj.engagement_score = temp_obj.engagement_score;
        }
        this.HP["FB"].y.push(temp_obj.engagement_score);
        // this.HP["FB"].date_obj_arr.push(date_obj);

      }
      // this.HP["FB"].y = [];

    }

    this.graph.data[0].x = this.HP["FB"].x;
    this.graph.data[0].y = this.HP["FB"].y;

    console.log(this)
  }

  get_font_size(mag: number): any {
    let ww = window.innerWidth;
    if (mag === undefined) {
      mag = 1;
    }
    // console.log(ww);
    if (ww > 1000) {
      return 18 * mag
    } else if (ww > 600) {
      return 14 * mag
    } else {
      return 12 * mag
    }
  }
  layout = {
    hovermode: 'x unified',
    // showlegend: false,
    xaxis: {
      gridwidth: 2,
      autorange: true,
      tickformat: '%m/%d',
      // fixedrange: true
    },
    yaxis: {
      // fixedrange: true
    },
    font: {
      size: this.get_font_size(1),
    },
    margin: {
      l: this.get_font_size(6),
      r: this.get_font_size(2)
    },
    legend: {
      x: 1,
      xanchor: 'right',
      y: 1,
      yanchor: 'bottom',
    },
    paper_bgcolor: '#F3F3F3',
    plot_bgcolor: '#F3F3F3',
  };
  config = {
    responsive: true,
    displaylogo: false,
    // displayModeBar: false
  };

  public graph = {
    data: [
      { x: ['2000-01-01', '2000-01-02', '2000-01-03'], y: [0, 0, 0], type: 'scatter', mode: 'lines+points', marker: { color: 'red' } },
      // { x: ['2022-02-14', '2022-02-15', '2022-02-16'], y: [2, 5, 3], type: 'scatter' },
    ],
    layout: this.layout,
    config: this.config,
  };


}
