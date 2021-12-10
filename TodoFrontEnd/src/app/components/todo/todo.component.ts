import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoheaders=[
    "Sl.NO",
    "ToDo List"
  ]
  inputFieldValue:any;
  tableData: any[] = [];


index:any;
  del: any;
userDetails:any

  constructor(public router:Router) { }

  ngOnInit(): void {
    this.userDetails = localStorage.getItem('username')
  }

  add(){

      this.tableData.push(this.inputFieldValue);
      return

    }
  delete(i:any){
    this.del=this.tableData
    this.del.splice(i,1)
   }


  edit(){

  }
  profile(){

  }
  logout(){
    this.router.navigate(["/login"])
    localStorage.clear();
  }


}
