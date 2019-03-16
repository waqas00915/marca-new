import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
import { Http } from '@angular/http';

@IonicPage({})
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class Login {

    username: string = 'admin';
    password: string = 'admin';
    // config: any = {
    //     apiKey: "AIzaSyA9AzXZL0wgkfqmlkKF1MokIIJcI8CD0Jo",
    //     authDomain: "marca-c6c43.firebaseapp.com",
    //     databaseURL: "https://marca-c6c43.firebaseio.com",
    //     projectId: "marca-c6c43",
    //     storageBucket: "marca-c6c43.appspot.com",
    //     messagingSenderId: "665212716163"
    // };
    // firebase.initializeApp(config);

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public http: Http, public toastCtrl: ToastController, public storage: Storage, public woo: WoocommerceProvider,
        public alertCtrl: AlertController, public events: Events) {
        this.username = 'admin';
        this.password = 'admin';
    }

    login() {
        var url = 'https://marca.pk/wp-login.php';
        this.http.request(url, { method: 'post', body: { log: this.username, pwd: this.password, forAPI: 'LUNAPI' }, withCredentials: true }).subscribe(
            res => {
                console.log('sees', res);
                this.alertCtrl.create({ message: res.text() })
            }, err => {
                console.log('errr', err);
            });
        // this.http.post(url, { log: this.username, pwd: this.password, forAPI: 'LUNAPI' }, {}).subscribe(res => {
        //     console.log('sees', res);
        //     this.alertCtrl.create({ message: res.text() })
        // }, err => {
        //     console.log('errr', err);
        // })
        // this.http.post('https://marca.pk/wp-login.php', { log: this.username, pwd: this.password, forAPI: "LUNAPI" }, {}).then(res => {
        //     console.log(res);
        // }).catch(err => {
        //     console.log(err);
        // })
        // return;
        // this.http.post("https://marca.pk/wp-login.php", { log: this.username, pwd: this.password, forAPI: "LUNAPI" })
        //     .subscribe((res) => {

        //         let response = res.json();

        //         if (response.error) {
        //             this.toastCtrl.create({
        //                 message: response.error,
        //                 duration: 5000
        //             }).present();
        //             return;
        //         }

        //         this.storage.set("userLoginInfo", response).then((data) => {
        //             this.alertCtrl.create({
        //                 title: "Login Successful",
        //                 message: "You have been logged in successfully.",
        //                 buttons: [{
        //                     text: "OK",
        //                     handler: () => {

        //                         this.events.publish("updateMenu");

        //                         if (this.navParams.get("next")) {
        //                             this.navCtrl.push(this.navParams.get("next"));
        //                         } else {
        //                             this.navCtrl.pop();
        //                         }
        //                     }
        //                 }]
        //             }).present();
        //         })
        //     });
    }
    SignupPage() {
        this.navCtrl.push("Signup");
    }
}
