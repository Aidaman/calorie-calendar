import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CalendarService} from "../../calendar/calendar.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ICalendarCell} from "../../shared/interfaces/calendar-cell.interface";
import {Store} from "@ngrx/store";
import {addMealAction} from "../../store/calendar/calendar.action";
import {notNegativeValidator} from "../not-negative.validator";

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.scss', '../user-profile/user-profile.component.scss', '../custom-control/custom-control.component.scss']
})
export class AddMealComponent implements OnInit {
  private date: Date = this.activeRoute.snapshot.params['date'];
  private time: string = this.activeRoute.snapshot.params['time'];
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
              private store: Store) { }

  ngOnInit(): void {
    this.form.get('time')?.setValue(this.time);
  }

  public saveMeal(): void {
    if (this.form.valid){
      const meal: ICalendarCell = {
        carbohydrates: Math.abs(this.form.get('carbohydrates')?.value),
        date: this.date,
        fats: Math.abs(this.form.get('fats')?.value),
        id: Math.floor(Math.random() * (1000000 - 1) + 1),
        kcal: Math.abs(this.form.get('kcal')?.value),
        proteins: Math.abs(this.form.get('protein')?.value),
        time: this.form.get('time')?.value.substr(0, 2)+':00',
        title: this.form.get('title')?.value,
        image: this.form.get('image')?.value
      }
      // this.cService.mealsArr.push(newCell);
      // this.cService.addNewMeal(meal);
      this.store.dispatch(addMealAction({meal}));
      this.form.reset();


    }
  }

  imageChanged(e: any) {
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.onloadend = () => {
      this.img = reader.result as string;
      this.form.get('image')?.setValue(reader.result as string);
    };

    reader.readAsDataURL(file);
  }
}
