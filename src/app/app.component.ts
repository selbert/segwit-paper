import { Component } from '@angular/core';
import { Address, AddressService } from './services/address.service';
import { Subscription } from 'rxjs/Subscription';
import { address } from 'bitcoinjs-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AddressService],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  addresses:Address[];
  subscription:Subscription;

  constructor(private _addressService: AddressService){
   
  }

  ngOnInit() {
    this.addresses = new Array()
    this.addAddress()
  }

  addAddress() {
    this.subscription = this._addressService.getNewAddress().subscribe(
      u => {
        this.addresses.push(u)
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
