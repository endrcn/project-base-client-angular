import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './template/header/header.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { FooterComponent } from './template/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { RoleListComponent } from './roles/role-list/role-list.component';
import { RoleUpdateComponent } from './roles/role-update/role-update.component';
import { RoleAddComponent } from './roles/role-add/role-add.component';
import { Globals } from './globals';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    UserListComponent,
    UserUpdateComponent,
    UserAddComponent,
    RoleListComponent,
    RoleUpdateComponent,
    RoleAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
