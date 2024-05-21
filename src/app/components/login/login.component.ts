import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from '../../services/generic.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Default email and password for demonstration purposes
  email: string = 'celynflacker@gmail.com';
  password: string = 'Passw0rd?';
  errorMessage: string = ''; // Variable to store error message

  constructor(private router: Router, private genericService: GenericService<LoginComponent>) { }

  // Method to handle login
  login() {
    // Check if email and password match the default values
    if (this.email === 'celynflacker@gmail.com' && this.password === 'Passw0rd?') {
      // Navigate to admin page if login is successful
      this.router.navigate(['/admin']);
    } else {
      // Display error message if email or password is incorrect
      if (this.email !== 'celynflacker@gmail.com') {
        this.errorMessage = 'Your email is wrong';
      } else {
        this.errorMessage = 'Your password is wrong';
      }
    }
  }
}
