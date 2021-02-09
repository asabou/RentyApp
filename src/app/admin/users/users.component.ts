import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AbstractComponent } from 'src/app/commons/abstract.component';
import { DialogUtils } from 'src/app/utils/dialog-utils.model';
import { Message } from 'src/app/utils/message.model';
import { AdminService } from '../shared/admin.service';
import { UserDetailsFull } from './shared/user-details-full.model';
import { UserDetails } from './shared/user-details.model';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends AbstractComponent implements OnInit {
  isLoading: boolean;
  users: UserDetailsFull[] = [];
  userEditRef: MatDialogRef<UserEditComponent>;
  userAddRef: MatDialogRef<UserAddComponent>;

  constructor(private adminService: AdminService,
    private matDialog: MatDialog,
    private toastr: ToastrManager) {
    super();
  }

  ngOnInit(): void {
    this.getAllData();
  }

  getEntityId(): number {
    throw new Error('Method not implemented.');
  }

  getAllData(): void {
    this.getAllUsersDetails();
  }

  afterDelete(id: string): void {
    this.adminService.deleteAccount(id).subscribe(data => {
      this.toastr.infoToastr(Message.USER_DELETED_SUCCESSFULLY, Message.INFORMATION);
      this.getAllUsersDetails();
    });
  }

  onEditClick(id: string): void {
    this.openUserEditDialog(id);
  }

  private openUserEditDialog(id: string): void {
    let dialogConfig = DialogUtils.createDefaultPanelDialogConfig(295);
    dialogConfig.data = id;
    this.userEditRef = this.matDialog.open(
      UserEditComponent,
      dialogConfig
    );
    this.userEditRef.afterClosed().subscribe(data => {
      this.userEditRef = null;
      this.getAllUsersDetails();
    });
  }

  getTableId(): string {
    return "usersTable";
  }

  getAllUsersDetails(): void {
    this.isLoading = true;
    this.adminService.getAllUsersDetails().subscribe(users => {
      this.users = [];
      this.prepareUserDetails(users);
      this.isLoading = false;
    });
  }

  private prepareUserDetails(userDetails: UserDetails[]) {
    for (let user of userDetails) {
      this.users.push(this.convertUserDetails(user));
    }
  }

  private convertUserDetails(userDetails: UserDetails): UserDetailsFull {
    let user = new UserDetailsFull(userDetails);
    user.username = userDetails.user.username;
    user.roles = "";
    for (let role of userDetails.user.roles) {
      user.roles = user.roles + role.role + "\n"; 
    }
    return user;
  }

  onUserAddClick(): void {
    this.opendAddUserDialog();
  }

  private opendAddUserDialog(): void {
    let dialogConfig = DialogUtils.createDefaultPanelDialogConfig(400);
    this.userAddRef = this.matDialog.open(
      UserAddComponent,
      dialogConfig
    );
    this.userAddRef.afterClosed().subscribe(data => {
      this.userAddRef = null;
      this.getAllUsersDetails();
    });
  }
}
