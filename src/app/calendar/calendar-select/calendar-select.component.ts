import {Component, HostListener, Input} from '@angular/core';
import {SelectedMonthService} from "./selected-month.service";
import {CalendarService} from "../calendar.service";
import {Months} from "../../shared/consts/months";

@Component({
  selector: 'app-calendar-select',
  templateUrl: './calendar-select.component.html',
  styleUrls: ['./calendar-select.component.scss']
})
export class CalendarSelectComponent {
  @Input() data: string[] = [];

  public selectIsOpen: boolean = false;
  public selectedOption = this.selection.select;

  constructor(private selection: SelectedMonthService,
              private cService: CalendarService,) { }

  changeSelected(month: string): void {
    this.selection.select.next(month);
    this.selectIsOpen = false;

    this.cService.weekGenerate(this.getFirstMondayInMonth());
  }

  private getFirstMondayInMonth() {
    const dateOnMonth = new Date(new Date().getFullYear(), Months.indexOf(this.selection.select.value));
    return new Date(dateOnMonth.getFullYear(), dateOnMonth.getMonth(),
      (dateOnMonth.getDate() - dateOnMonth.getDate() + 1) + (8 - dateOnMonth.getDay()));
  }

  @HostListener("document:click", ["$event"])
  docEvent(e: any){
    let parentel = e.target.parentElement;
    while (parentel && parentel.id !== 'select-handler'){
      parentel = parentel.parentElement
    }
    if (!parentel && this.selectIsOpen){
      this.selectIsOpen = false;
    }
  }
}
