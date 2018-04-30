import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerModule } from 'primeng/components/spinner/spinner';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { MenubarModule } from 'primeng/components/menubar/menubar';
import { CarouselModule } from 'primeng/components/carousel/carousel';
// import { TableModule } from 'primeng/components/table/table';
import { SliderModule} from 'primeng/components/slider/slider';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { MultiSelectModule } from 'primeng/components/multiselect/multiselect';
import { StepsModule } from 'primeng/components/steps/steps';
import { ProgressBarModule } from 'primeng/components/progressbar/progressbar';
const modulos = [
  SpinnerModule,
  CalendarModule,
  MenubarModule,
  CarouselModule,
  // TableModule,
  SliderModule,
  DropdownModule,
  MultiSelectModule,
  StepsModule,
  ProgressBarModule
];
@NgModule({
  imports: modulos,
  exports: modulos,
  declarations: []
})
export class ImportsModule { }

