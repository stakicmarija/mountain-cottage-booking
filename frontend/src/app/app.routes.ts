import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component';
import { PasswordComponent } from './password/password.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { HouseComponent } from './house/house.component';
import { Reserve2Component } from './reserve2/reserve2.component';
import { Reserve1Component } from './reserve1/reserve1.component';
import { ReservationsTouristComponent } from './reservations-tourist/reservations-tourist.component';
import { ReservationsOwnerComponent } from './reservations-owner/reservations-owner.component';
import { MyHousesComponent } from './my-houses/my-houses.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { touristGuard } from './guards/tourist.guard';
import { ownerGuard } from './guards/owner.guard';
import { adminGuard } from './guards/admin.guard';
import { touristOwnerGuard } from './guards/tourist-owner.guard';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'password/:username', component:PasswordComponent},
    {path:'profile/:username', component:ProfileComponent, canActivate: [touristOwnerGuard]},
    {path:'house/:id', component:HouseComponent, canActivate: [touristGuard]},
    {path:'reserve1/:id', component:Reserve1Component, canActivate: [touristGuard]},
    {path:'reserve2', component:Reserve2Component, canActivate: [touristGuard]},
    {path:'reservations-tourist', component:ReservationsTouristComponent, canActivate: [touristGuard]},
    {path:'reservations-owner', component:ReservationsOwnerComponent, canActivate: [ownerGuard]},
    {path:'my-houses/:username', component:MyHousesComponent, canActivate: [ownerGuard]},
    {path:'edit/:id', component:EditComponent, canActivate: [ownerGuard]},
    {path:'add', component:AddComponent, canActivate: [ownerGuard]},
    {path:'statistics', component:StatisticsComponent, canActivate: [ownerGuard]},
    {path:'admin', component:AdminComponent, canActivate: [adminGuard]},
    {path:'admin-edit/:username', component:AdminEditComponent, canActivate: [adminGuard]},
    {path:'admin-login', component:AdminLoginComponent},
];
