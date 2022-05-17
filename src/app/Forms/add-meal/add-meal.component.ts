import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CalendarService} from "../../calendar/calendar.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ICalendarCell} from "../../shared/interfaces/calendar-cell.interface";
import {Store} from "@ngrx/store";
import {addMealAction} from "../../store/calendar/calendar.action";

//FileReader

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.scss', '../registration/registration.component.scss', '../custom-control/custom-control.component.scss']
})
export class AddMealComponent implements OnInit {
  private date: Date = this.activeRoute.snapshot.params['date'];
  private time: string = this.activeRoute.snapshot.params['time'];
  public img: string = '';

  // public src = this.imgInput.nativeElement.src;
  public signupForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    kcal: new FormControl(null, [Validators.required]),
    time: new FormControl(null, [Validators.required]),
    fats: new FormControl(null, [Validators.required]),
    protein: new FormControl(null, [Validators.required]),
    carbohydrates: new FormControl(null, [Validators.required]),
    image: new FormControl(null),
  });

  constructor(private activeRoute: ActivatedRoute,
              private cService: CalendarService,
              private store: Store) { }

  ngOnInit(): void {
    this.signupForm.get('time')?.setValue(this.time);
  }

  public saveMeal(): void {
    if (this.signupForm.valid){
      const meal: ICalendarCell = {
        carbohydrates: Math.abs(this.signupForm.get('carbohydrates')?.value),
        date: this.date,
        fats: Math.abs(this.signupForm.get('fats')?.value),
        id: this.cService.mealsArr.length+1,
        kcal: Math.abs(this.signupForm.get('kcal')?.value),
        proteins: Math.abs(this.signupForm.get('protein')?.value),
        time: this.signupForm.get('time')?.value.substr(0, 2)+':00',
        title: this.signupForm.get('title')?.value,
        image: this.signupForm.get('image')?.value
      }
      // this.cService.mealsArr.push(newCell);
      // this.cService.addNewMeal(meal);
      this.store.dispatch(addMealAction({meal}));
      this.signupForm.reset();


    }
  }

  imageChanged(e: any) {
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.onloadend = () => {
      this.img = reader.result as string;
      this.signupForm.get('image')?.setValue(reader.result as string);
    };

    reader.readAsDataURL(file);
  }
}
