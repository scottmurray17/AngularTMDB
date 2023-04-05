import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { services } from './services';
import { components } from './components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { pipes } from './pipes';

@NgModule({
  declarations: [
    AppComponent,
    ...components,
    ...pipes,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [...services],
  bootstrap: [AppComponent]
})
export class AppModule { }
