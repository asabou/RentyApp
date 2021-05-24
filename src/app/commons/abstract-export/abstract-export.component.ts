import { Component, Input, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.objects);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, this.label);
    const stream = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob(['\ufeff', stream], { type: 'text/csv' });
    saveAs(blob, this.label + ".csv");  
  }
}

