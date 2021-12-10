import { NgModule } from "@angular/core";
import { MatCardModule} from "@angular/material/card";
import{MatFormFieldModule} from "@angular/material/form-field";
import{MatInputModule} from "@angular/material/input";
import{MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from '@angular/material/tabs';
import{MatToolbarModule}from "@angular/material/toolbar";
import{MatSidenavModule} from "@angular/material/sidenav";
import{MatIconModule} from "@angular/material/icon";
import {MatListModule} from '@angular/material/list';
import{MatGridList, MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import {MatDialogModule} from '@angular/material/dialog';




@NgModule({

    exports:[MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatTabsModule,MatToolbarModule
             ,MatSidenavModule,MatIconModule,MatListModule,MatGridListModule,MatSelectModule,MatTooltipModule
             ,MatTableModule,MatCheckboxModule,MatSlideToggleModule,MatRadioModule,MatDatepickerModule,MatNativeDateModule,MatDialogModule ]
})




export class MaterialModule{}
