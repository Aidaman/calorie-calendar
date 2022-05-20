import {Component, ElementRef, HostListener, Input} from '@angular/core';
import {SelectedMonthService} from "./selected-month.service";
import {CalendarService} from "../calendar.service";
import {generateDaysArr} from "../../shared/consts/generate-week";
import {Months} from "../../shared/consts/months";
import {weekChangeAction} from "../../store/calendar/calendar.action";
import {Store} from "@ngrx/store";

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
              private cService: CalendarService,
              private store: Store,
              private eleRef: ElementRef) { }

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
  docEvent($e: MouseEvent){
    // @ts-ignore
    const paths: Array<HTMLElement> = $e["path"];
    if (!paths.some(p => p === this.eleRef.nativeElement)) {
      this.selectIsOpen = false;
    }
  }
}
