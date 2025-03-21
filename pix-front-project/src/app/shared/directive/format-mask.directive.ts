

import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[formatMask]"
})
export class FormatMaskDirective {
  @Input("formatMask") formatMask: string;
  private regex: RegExp;
  private specialKeys: Array<string> = [
    "Backspace",
    "Tab",
    "End",
    "Home",
    "-",
    "ArrowLeft",
    "ArrowRight",
    "Del",
    "Delete"
  ];
  constructor(private el: ElementRef) {}
  ngOnChanges() {
    this.regex = this.setBeforeAndAfterNumberLength();
  }

  @HostListener("keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    const position = this.el.nativeElement.selectionStart;
    const next: string = [
      current.slice(0, position),
      event.key == "Decimal" ? "." : event.key,
      current.slice(position)
    ].join("");
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

  setBeforeAndAfterNumberLength(): RegExp {

      return new RegExp(/^[a-zA-Z0-9_.-]*$/g);
    
  }
}
