import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { LeftNaviComponent } from './left-navi/left-navi.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NavigationComponent, LeftNaviComponent],
  exports: [NavigationComponent, LeftNaviComponent]
})
export class CoreModuleModule { }
