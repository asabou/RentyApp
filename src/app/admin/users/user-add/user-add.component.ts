import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AnonService } from 'src/app/anon/shared/anon.service';
import { LoginService } from 'src/app/login/shared/login.service';
import { RenterService } from 'src/app/renter/shared/renter.service';
import { Message } from 'src/app/utils/message.model';
import { ServicesUtils } from 'src/app/utils/services-utils.model';
import { Role } from '../../roles/shared/role.model';
import { AdminService } from '../../shared/admin.service';
import { UserDetails } from '../shared/user-details.model';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  user: UserDetails = new UserDetails(null);

  roles: Role[];
  canRender: boolean = false;
  hasAdminRights: boolean = false;

  constructor(private adminService: AdminService,
    private renterService: RenterService,
    private anonService: AnonService,
    private loginService: LoginService,
    private dialogRef: MatDialogRef<UserAddComponent>,
    private toastr: ToastrManager) {
      this.hasAdminRights = this.loginService.hasAdminRights();
    }

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles(): void {
    this.adminService.getAllRoles().subscribe(roles => {
      this.roles = roles;
      this.canRender = true;
    });
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

  onCancelModifications() {
    this.dialogRef.close();
  }

  onSaveModifications() {
    this.user.user.password = ServicesUtils.base64Encode(this.user.user.password);
    this.addUser();
  }
  
  private createRenterUser(): void {
    this.anonService.createRenterUser(this.user).subscribe(data => {
      this.toastr.infoToastr(Message.ENTITY_UPDATED_SUCCESSFULLY, Message.INFORMATION);
      this.dialogRef.close();
    });
  }

  private addUser(): void {
    if (this.roleIsContained("ADMIN")) {
      this.adminService.createAdminAccount(this.user).subscribe(data => {
        this.toastr.infoToastr(Message.ENTITY_UPDATED_SUCCESSFULLY, Message.INFORMATION);
        this.dialogRef.close();
      });
      return;
    }
    if (this.roleIsContained("OWNER")) {
      this.adminService.createOwnerAccount(this.user).subscribe(data => {
        this.toastr.infoToastr(Message.ENTITY_UPDATED_SUCCESSFULLY, Message.INFORMATION);
        this.dialogRef.close();
      });
      return;
    }
    if (this.roleIsContained("RENTER")) {
      this.createRenterUser();
      return;
    } else {
      this.createRenterUser();
    }
  }

}
