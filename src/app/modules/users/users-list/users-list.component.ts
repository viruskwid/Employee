import { Component, OnInit } from '@angular/core';
import { UserSchema } from '../Models/userSchema';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  page:number = 1;
  allUsers: UserSchema[] = []
  searchKey:string=""
  constructor(private api: ApiService , private toaster:ToastrService) { }
  ngOnInit(): void {
    this.getAllUsersList()
      }

  getAllUsersList() {
    this.api.getAllUsersAPI().subscribe({
      next: (result: any) => {
        console.log(result);
        this.allUsers = result
        console.log(this.allUsers)
      },
      error: (reason: any) => {
        console.log(reason);
      }
    })
  }
  deleteUser(id:any){
    this.api.removeUserAPI(id).subscribe((res:any)=>{
      this.toaster.success("User Deleted")
    })
  }

  sortById(){
    this.allUsers.sort((user1:any,user2:any)=>user1.empId.localeCompare(user2.empId))
  }
  sortByName(){
    this.allUsers.sort((user1:any,user2:any)=>user1.name.localeCompare(user2.name))
  }
}