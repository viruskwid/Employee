import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {
 @Output() onAdminChange = new EventEmitter()
  adminDetails:any={}
  editAdminStatus:boolean= false
  profilePicture:string="https://img.freepik.com/premium-vector/young-man-freelancers-working-laptop-computer-freelance-job-concept-developing-programming_435184-1090.jpg"

  constructor(private adminAPI:AdminService , private toaster:ToastrService){}
ngOnInit(): void {
  this.adminAPI.getAdminDetails().subscribe((res:any)=>{
    this.adminDetails=res
    if (res.profilePicture) {
      this.profilePicture=res.profilePicture
    }
  })
}
  editAdminBtn(){
    this.editAdminStatus= ! this.editAdminStatus
  }
  onCancel(){
    this.editAdminStatus=false
  }
  getFile(event:any){
    let file= event.target.files[0]
    let fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = (event:any)=>{
      console.log(event.target.result);
      this.profilePicture=event.target.result
      this.adminDetails.profilePicture=event.target.result
      
    }
  }
  updateAdmin(){
    this.adminAPI.updateAdminAPI(this.adminDetails).subscribe({
      next:(res:any)=>{
        this.editAdminStatus =false
        this.toaster.success("updated")
        sessionStorage.setItem("adminDetails",JSON.stringify(res))
        this.onAdminChange.emit(res.
name
)
      },error:(reason:any)=>{
        this.toaster.warning("failed to update")
      }
    })
  }
}
