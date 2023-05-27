import { Secp256k1HdWallet } from "@cosmjs/amino";
import { SigningStargateClient } from "@swiftprotocol/stargate";
import { prefix } from "./constants";

import { TextEncoder, TextDecoder } from "util";
Object.assign(global, { TextDecoder, TextEncoder });

export async function getWallet() {
  return await Secp256k1HdWallet.fromMnemonic(
    "jungle enhance include sort rule happy blame payment lava seek monitor network",
    { prefix }
  );
}

export async function getSigningStargateClient(
  rpc: string,
  wallet: Secp256k1HdWallet
) {
  return await SigningStargateClient.connectWithSigner(rpc, wallet);
}
