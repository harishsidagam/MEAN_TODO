import { RegisterComponent } from './../register/register.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  message:any;
  err: boolean=false;
  @ViewChild(RegisterComponent) RegisterComponent:any


  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,



  ) { }

  ngOnInit(): void {
    if (this.data.msg){
      this.message=this.data.msg;
      console.log("--------",this.message)
      this.err=this.data.err

  }



  }
  Close() {
    this.dialogRef.close();
  }




}
