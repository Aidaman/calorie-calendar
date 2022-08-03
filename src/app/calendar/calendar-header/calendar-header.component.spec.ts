import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { CalendarHeaderComponent } from './calendar-header.component';
import {Store, StoreModule} from "@ngrx/store";
import {userSelector} from "../../store/user/selectors";
import {lastValueFrom} from "rxjs";

describe('CalendarHeaderComponent', () => {
  let component: CalendarHeaderComponent;
  let fixture: ComponentFixture<CalendarHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarHeaderComponent ],
      imports: [StoreModule.forRoot({})],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

/*
  it('should get user', fakeAsync(() => {
    const store = fixture.debugElement.injector.get(Store);
    const testee$ = store.select(userSelector);
    fixture.detectChanges();
    lastValueFrom(testee$).then((res)=>{
      //Here i should to do something, but, actually, it doesn't work
    })
    tick();
    fixture.detectChanges();

    expect(component).toBeTruthy();
  }));

 */
});
