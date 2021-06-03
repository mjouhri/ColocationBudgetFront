import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserColocations } from '../models/user-colocations.model';
import { User } from '../models/user.model';
import { UserColocationsService } from '../services/user-colocations.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
    private router: Router, private userservice: UserService, private userColocationsService: UserColocationsService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {

    const mail = this.signinForm.get('email').value;

    this.userservice.getUserByMail(mail).subscribe(
      (user: User) => {
        if(!!user) {
          this.userColocationsService.getNbColocationsByIdUser(user.id).subscribe(
            (nb: number) => {
              if (nb === 1) {
                this.userColocationsService.getUserColocationsById(user.id).subscribe(
                  (userColocations: UserColocations) => {
                    this.router.navigate(['/colocation/', user.id, userColocations.colocations[0].id]);
                  }
                );
              }
              else {
                this.router.navigate(['/colocations', user.id]);
              }
            }
          );
        }
        else{
          this.errorMessage = "Email ou Mot de passe incorrect";
        }
      },
      (error) => {
        this.errorMessage = "Email ou Mot de passe incorrect";
      }
    );
    
  }

}
