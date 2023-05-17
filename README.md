<div align='center'>
  <img src='https://i.ibb.co/hKFMhZz/Selfguard-Swift-1x.png'>
  <h1 align='center'>Guard by Swift Protocol</h1>
  <h3 align='center'>Wallet-Based Data Protection API</h3>
  <p align='center'> Guard provides encryption APIs and tooling to allow web2/3 developers to build secure UI/UX.</p>
  <p align='center'> Support: <a href="mailto:josef@swiftprotocol.zone">josef@swiftprotocol.zone</a>/p>
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
let sg = new Guard({
  db: {
    // PostgreSQL database connection info
    // ...
  },
  api_key: API_KEY,
});
```

## Encrypted Key/Value Storage

### Put

Allows you to store any key value data where the value is encrypted.

```javascript
await sg.put("key", "value");
```

### Get

Allows you to retrieve key value data where the value is decrypted upon retrieval

```javascript
await sg.get("key");
```
