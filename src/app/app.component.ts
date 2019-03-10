import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, ModalController, Events, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from "@ionic-native/onesignal";
import { WoocommerceProvider } from '../providers/woocommerce/woocommerce';
import { Cart } from '../pages/cart/cart';
import { Storage } from '@ionic/storage'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: NavController
  rootPage: any = 'HomePage';
  WooCommerce: any;
  categories: any[];
  loggedIn: boolean;
  user: any;
  constructor(
     public storage: Storage, 
     public modalCtrl: ModalController, 
     private events: Events, 
     private WP: WoocommerceProvider,
     public platform: Platform,
      public statusBar: StatusBar,
       public splashScreen: SplashScreen,
        public oneSignal: OneSignal) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.categories = [];
      this.user = {};
  
      this.WooCommerce = this.WP.init();
  
  
      this.WooCommerce.getAsync("products/categories").then((data) => {
        console.log('testing',JSON.parse(data.body));
  
        let temp: any[] = JSON.parse(data.body);
  
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].parent == 0) {
  
            temp[i].subCategories = [];
  
            if (temp[i].slug == "clothing") {
              temp[i].icon = "shirt";
            }
            if (temp[i].slug == "music") {
              temp[i].icon = "musical-notes";
            }
            if (temp[i].slug == "posters") {
              temp[i].icon = "images";
            }
  
            this.categories.push(temp[i]);
          } 
        }
  
        //Groups Subcategories
  
        for (let i = 0; i < temp.length; i++){
          for (let j = 0; j < this.categories.length; j++){
            //console.log("Checking " + j + " " + i)
            if(this.categories[j].id == temp[i].parent){
              this.categories[j].subCategories.push(temp[i]);
            }
          }
        }
  
  
  
      }, (err) => {
        console.log(err)
      });
  
      this.events.subscribe("updateMenu", () => {
        this.storage.ready().then(() => {
          this.storage.get("userLoginInfo").then((userLoginInfo) => {
  
            if (userLoginInfo != null) {
  
              console.log("User logged in...");
              this.user = userLoginInfo.user;
              console.log(this.user);
              this.loggedIn = true;
            }
            else {
              console.log("No user found.");
              this.user = {};
              this.loggedIn = false;
            }
  
          })
        });
  
  
      })
      // this.oneSignal.startInit('b019dab9-5078-40eb-a958-df477ef9b220', '706507838730');

      // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      // this.oneSignal.handleNotificationReceived().subscribe(() => {
      //   // do something when notification is received
      // });

      // this.oneSignal.handleNotificationOpened().subscribe(() => {
      //   // do something when a notification is opened
      // });

      // this.oneSignal.endInit();


    });
  }
  
  ionViewDidEnter() {

    this.storage.ready().then(() => {
      this.storage.get("userLoginInfo").then((userLoginInfo) => {

        if (userLoginInfo != null) {

          console.log("User logged in...");
          this.user = userLoginInfo.user;
          console.log(this.user);
          this.loggedIn = true;
        }
        else {
          console.log("No user found.");
          this.user = {};
          this.loggedIn = false;
        }

      })
    })


  }

  openCategoryPage(category) {

    this.navCtrl.setRoot('ProductsByCategory', { "category": category });

  }

  openPage(pageName: string) {
    console.log(this.navCtrl);
    
    if (pageName == "signup") {
      this.navCtrl.push('Signup');
    }
    if (pageName == "login") {
      this.navCtrl.push('Login');
    }
    if (pageName == 'logout') {
      this.storage.remove("userLoginInfo").then(() => {
        this.user = {};
        this.loggedIn = false;
      })
    }
    if (pageName == 'cart') {
      let modal = this.modalCtrl.create(Cart);
      modal.present();
    }

  }

}
