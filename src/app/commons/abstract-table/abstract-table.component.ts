import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SessionObjectService } from 'src/app/login/shared/session-object.service';
import { TableColumn } from './shared/table-column.model';

@Component({
  selector: 'app-abstract-table',
  templateUrl: './abstract-table.component.html',
  styleUrls: ['./abstract-table.component.scss']
})
export class AbstractTableComponent implements OnInit, AfterContentInit {

  constructor(private sessionObjectService: SessionObjectService) { }

  @Input() tableId: string;
  @Input() objectList: Object[];
  @Input() actions: string[]; //delete or edit

  @Output() delete: EventEmitter<string> = new EventEmitter();
  @Output() edit: EventEmitter<string> = new EventEmitter();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: MatTableDataSource<any>;
  visibleColumns: string[] = [];
  tableColumns: TableColumn[] = [];

  ngAfterContentInit(): void {
    this.initSort();
    this.initPaginator();
  }

  ngOnInit(): void {
    this.initTableColumns();
    this.initDataSource();
  }
  
  initTableColumns() {
    let tableData = this.sessionObjectService.getTableColumns()[this.tableId];
    for (let tableCol of tableData["fields"]) {
      let tableColumn = new TableColumn(tableCol);
      tableColumn.tableId = this.tableId;
      this.tableColumns.push(tableColumn);
      this.visibleColumns.push(tableCol["colId"]);
    }
    if (this.actions) {
      this.visibleColumns.push("actions");
    }
  }

  initDataSource() {
    this.dataSource = new MatTableDataSource(this.objectList);
  }

  initSort() {
    this.dataSource.sort = this.sort;
  }

  initPaginator() {
    this.dataSource.paginator = this.paginator;
  }

  onDelete(obj: Object): void {
    let id = obj["id"];
    this.delete.emit(id);
  }

  onEdit(obj: Object): void {
    let id = obj["id"];
    this.edit.emit(id);
  }

  actionsContainsDelete() {
    return this.actions.includes("delete");
  }

  actionsContainsEdit() {
    return this.actions.includes("edit");
  }

}
