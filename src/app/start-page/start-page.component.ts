import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {UserDataService} from "../user-data.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {userLoginAction} from "../store/user/user.action";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin?: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private udService: UserDataService,
    private router: Router,
    private store: Store,
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
    });
  }

  loginWithGoogle(): void {
    this.store.dispatch(userLoginAction());
    if(!localStorage.getItem('user')){
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    } else{
      this.router.navigate(['/profile'])
    }

  }

  logOut(): void {
    this.socialAuthService.signOut();
  }
}
