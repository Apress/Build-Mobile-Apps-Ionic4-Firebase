import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { reducers } from './reducers';
import { StoreModule } from '@ngrx/store';
import { SignupComponent } from './signup/signup.component';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [LoginComponent, SignupComponent],
  providers: [AuthService, AuthGuard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule { }
