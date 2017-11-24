import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FrameworkConfigService } from './services/framework-config.service'
import { MenuService } from './services/menu.service' 
import {  ScreenService  }  from './services/screen.service' 

//components
import { MenuComponent } from './menus/menu/menu.component'
import { MenuItemComponent } from './menus/menu-item/menu-item.component'
import { PopupMenuComponent } from './menus/popup-menu/popup-menu.component'
import { TitleBarComponent  } from './title-bar/title-bar.component' 
import { TopBarComponent  } from './top-bar/top-bar.component'
import { StatusBarComponent } from './status-bar/status-bar.component'
import {  ContentComponent } from './content/content.component'
import { FrameworkBodyComponent } from './framework-body/framework-body.component'
import { PanelComponent } from './panels/panel/panel.component'
// import {  } from './'

//directives
import { ScreenBelowLarge } from './directives/screen-below-large.directive'
import { ScreenLarge } from './directives/screen-large.directive'

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    FrameworkBodyComponent,
    PanelComponent,
    TitleBarComponent,
    MenuComponent,
    MenuItemComponent,
    PopupMenuComponent,
    TopBarComponent,
    StatusBarComponent,
    ContentComponent,
    ScreenBelowLarge,
    ScreenLarge
  ],

  providers: [
    FrameworkConfigService,
    MenuService,
    ScreenService
  ],
  exports: [
    FrameworkBodyComponent,
    PanelComponent,
    ScreenLarge,
    ScreenBelowLarge
  ]

})
export class FwModule { }
