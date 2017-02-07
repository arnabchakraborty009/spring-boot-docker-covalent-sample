import { Component, AfterViewInit } from '@angular/core';

import { Title }     from '@angular/platform-browser';

import { TdLoadingService } from '@covalent/core';

import { UsersService} from '../../services';
import { Response, Http, Headers } from '@angular/http';

import { CovalentDataTableModule } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';
import { ITdDataTableColumn } from '@covalent/core';
import { TdDialogService } from '@covalent/core';
import { MdDialog } from '@angular/material';
import { Prod } from './dashboard.model';



@Component({
  selector: 'qs-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  viewProviders: [ UsersService,TdDialogService],
})
export class DashboardComponent {
  id: string;
  title: string;
  icon: string;
  enabled: boolean;
  user: string;
  feature: IFeature;
  action: string;
constructor(private _dialogService: TdDialogService,
private  _UsersService: UsersService) {

}

  private basicData: any[] = this.onLoadGet();
  private columns: ITdDataTableColumn[] = [
    { name: 'id', label: 'ID', tooltip: 'Stock Keeping Unit' },
    { name: 'serviceName', label: 'Service Name' },
    { name: 'serviceStatus', label: 'Service Status'},
  ];



  openConfirm(row: any, name: string): void {
    this._dialogService.openConfirm({
      message: 'Are you sure you want to delete the record ?',
      disableClose: true , // defaults to false
      //viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Confirm', //OPTIONAL, hides if not provided
      cancelButton: 'Changed Mind !', //OPTIONAL, defaults to 'CANCEL'
      acceptButton: 'Confirmed ', //OPTIONAL, defaults to 'ACCEPT'
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        console.log("Accepted");
        this.delete('/delete/?id='+row['id']);
        this.onLoadGet();
        //row = undefined;
      } else {
        console.log("Denied");
      }
    });
  }
  openPrompt(row: any, name: string): void {
    this._dialogService.openPrompt({
      message: '',
      disableClose: true , // defaults to false
      //viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Update Service Status', //OPTIONAL, hides if not provided
      value: row['serviceStatus'], //OPTIONAL
      cancelButton: 'Cancel', //OPTIONAL, defaults to 'CANCEL'
      acceptButton: 'Update', //OPTIONAL, defaults to 'ACCEPT'
    }).afterClosed().subscribe((newValue: string) => {
      if (newValue) {
      var prod = {"id":row['id'] , "serviceName":row['serviceName'],"serviceStatus":newValue};
      this.post("/update", prod);
      row['serviceStatus'] = newValue;
      } else {
        console.log('Not updated');
      }
    });
  }

 
 onLoadGet(): any {
 this._UsersService.doGet('/getAll').subscribe((customers: any) => {
       console.log("DATA = ="+ customers);
      this.basicData = customers;
 });
}
delete(actionUrl: String): any {
 this._UsersService.doDelete(actionUrl).subscribe((customers: any) => {

 });
}

 post(actionUrl:String, prod:Prod){
   this._UsersService.doPost(actionUrl,prod).subscribe((customers: any) => {

 });
 }

save(): void {
    let enabled: number = (this.enabled ? 1 : 0);
    let now: Date = new Date();
    this.feature = {
      title: this.title,
      user: this.user,
      enabled: enabled,
      icon: this.icon,
      id: this.id || this.title.replace(/\s+/g, '.'),
      created: now,
      modified: now,
    };
    
      console.log('Saving ...');
      var prod = { "id": '', "serviceName" : this.title, "serviceStatus": this.user};
      this.post("/update", prod);
    
  }

}
export interface IFeature {
  title: string;
  id: string;
  user: string;
  modified: Date;
  created: Date;
  icon: string;
  enabled: number;
}