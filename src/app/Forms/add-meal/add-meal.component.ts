import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CalendarService} from "../../calendar/calendar.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ICalendarCell} from "../../shared/interfaces/calendar-cell.interface";
import {Store} from "@ngrx/store";
import {addMealAction, removeMealAction} from "../../store/calendar/calendar.action";
import {notNegativeValidator} from "../not-negative.validator";
import  * as uuid  from 'uuid';
import {Observable, Subscription} from "rxjs";
import {mealSelector} from "../../store/calendar/selectors";

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.scss', '../user-profile/user-profile.component.scss', '../custom-control/custom-control.component.scss']
})
export class AddMealComponent implements OnInit, OnDestroy {
  private date: Date = this.activeRoute.snapshot.params['date'];
  private time: string = this.activeRoute.snapshot.params['time'];
  private mealSubscription!: Subscription;
  private isEditing: boolean = false;
  private mealId!: string;

  public meal$: Observable<ICalendarCell | undefined> = this.store.select(mealSelector(this.date, this.time));
  public img: string = '';

  // public src = this.imgInput.nativeElement.src;
  public form: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    kcal: new FormControl(null, [Validators.required, notNegativeValidator]),
    time: new FormControl(null, [Validators.required, notNegativeValidator]),
    fats: new FormControl(null, [Validators.required, notNegativeValidator]),
    protein: new FormControl(null, [Validators.required, notNegativeValidator]),
    carbohydrates: new FormControl(null, [Validators.required, notNegativeValidator]),
    image: new FormControl(null),
  });

  constructor(private activeRoute: ActivatedRoute,
              private cService: CalendarService,
              private router: Router,
              private store: Store) { }

  ngOnInit(): void {
    this.form.get('time')?.setValue(this.time);
    this.mealSubscription = this.meal$.subscribe((meal)=>{
      if (meal){
        this.isEditing = true;
        this.mealId = meal.id;
        this.form.get('title')?.setValue(meal.title);
        this.form.get('kcal')?.setValue(meal.kcal);
        this.form.get('time')?.setValue(meal.time);
        this.form.get('fats')?.setValue(meal.fats);
        this.form.get('protein')?.setValue(meal.proteins);
        this.form.get('carbohydrates')?.setValue(meal.carbohydrates);
      }
    });
  }
  ngOnDestroy(): void {
    this.mealSubscription.unsubscribe();
  }

  public saveMeal(): void {
    if (this.form.valid){
      if(this.isEditing){
        this.store.dispatch(removeMealAction({id: this.mealId}))
      }
      const meal: ICalendarCell = {
        carbohydrates: Math.abs(this.form.get('carbohydrates')?.value),
        date: this.date,
        fats: Math.abs(this.form.get('fats')?.value),
        id: uuid.v4(),
        kcal: Math.abs(this.form.get('kcal')?.value),
        proteins: Math.abs(this.form.get('protein')?.value),
        time: this.form.get('time')?.value.slice(0, 2)+':00',
        title: this.form.get('title')?.value,
        image: this.form.get('image')?.value
      };
      this.store.dispatch(addMealAction({meal}));
      this.form.reset();
      this.router.navigate(['/calendar']);

    }
  }

  public imageChanged(e: any) {
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.onloadend = () => {
      this.img = reader.result as string;
      this.form.get('image')?.setValue(reader.result as string);
    };

    reader.readAsDataURL(file);
  }
}
