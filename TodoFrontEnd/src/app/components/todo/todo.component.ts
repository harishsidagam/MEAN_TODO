import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
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

  constructor(public router:Router) { }

  ngOnInit(): void {
  }
  add(){

      this.tableData.push(this.inputFieldValue);
      return

    }
  delete(index:any){
    this.del=this.tableData
    this.del.removeAt(index)
   }


  edit(){

  }
  logout(){
    this.router.navigate(["/login"])
    localStorage.clear();
  }

}
