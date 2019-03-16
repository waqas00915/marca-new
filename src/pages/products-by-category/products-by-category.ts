import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
// import { ProductDetails } from '../product-details/product-details';

@IonicPage({})
@Component({
    selector: 'page-products-by-category',
    templateUrl: 'products-by-category.html',
})
export class ProductsByCategory {

    WooCommerce: any;
    products: any[] = [];
    page: number;
    category: any;

    constructor(
        private zone: NgZone,
        public events: Events,
        public navCtrl: NavController, public navParams: NavParams, private WP: WoocommerceProvider) {
        this.events.subscribe('updateScreen', () => {
            this.zone.run(() => {
                // console.log('what?', this.projects);
            });
        });
        this.page = 1;
        this.category = this.navParams.get("category");

        this.WooCommerce = WP.init();

        this.WooCommerce.getAsync("products?category=" + this.category.id).then((data) => {
            this.products = JSON.parse(data.body);
            console.log('poty', this.products);
            this.events.publish('updateScreen')
        }, (err) => {
            console.log(err)
        })

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProductsByCategory');
    }

    loadMoreProducts(event) {
        this.page++;
        console.log("Getting page " + this.page);
        this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug + "&page=" + this.page).then((data) => {
            let temp = (JSON.parse(data.body).products);

            this.products = this.products.concat(JSON.parse(data.body).products)
            console.log(this.products);
            event.complete();

            if (temp.length < 10)
                event.enable(false);
        })
    }

    openProductPage(product) {
        this.navCtrl.push('ProductDetails', { "product": product });
    }

}
