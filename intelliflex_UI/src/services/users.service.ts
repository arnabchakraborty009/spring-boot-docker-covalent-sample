import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { HttpInterceptorService, RESTService } from '@covalent/http';
import { MOCK_API } from '../config/api.config';
import { Prod } from '../app/dashboard/dashboard.model';
export interface IUser {
  displayName: string;
  id: string;
  email: string;
  created: Date;
  lastAccess: Date;
  siteAdmin: number;
  
}

@Injectable()
export class UsersService  {
    public baseUrl: string;
    public handleError: any;
    public extractData: any;
    public delete: any;
    public query: any;
    public get: any;;
    public create: any;
    public update: any;
    public options: RequestOptions;
  constructor(private _http: HttpInterceptorService) {
    this.handleError = this.getHandleErrorFunction();
    this.baseUrl = MOCK_API;
  this.extractData = this.getExtractDataFunction();
  }
 public getHandleErrorFunction() {
      let _self = this;
      return function(error: any){
        if (error.status === 500) {
            return Observable.throw(new Error(error.statusText = "Server Error. Please try again."));
        }
        else if (error.status === 400) {
            return Observable.throw(new Error(error.statusText = "Bad request. Please try again."));
        }
        else if (error.status === 401 && this.logout != "true") {
            sessionStorage.clear();
            //_self._router.navigate(['/timeout']);
        }
        else if (error.status === 401 && this.logout === "true") {
            sessionStorage.clear();
            //_self._router.navigate(['/']);
        }
        else if (error.status === 403) {
            return Observable.throw(new Error(error.statusText = "You are not authorized to perform this action."));
        }
        else if (error.status === 404) {
            return Observable.throw(new Error(error.statusText = "Not found."));
        }
        else if (error.status === 409) {
            return Observable.throw(new Error(error.statusText = "Conflict occured. Cannot perform this action."));
        }
        else {
            return Observable.throw(new Error(error.statusText));
        }
      }
    }
    public doGet(url: String){
    console.log('In doGet - '+this.baseUrl + url);
        return this._http.get(this.baseUrl + url)
            .map(this.extractData);
    }
    public doDelete(url: String){
    let bodyString = "";
    console.log('In doDelete - '+this.baseUrl + url);
        return this._http.delete(this.baseUrl + url,this.options);
    }
    public doPost(url: String, prod: Prod){
        this.setAuthenticationToken();
        let bodyString = JSON.stringify(prod);
        console.log('Body String = '+bodyString);
        console.log('URL = '+this.baseUrl + url);
        return this._http.post(this.baseUrl + url, bodyString, this.options)
            .catch(this.handleError);
    }
    public getExtractDataFunction() {

        return function(res: Response) {
        console.log('Before extract = '+res.text().toString());
            if(res.status == 204){
                return res.text().toString();
            } else {
                return res.json();
            }
        }
    }
    extractText (res: Response) {
        let body = res.text();
        return body || res.toString();
    }

     public setAuthenticationToken(){
            let headers = new Headers({ 'Content-Type': 'application/json' });
            this.options = new RequestOptions({ headers: headers });
        
    }

}
