<div align='center'>
  <img src='https://i.ibb.co/CMgNKpT/Selfguard-Swift-1x.png'>
  <h1 align='center'>Guard by Swift Protocol</h1>
  <h3 align='center'>Data Storage & Notifications API</h3>
  <p align='center'>Use Guard to securely store & manipulate user data within the Swift Protocol ecosystem.</p>
  <p align='center'> Support: <a href="mailto:josef@swiftprotocol.zone">josef@swiftprotocol.zone</a></p>
</div>

## Installation

```zsh
yarn add @swiftprotocol/guard
```

## Usage

To begin using Guard, you'll need an RSA key pair with encryption and decryption capabilities. Swift services store these keypairs in [Webauthn passkeys](https://webauthn.io/), but we do provide a `generateKeyPair` helper you can use for testing.

```javascript
import Guard, { generateKeyPair } from '@swiftprotocol/guard'

const { publicKeyHex, privateKeyHex } = generateKeyPair()
const guard = new Guard(publicKeyHex, privateKeyHex)
```

### Using namespaces

If you're using Guard for a third-party application separate from Swift, we recommend you use a namespace. You can specify your namespace when creating a new Guard instance.

```javascript
const guard = new Guard(publicKeyHex, privateKeyHex, { namespace: 'my-application' })
```

You should use a namespace to avoid data overlap with other applications. For example, if you want to store user notification preferences, storing them directly as `notification-preferences` may conflict with other preferences your users may be storing.

When you use a namespace, the data will be stored under `namespace/key`; for example: `my-application/notification-preferences`.
