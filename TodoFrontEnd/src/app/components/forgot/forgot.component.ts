import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { BackendServiceService } from 'src/app/service/backend-service.service';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  form:any;
  isVerified = true;
  constructor(public route:Router,private fb:FormBuilder, private backend:BackendServiceService) { }

  ngOnInit(): void {

    this.formbuilder()
  }
  formbuilder(){
    this.form = this.fb.group({
     email:['', [Validators.required, Validators.email]],
})

    }
    get email(){
      return this.form.get('email');
      }
      submitform() {

        if(this.form.valid){
         this.isVerified = true;
         let temp = this.form.value;
         let obj:any={};
         obj.email = temp.email
         let use:any = {}
         this.backend.forgot(obj).subscribe((data)=>{
           use = data
           console.log(use)
        this.form.reset();
        console.log("Sent Email!!", "success",use.message,obj)
         },(err)=>{
          if(err.error.message){
            console.log("Email Not Sent!!","error",err.error.message,obj)
          }
         });
        }

        console.log("-----------")
      }
}
