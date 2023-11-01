import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {
  DxAccordionModule,
  DxButtonModule,
  DxPopupModule,
  DxTagBoxModule,
  DxTextBoxModule,
  DxValidatorModule,
} from "devextreme-angular";
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {FormHeroComponent} from './components/form-hero/form-hero.component';
import {ShowHeroesComponent} from './components/show-heroes/show-heroes.component';
import {FilterHeroesPipe} from './components/show-heroes/entities/pipes/filter-heroes.pipe';
import {PopupComponent} from "./components/show-heroes/entities/popups/popup/popup.component";
import {FormSkillComponent} from './components/form-skill/form-skill.component';
import {FormComponent} from './entities/components/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    FormHeroComponent,
    ShowHeroesComponent,
    FilterHeroesPipe,
    PopupComponent,
    FormSkillComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    DxButtonModule,
    DxTagBoxModule,
    ReactiveFormsModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxAccordionModule,
    HttpClientModule,
    DxPopupModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
