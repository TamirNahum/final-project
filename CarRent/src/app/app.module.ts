import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CarListComponentComponent } from './car-list-component/car-list-component.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { FooterComponent } from './footer/footer.component';
import { SignUpComponentComponent } from './sign-up-component/sign-up-component.component';
import { LogInComponentComponent } from './log-in-component/log-in-component.component';
import { MyOrdersComponentComponent } from './my-orders-component/my-orders-component.component';
import { CarService } from './shared/services/car-info.service';
import { CarTypeService } from './shared/services/car-type-info.service';
import { CheckPriceComponentComponent } from './check-price-component/check-price-component.component';
import { CarOrderComponentComponent } from './car-order-component/car-order-component.component';
import { UserService } from './shared/services/user-info.service';
import { AlertService } from './shared/services/alert.service';
import { AlertComponent } from './alert/alert.component';
import { OrderService } from './shared/services/order.service';
import { ReturnCarComponentComponent } from './return-car-component/return-car-component.component';
import { ManageOrdersComponentComponent } from './manage-orders-component/manage-orders-component.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { AddOrderComponentComponent } from './add-order-component/add-order-component.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ManageUsersComponentComponent } from './manage-users-component/manage-users-component.component';
import { ManageCarsComponentComponent } from './manage-cars-component/manage-cars-component.component';
import { EditCarComponentComponent } from './edit-car-component/edit-car-component.component';
import { AddCarComponentComponent } from './add-car-component/add-car-component.component';
import { BranchService } from './shared/services/branch.service';
import { EditCarTypeComponent } from './edit-car-type/edit-car-type.component';
import { AddCarTypeComponent } from './add-car-type/add-car-type.component';
import { ManageCarTypesComponent } from './manage-car-types/manage-car-types.component';
import { UploadImageService } from './shared/services/upload-image.service';


const appRoutes: Routes = [
  { path: 'Home', component: HomeComponentComponent },
  { path: 'Car-List', component: CarListComponentComponent },
  { path: 'Sign-Up', component: SignUpComponentComponent },
  { path: 'Log-In', component: LogInComponentComponent },
  { path: 'My-Orders', component: MyOrdersComponentComponent },
  { path: 'Car-Order', component: CarOrderComponentComponent },
  { path: 'Check-Price', component: CheckPriceComponentComponent },
  { path: 'Return-Car', component: ReturnCarComponentComponent },
  { path: 'Manage-Orders', component: ManageOrdersComponentComponent },
  { path: 'Edit-Order', component: EditOrderComponent },
  { path: 'Add-Order', component: AddOrderComponentComponent },
  { path: 'Manage-Users', component: ManageUsersComponentComponent },
  { path: 'Edit-User', component: EditUserComponent },
  { path: 'Add-User', component: AddUserComponent },
  { path: 'Manage-Cars', component: ManageCarsComponentComponent },
  { path: 'Edit-Car', component: EditCarComponentComponent },
  { path: 'Add-Car', component: AddCarComponentComponent },
  { path: 'Manage-Car-Types', component: ManageCarTypesComponent },
  { path: 'Add-Car-Type', component: AddCarTypeComponent },
  { path: 'Edit-Car-Type', component: EditCarTypeComponent },
  { path: 'Add-CarType', component: AddCarTypeComponent },



  
  
  
  {
    path: '',
    redirectTo: '/Home',
    pathMatch: 'full'
},
{ path: '**', component: HomeComponentComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CarListComponentComponent,
    HomeComponentComponent,
    FooterComponent,
    SignUpComponentComponent,
    LogInComponentComponent,
    MyOrdersComponentComponent,
    CheckPriceComponentComponent,
    CarOrderComponentComponent,
    AlertComponent,
    ReturnCarComponentComponent,
    ManageOrdersComponentComponent,
    EditOrderComponent,
    AddOrderComponentComponent,
    AddUserComponent,
    EditUserComponent,
    ManageUsersComponentComponent,
    ManageCarsComponentComponent,
    EditCarComponentComponent,
    AddCarComponentComponent,
    EditCarTypeComponent,
    AddCarTypeComponent,
    ManageCarTypesComponent,

  ],
  imports: [
    BrowserModule,
     FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [
    CarService,
    CarTypeService,
    UserService,
    AlertService,
    OrderService,
    BranchService,
    UploadImageService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
