import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, Slides, ToastController, Events } from 'ionic-angular';
// import { ProductDetails } from '../product-details/product-details';

import * as WC from 'woocommerce-api';
// import { SearchPage } from "../search/search";
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';

@IonicPage({})
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    WooCommerce: any;
    products: any[];
    moreProducts: any[];
    page: number;
    searchQuery: string = "";
    newitems: any[] = [];
    ads: any[] = [];
    @ViewChild('productSlides') productSlides: Slides;

    constructor(public navCtrl: NavController, public toastCtrl: ToastController, private WP: WoocommerceProvider, private zone: NgZone,
        public events: Events) {
        this.events.subscribe('updateScreen', () => {
            this.zone.run(() => {
                // console.log('what?', this.projects);
            });
        });
        this.page = 2;

        this.WooCommerce = WP.init();

        this.loadMoreProducts(null);
        console.log('loading produts');
        this.WooCommerce.getAsync("products").then((data) => {
            // console.log('hoem log', JSON.parse(data.body));
            this.products = JSON.parse(data.body).products;
        }, (err) => {
            console.log(err)
        })

        this.WooCommerce.getAsync('products?category=22').then(data => {
            this.ads = JSON.parse(data.body);
            this.events.publish('updateScreen')
            // console.log(this.ads);
        });

        this.WooCommerce.getAsync('products?featured=1').then(data => {
            // console.log(
            this.newitems = JSON.parse(data.body)
            // );
            this.events.publish('updateScreen')
            // console.log(this.ads);
        });
    }

    // ionViewDidLoad(){
    //   setInterval(()=> {

    //     if(this.productSlides.getActiveIndex() == this.productSlides.length() -1)
    //       this.productSlides.slideTo(0);

    //     this.productSlides.slideNext();
    //   }, 3000)
    // }

    loadMoreProducts(event) {
        console.log(event);
        if (event == null) {
            this.page = 2;
            this.moreProducts = [];
        }
        else
            this.page++;

        this.WooCommerce.getAsync("products?page=" + this.page).then((data) => {
            console.log(JSON.parse(data.body));
            JSON.parse(data.body).forEach(element => {
                this.moreProducts.push(element)
            });
            console.log('moreP', this.moreProducts);

            if (event != null) {
                event.complete();
            }

            if (JSON.parse(data.body).products.length < 10) {
                event.enable(false);

                this.toastCtrl.create({
                    message: "No more products!",
                    duration: 5000
                }).present();

            }


        }, (err) => {
            console.log(err)
        })
    }

    openProductPage(product) {
        this.navCtrl.push('ProductDetails', { "product": product });
    }

    onSearch(event) {
        if (this.searchQuery.length > 0) {
            this.navCtrl.push('SearchPage', { "searchQuery": this.searchQuery });
        }
    }

}
