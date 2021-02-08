import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrManager } from 'ng6-toastr-notifications';
import { forkJoin } from 'rxjs';
import { RenterService } from 'src/app/renter/shared/renter.service';
import { Message } from 'src/app/utils/message.model';
import { Role } from '../../roles/shared/role.model';
import { AdminService } from '../../shared/admin.service';
import { UserDetails } from '../shared/user-details.model';
import { UserSearchObject } from '../shared/user-search.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  userId: string;
  user: UserDetails;
  canRender = false;
  roles: Role[];

  constructor(private adminService: AdminService, 
    private renterService: RenterService,
    private dialogRef: MatDialogRef<UserEditComponent>, 
    private toastr: ToastrManager, 
    @Inject(MAT_DIALOG_DATA) data) { 
    this.userId = data;
  }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(): void {
    forkJoin([this.adminService.findUserById(this.userId), this.adminService.getAllRoles()]).subscribe(([user, roles]) => {
      this.user = user;
      this.roles = roles;
      this.canRender = true;
    });
  }

  onSaveModifications() {
    this.updateUser();
    this.dialogRef.close();
  }

  onCancelModifications() {
    this.dialogRef.close();
  }

  unassignRole(role: Role): void {
    this.removeRoleFromUserRoles(role);
  }

  private removeRoleFromUserRoles(role: Role): void {
    let roles = this.user.user.roles;
    let rolesUpdated: Role[] = [];
    for (let rol of roles) {
      if (rol.role !== role.role) {
        rolesUpdated.push(rol);
      }
    }
    this.user.user.roles = rolesUpdated;
  }
  
  assignRole(role: string): void {
    for (let rol of this.roles) {
      if (rol.role === role && !this.roleIsContained(role)) {
        let roles = this.user.user.roles;
        roles.push(rol);
        this.user.user.roles = roles;
        return;
      }
    }
  }

  private roleIsContained(role: string): boolean {
    let roles = this.user.user.roles;
    for (let rol of roles) {
      if (rol.role === role) {
        return true;
      }
    }
    return false;
  }

  updateUser(): void {
    forkJoin([this.adminService.updateRoleForUser(this.user), this.renterService.updateAccount(this.user)]).subscribe(([rolresp, userresp]) => {
      this.toastr.infoToastr(Message.ENTITY_UPDATED_SUCCESSFULLY, Message.INFORMATION);
    });
  }
}
