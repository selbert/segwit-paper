import { Component } from '@angular/core';
import { Address } from '../services/address.service';
import { Input } from '@angular/core';

@Component({
  selector: 'wallet',
  templateUrl: './wallet.component.html',
  providers: [ Address ],
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent {
  @Input() address:Address;

  constructor(address:Address){}
}
