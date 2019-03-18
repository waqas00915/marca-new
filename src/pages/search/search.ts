import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';

@IonicPage({})
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  searchQuery: string = "";
  WooCommerce: any;
  products: any[] = [];
  page: number = 2;
  temp: any = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private WP: WoocommerceProvider, private zone: NgZone,
    public events: Events) {
    this.events.subscribe('updateScreen', () => {
      this.zone.run(() => {
        // console.log('what?', this.projects);
      });
    });
    console.log(this.navParams.get("searchQuery"));
    this.searchQuery = this.navParams.get("searchQuery");

    this.WooCommerce = WP.init();

    this.WooCommerce.getAsync("products?search=" + this.searchQuery).then((searchData) => {
      console.log('dsaiudjisajdoi', JSON.parse(searchData.body));
      this.products = JSON.parse(searchData.body);
      console.log(this.products.length)
      this.events.publish('updateScreen')

      if (this.products.length === 0) {
        this.temp = true; console.log("jojo")
      }
    }).catch(err => { console.log(err) })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  loadMoreProducts(event) {

    this.WooCommerce.getAsync("products?search=" + this.searchQuery + "&page=" + this.page).then((searchData) => {
      this.products = this.products.concat(JSON.parse(searchData.body).products);

      if (JSON.parse(searchData.body).length < 10) {
        event.enable(false);

        this.toastCtrl.create({
          message: "No more products!",
          duration: 5000
        }).present();

      }

      event.complete();
      this.page++;

    });
  }
  openProductPage(product) {
    this.navCtrl.push('ProductDetails', { "product": product });
  }

}
