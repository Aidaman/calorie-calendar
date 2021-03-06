import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {UserDataService} from "../user-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss', '../../../node_modules/bootstrap/dist/css/bootstrap.css']
})
export class StartPageComponent implements OnInit {
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin?: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private udService: UserDataService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
    });
  }

  loginWithGoogle(): void {
    if(!localStorage.getItem('user')){
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    } else{
      this.router.navigate(['/registration'])
    }

  }

  logOut(): void {
    this.socialAuthService.signOut();
  }
}
