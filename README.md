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

This instantiates Guard such that data encrypted with it can only be decrypted by the Swift Encryption Master agent.

```javascript
let guard = new Guard({
  api: "https://guard.swiftprotocol.zone",
  wallet: "keplr",
});
```

`wallet` can be either `keplr` or `leap`, depending on the browser wallet API you are using.

## Encrypted Key/Value Storage

### Put

Allows you to store any key value data where the value is encrypted.

```javascript
await guard.put("key", "value");
```

### Get [TODO]

Allows you to retrieve key value data where the value is decrypted upon retrieval.

```javascript
await guard.get("key");
```
