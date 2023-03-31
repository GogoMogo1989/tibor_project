import { Component } from '@angular/core';
import { AuthService } from '../services/loginservices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  deleteUserBtn() {
    const confirmDelete = confirm('Biztos töröli a felhasználót?');
    if(confirmDelete){
      this.authService.deleteUser().subscribe(() => {
        console.log('A felhasználó törlése sikeres volt!');
        this.router.navigate(['/login']);
      }, (err: Error) => {
        console.log('Hiba a felhasználó törlésekor:', err);
      });
    }
  }
}