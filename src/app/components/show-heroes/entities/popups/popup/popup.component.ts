import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IHero} from "../../../../../entities/interfaces/hero.interface";
import {LItem} from "../../../../../entities/labels/item.label";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {

  @Input({ required: true })
  public currentHero: IHero = <IHero>{};

  @Input({ required: true })
  public isPopupVisible: boolean = false;

  @Output()
  public isPopupVisibleChange: EventEmitter<false> = new EventEmitter<false>();

  public LItem: typeof LItem = LItem;

  constructor () {
  }

  public close(): void {
    this.isPopupVisibleChange.emit(false);
  }
}
