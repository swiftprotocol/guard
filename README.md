<div align='center'>
  <img src='https://i.ibb.co/CMgNKpT/Selfguard-Swift-1x.png'>
  <h1 align='center'>Guard by Swift Protocol</h1>
  <h3 align='center'>Wallet-Based Data Protection API</h3>
  <p align='center'> Guard provides encryption APIs and tooling to allow web2/3 developers to build secure UI/UX.</p>
  <p align='center'> Support: <a href="mailto:josef@swiftprotocol.zone">josef@swiftprotocol.zone</a></p>
</div>

## Installation

```zsh
yarn add @swiftprotocol/guard
```

## Usage

### Import SelfGuard

```javascript
import Guard from "@swiftprotocol/guard";
```

# Instantiation

This instantiates Guard such that data encrypted with it can only be decrypted by the Swift Encryption Master agent. By default, `chainId` is set to `juno-1`, but you can change it to any chain by providing a `chainId` value in the constructor object.

```javascript
const guard = new Guard({
  api: "https://guard.swiftprotocol.zone",
  wallet: "keplr",
  chainId: "stargaze-1",
});
```

`wallet` can be either `keplr` or `leap`, depending on the browser wallet API you are using.

You can also use an unsupported wallet type by providing an address, hex-encoded public key and signArbitrary method conforming with the [Keplr API signArbitrary method](https://docs.keplr.app/api/#request-signature-for-arbitrary-message).

```javascript
const guard = new Guard({
  api: "https://guard.swiftprotocol.zone",
  chainId: "stargaze-1",
  account: {
    address: "stars1...",
    hexPubKey: "0x..." // Hex-encoded public key
  },
  walletMethods: {
    signArbitrary: () => // Your signArbitrary wrapper function here
  }
});
```

## Encrypted Key/Value Storage

### Put

Allows you to store any key value data where the value is encrypted.

```javascript
await guard.put("key", "value");
```

### Get

Allows you to retrieve key value data where the value is decrypted upon retrieval.

```javascript
await guard.get("key");
```

### Authorize/Revoke access

Allows you to give permission to an address, contract or organization to access any of your data.

```javascript
await guard.authorize("contract", "juno1...");
```

```javascript
await guard.revoke("contract", "juno1...");
```

### Authorize/Revoke notify permissions

Allows you to authorize an organization to send you notifications using the `email` key, without allowing them to outright access it.

```javascript
await guard.notifyAuthorize("stargaze");
```

```javascript
await guard.notifyRevoke("stargaze");
```
