import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from 'src/app/commons/abstract.component';
import { AdminService } from '../shared/admin.service';
import { Role } from './shared/role.model';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent extends AbstractComponent implements OnInit {
  isLoading: boolean;
  roles: Role[];

  constructor(private adminService: AdminService) { 
    super();
  }

  getEntityId(): number {
    throw new Error('Method not implemented.');
  }

  getAllData(): void {
    this.getRoles();
  }

  afterDelete(id: string): void {
    throw new Error('Method not implemented.');
  }

  getTableId(): string {
    return "rolesTable";
  }

  getRoles(): void {
    this.isLoading = true;
    this.adminService.getAllRoles().subscribe(roles => {
      this.roles = roles;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.getAllData();
  }

}
