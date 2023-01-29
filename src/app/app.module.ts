import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Alert } from './lib/alert';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserNotification } from './lib/browserNotification';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { RoleGuardService } from './services/role.guard';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor } from './services/token.interceptor';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    RoleAddComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxDatatableModule,
    FormsModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: "tr",
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    Globals,
    Alert,
    BrowserNotification,
    AuthGuard,
    AuthService,
    RoleGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
