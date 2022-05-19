import {Component, ElementRef, HostListener, Input} from '@angular/core';
import {SelectedMonthService} from "./selected-month.service";

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
              private eleRef: ElementRef) { }

  changeSelected(month: string): void {
    this.selection.select.next(month);
    this.selectIsOpen = false;
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
