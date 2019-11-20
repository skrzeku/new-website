import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { LeftNaviComponent } from './left-navi/left-navi.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NavigationComponent, LeftNaviComponent, FilterPipe],
  exports: [NavigationComponent, LeftNaviComponent, FilterPipe]
})
export class CoreModuleModule { }
