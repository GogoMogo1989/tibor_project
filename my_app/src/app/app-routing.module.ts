import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/authguard/authguard';
import { DocumentumUploadComponent } from './documentum-upload/documentum-upload.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ViewDocumentsComponent } from './view-documents/view-documents.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { AdminMainComponent } from './adminPages/admin-main/admin-main.component';
import { AdminDocumentViewComponent } from './adminPages/admin-document-view/admin-document-view.component';
import {AdminLoginViewComponent} from './adminPages/admin-login-view/admin-login-view.component';
import { DocumentumUploadChoiceComponent } from './documentum-upload-choice/documentum-upload-choice.component';
import { DocumentumUploadCameraComponent } from './documentum-upload-camera/documentum-upload-camera.component';

const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'documentum-upload', component: DocumentumUploadComponent, canActivate: [AuthGuard]},
    {path:'view-documents', component: ViewDocumentsComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'delete-user', component: DeleteUserComponent, canActivate: [AuthGuard]},
    {
      path: 'admin-main', 
      component: AdminMainComponent,
      canActivate: [AuthGuard],
      children: [  
        {path: 'view-login-admin', component: AdminLoginViewComponent, canActivate: [AuthGuard]},
        {path: 'view-documents-admin', component: AdminDocumentViewComponent, canActivate: [AuthGuard]},
        {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
      ]
    },
    {path: 'documentum-upload-choice', component: DocumentumUploadChoiceComponent, canActivate: [AuthGuard]},
    {path: 'documentum-upload-camera', component: DocumentumUploadCameraComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
