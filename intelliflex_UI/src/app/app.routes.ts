import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  /*{path: 'login', component: LoginComponent},*/
  {path: '', component: MainComponent, children: [{
      component: DashboardComponent, path: '',
    },
  ]}, 
];

export const appRoutingProviders: any[] = [

];

export const appRoutes: any = RouterModule.forRoot(routes, { useHash: true });
