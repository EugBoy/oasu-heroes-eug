import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {SkillFormBuilderService} from "./entities/services/skill-form-builder.service";
import {AppService} from "../../entities/services/app.service";
@Component({
  selector: 'app-form-skill',
  templateUrl: './form-skill.component.html',
  styleUrls: ['./form-skill.component.scss']
})
export class FormSkillComponent {

  public skillNameControl: FormControl = this._skillFormBuilderService.skillControl;

  constructor(
    private readonly _appService: AppService,
    private readonly _skillFormBuilderService: SkillFormBuilderService,
  ) {
  }

  /**
   * Метод добавления нового навыка*
   */
  public addSkill(): void {
    if (this.skillNameControl.valid) {
      this._appService.addSkill(this.skillNameControl.value);
      this.skillNameControl.reset();
    } else {
      alert('Вы допустили ошибку.');
    }
  };
}
