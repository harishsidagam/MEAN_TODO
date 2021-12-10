import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { BackendServiceService } from 'src/app/service/backend-service.service';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:any;
  token:any;
  email:any
  hide = true;
  hide1 = true;
  validate:any;
  log:any;
  errMessage:any;
  constructor(public router:Router,
    private fb:FormBuilder,
    private arouter:ActivatedRoute,
    private backend:BackendServiceService) { }

  ngOnInit(): void {
    this.formbuilder()
    combineLatest([this.arouter.params,this.arouter.queryParams])
    .subscribe(([params,queryParams])=>{
      this.email=params.email;
      this.token = params.token;
      if(this.email && this.token){
        this.VerifyToken();
       }
    });
  }
VerifyToken(){
  this.backend.verifyMail(this.email,this.token).subscribe(async(data)=>{
    console.log(data)
  });
}
  formbuilder(){
    this.form = this.fb.group({
      email: ['',[Validators.required,Validators.pattern('^[A-Za-z0-9._%-]+@[a-z0-9._%-]+\\.[a-z]{2,4}$')],],
      password:['',[Validators.required,Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'),],],
  });
}
    get Email(){

      return this.form.get('email');
      }
      get password(){
      return this.form.get('password')
      }


      submitform() {
        if (!this.form.valid){
          return
        }
        let temp = this.form.value;
        let obj :any={}
        let use:any={};
       obj.email = temp.email
       obj.password = temp.password

     this.log = this.backend.login(obj).subscribe(async(res)=>{
      use = res;
      this.validate = use.message
        if(use.success==true){
          let user = use.obj.user
          localStorage.setItem('email',user.email)
          localStorage.setItem('username',user.username)
          console.log(user.username)
          this.router.navigate(["todo"]);
          return true
        }else{
         return false
        }
      });
    }
}
