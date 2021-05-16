import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-abstract-export',
  templateUrl: './abstract-export.component.html',
  styleUrls: ['./abstract-export.component.scss']
})
export class AbstractExportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() label: string = "";
  @Input() objects:[] = [];
  @Input() header: string[] = [];
  @Input() type: string = "chart";
  
  exportToPNG() {
    let canvasArr = document.getElementsByTagName("canvas");
    let canvas = <HTMLCanvasElement> canvasArr[0];
    let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    link.download = this.label + ".png";
    link.href = image;
    link.click();
  }

  exportToCSV() {
    let csvData = this.convertToCSV(this.objects, this.header);
    let element = document.createElement('a');
    element.href = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csvData);
    element.target = '_blank';
    element.style.visibility = 'hidden';
    element.download = this.label + ".csv";
    element.click();
}

convertToCSV(objArray, headerList) {
    let array = objArray;
    let str = headerList.join(",") + "\r\n";
  
    for (let i = 0; i < array.length; i++) {
      let keys = Object.keys(array[i]);
      let lineArr = [];
      for (let key of keys) {
        let val = array[i][key];
        lineArr.push(val.toString().replaceAll(" ", "-")); 
      }
      let line = lineArr.join(",") + "\r\n";
      str += line;
    }
    return str;
 }


}
