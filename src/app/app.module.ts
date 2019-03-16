import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';

import { MyApp } from './app.component';
// import { HomePage } from '../pages/home/home';
// import { Menu } from '../pages/menu/menu';
// import {ProductsByCategory} from '../pages/products-by-category/products-by-category';
// import { ProductDetails } from '../pages/product-details/product-details';
import { Cart } from '../pages/cart/cart';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { Signup } from '../pages/signup/signup';
// import { Login } from '../pages/login/login';
// import { Checkout } from '../pages/checkout/checkout';
import { HttpModule } from '@angular/http';
import { PayPal } from '@ionic-native/paypal';
// import { SearchPage } from '../pages/search/search';
import { IonicStorageModule } from '@ionic/storage';
<<<<<<< HEAD
import { WoocommerceProvider } from '../providers/woocommerce/woocommerce';

@NgModule({
    declarations: [
        MyApp,
        Cart
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        Cart
    ],
    providers: [
        StatusBar,
        SplashScreen,
        PayPal,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        WoocommerceProvider
    ]
})
export class AppModule { }
=======
import { OneSignal } from "@ionic-native/onesignal";
import { WoocommerceProvider } from '../providers/woocommerce/woocommerce';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [
    MyApp,
    Cart
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Cart
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PayPal,
    OneSignal,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WoocommerceProvider,
    AngularFireAuthModule,
    AngularFireAuth,
  ]
})
export class AppModule {}
>>>>>>> b9e6612a218c9c2511f72867d12760f3f38fb359
