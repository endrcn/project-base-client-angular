import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditlogsComponent } from './auditlogs/auditlogs/auditlogs.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RoleListComponent } from './roles/role-list/role-list.component';
import { RoleGuardService } from './services/role.guard';
import { UserListComponent } from './users/user-list/user-list.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuardService], data: { expectedRoles: ["dashboard_view"] } },
  { path: 'users', component: UserListComponent, canActivate: [RoleGuardService], data: { expectedRoles: ["user_view"] }  },
  { path: 'roles', component: RoleListComponent, canActivate: [RoleGuardService], data: { expectedRoles: ["role_view"] }  },
  { path: 'categories', component: CategoryListComponent, canActivate: [RoleGuardService], data: { expectedRoles: ["category_view"] }  },
  { path: 'activities', component: AuditlogsComponent, canActivate: [RoleGuardService], data: { expectedRoles: ["auditlog_view"] }  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
