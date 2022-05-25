import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {UserDataService} from "../user-data.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {userLoginAction} from "../store/user/user.action";
import {IUser} from "../shared/interfaces/user";

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
  ) {
  }

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

  async loginWithGoogle(): Promise<void> {
    console.log('login');
    const users = this.udService.loadUsers();
    try {
      const authUser = await this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
      this.udService.userId = authUser.id;
      console.log(this.udService.userId)
      const user: IUser = {
        id: authUser.id,
        gender: '' ,
        heightCm: 0,
        weightkg: 0,
        minCal: 0,
        maxCal: 0,
        fats: 0,
        proteins: 0,
        carbohydrates: 0,
      };

      if (!users.length) {
        this.udService.saveUser(user, authUser.id);
      } else {
        const foundUser = users.find(user => user.id === authUser.id);
        this.udService.saveUser(foundUser ?? user, this.udService.userId);
      }
      this.store.dispatch(userLoginAction({id: authUser.id}));
      this.router.navigate(['/profile']);
    } catch (e) {
      console.error(e);
      // Any error handling scenario
    }
  }

  logOut(): void {
    console.log('logout');
    this.udService.userId = '';
    this.socialAuthService.signOut();
  }
}
