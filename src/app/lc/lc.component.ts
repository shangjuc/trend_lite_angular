import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lc',
  templateUrl: './lc.component.html',
  styleUrls: ['./lc.component.scss']
})
export class LineChartComponent implements OnInit {

  constructor() { }
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
      { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: { color: 'red' } },
      { x: [1, 2, 3], y: [2, 5, 3], type: 'scatter' },
    ],
    layout: this.layout,
    config: this.config,
  };

  ngOnInit(): void {
  }

}
