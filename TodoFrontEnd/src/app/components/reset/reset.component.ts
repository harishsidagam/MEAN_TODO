import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { BackendServiceService } from 'src/app/service/backend-service.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  form:any;
  token:any;
  CurrentState: any;
  hide = true;
  hide1 = true;
  isVerified = true;

  constructor(public router:Router,private fb:FormBuilder, private backend:BackendServiceService,private arouter:ActivatedRoute) {
    this.CurrentState = 'Wait';
    this.arouter.params.subscribe(params=>{
      this.token = params.token;
      this.verifyToken()
    });
   }

  ngOnInit(): void {
    this.formbuilder()
  }
  formbuilder(){
    this.form = this.fb.group({

      newPassword:['',[Validators.required,Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'),],],
      confirmPassword:['',[Validators.required,Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'),],],
  });

  }
    get newPassword(){
      return this.form.get('newPassword')
      }
    get confirmPassword(){
      return this.form.get('confirmPassword')
    }

    verifyToken(){
      let obj:any={}
      obj.token=this.token;
      this.backend.validToken(obj).subscribe((data)=>{
        this.CurrentState = 'Verified';
      },err=>{
        this.CurrentState = 'NotVerified';
      });
    }

    reset() {
      if(this.form.valid){
       this.isVerified=true
       this.backend.newPassword(this.form.value).subscribe((data)=>{
        this.form.reset();
        this.router.navigate(['login']);
       });
      }else { this.isVerified = false; }
    }

    Validate(passwordFormGroup: FormGroup) {
      const new_password = passwordFormGroup.controls.newPassword.value;
      const confirm_password = passwordFormGroup.controls.confirmPassword.value;

      if (confirm_password.length <= 0) {
        return null;
      }

      if (confirm_password !== new_password) {
        return {
          doesNotMatch: true
        };
      }

      return null;
    }


}
