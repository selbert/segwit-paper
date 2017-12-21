import { Injectable } from '@angular/core';
import { ECPair, crypto, address, script, networks } from 'bitcoinjs-lib';
import { Generator } from 'more-entropy';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';

export class Address {
    wifPrivateK:string;
    address:Buffer;
    bechAddress:Buffer;
}

@Injectable()
export class AddressService { 


    // 3C
    constructor() {
    }

    // 3D
    getNewAddress():Observable<Address> {
        var newAddress = new Address()
        var generator = new Generator()

        return Observable.create(obsever => {
            generator.generate(1000, function(vals) {
                var keyPair = ECPair.makeRandom({network: networks.bitcoin})
                newAddress.wifPrivateK = keyPair.toWIF();
                var pubKey = keyPair.getPublicKeyBuffer()
                
                var redeemScript = script.witnessPubKeyHash.output.encode(crypto.hash160(pubKey))
                var scriptPubKey = script.scriptHash.output.encode(crypto.hash160(redeemScript))
                newAddress.address = address.fromOutputScript(scriptPubKey)
                var scriptPubKeyBech = script.witnessPubKeyHash.output.encode(crypto.hash160(pubKey))
                newAddress.bechAddress = address.fromOutputScript(scriptPubKeyBech)
                obsever.next(newAddress)
            })
        })
    }

}