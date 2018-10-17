import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule, NgZone, PLATFORM_ID } from '@angular/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';

import { MyAppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ServicesModule } from './services/services.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { CustomRouterStateSerializer, reducers } from './reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { ItemsEffects } from './effects/items';
import { AuthModule } from './auth/auth.module';
import { HACKER_NEWS_DB } from './hackernews-db';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FavoritesModule } from './favorites/favorites.module';
import { CustomErrorHandler } from './error-handler';

@NgModule({
  declarations: [
    MyAppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.app_db),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    IonicModule.forRoot(),
    ServicesModule,
    AuthModule,
    FavoritesModule,
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    StoreDevtoolsModule.instrument({
      name: 'NgRx HNC DevTools',
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([ItemsEffects]),
  ],
  bootstrap: [MyAppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer},
    {
      provide: HACKER_NEWS_DB,
      useFactory: (platformId: Object, zone: NgZone) =>
        new AngularFireDatabase(environment.hackernews_db, 'HackerNews', null, platformId, zone),
      deps: [PLATFORM_ID, NgZone]
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: ErrorHandler, useClass: CustomErrorHandler },
    StatusBar,
    SplashScreen,
    InAppBrowser,
    SocialSharing,
  ]
})
export class AppModule {
}
