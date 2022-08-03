import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPageComponent } from './start-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {StoreModule} from "@ngrx/store";
import {GoogleLoginProvider, SocialAuthServiceConfig} from "angularx-social-login";

describe('StartPageComponent', () => {
  let component: StartPageComponent;
  let fixture: ComponentFixture<StartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartPageComponent ],
      imports: [
        ReactiveFormsModule, RouterTestingModule, StoreModule.forRoot({}),
      ],
      providers: [
        {
          provide: 'SocialAuthServiceConfig',
          useValue: {
            autoLogin: false,
            providers: [
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider('185231214533-f7bcruk4pkm5mnr5rl8hv3f2oflmlqb7.apps.googleusercontent.com'),
              },
            ],
          } as SocialAuthServiceConfig,
        },
      ],
    });
    fixture = TestBed.createComponent(StartPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Calorie Calendar'`, () => {
    expect(component.title).toEqual('Calorie Calendar');
  });
});
