import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { TdDataTableSortingOrder, TdDataTableService, ITdDataTableSortChangeEvent } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';
import { UsersService, IUser } from '../services';

@Component({
  selector: 'qs-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  viewProviders: [ UsersService ],
})
export class AppComponent {
}

