import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/authguard/authguard';
import { DocumentumUploadComponent } from './documentum-upload/documentum-upload.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ViewDocumentsComponent } from './view-documents/view-documents.component';

const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'documentum-upload', component: DocumentumUploadComponent, canActivate: [AuthGuard]},
    {path:'view-documents', component: ViewDocumentsComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
