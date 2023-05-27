import Guard from "../src";
import { api, chainId, rpc } from "./constants";
import { getSigningStargateClient, getWallet } from "./helpers";

// This test will initialize a new instance of Guard

let windowSpy: jest.SpyInstance;

beforeEach(() => {
  process.env.NODE_ENV = "jest";
  windowSpy = jest.spyOn(window, "window", "get");
});

afterEach(() => {
  process.env.NODE_ENV = undefined;
  windowSpy.mockRestore();
});

test("Initialize Guard with the Keplr API", async () => {
  const wallet = await getWallet();
  const client = await getSigningStargateClient(rpc, wallet);

  const getOfflineSigner = () => wallet;

  const signArbitrary = async (_: string, signer: string, body: string) => {
    const msg = await client.experimentalAdr36Sign(
      signer,
      Uint8Array.from(Array.from(body).map((c) => c.charCodeAt(0)))
    );

    return msg.signatures[0];
  };

  windowSpy.mockImplementation(() => ({
    keplr: {},
    wallet: {
      version: "0.11.63",
      mode: "extension",
      defaultOptions: {},
      getOfflineSigner,
      signArbitrary,
    },
  }));

  const guard = new Guard({
    api,
    chainId,
    wallet: "keplr",
  });

  expect(guard.chainId).toBe(chainId);
});

test("Initialize Guard with a custom wallet", async () => {
  const wallet = await getWallet();
  const [account] = await wallet.getAccounts();

  const address = account.address;
  const hexPubKey = Buffer.from(account.pubkey.buffer).toString("hex");

  const client = await getSigningStargateClient(rpc, wallet);

  const signArbitrary = async (_: string, signer: string, body: string) => {
    const msg = await client.experimentalAdr36Sign(
      signer,
      Uint8Array.from(Array.from(body).map((c) => c.charCodeAt(0)))
    );

    return msg.signatures[0];
  };

  const guard = new Guard({
    api,
    chainId,
    account: {
      address,
      hexPubKey,
    },
    walletMethods: {
      signArbitrary,
    },
  });

  expect(guard.chainId).toBe(chainId);
});

test("PUT/GET encrypted data from Guard API", async () => {
  const wallet = await getWallet();
  const [account] = await wallet.getAccounts();

  const address = account.address;
  const hexPubKey = Buffer.from(account.pubkey.buffer).toString("hex");

  const client = await getSigningStargateClient(rpc, wallet);

  const signArbitrary = async (_: string, signer: string, body: string) => {
    const msg = await client.experimentalAdr36Sign(
      signer,
      Uint8Array.from(Array.from(body).map((c) => c.charCodeAt(0)))
    );

    return msg.signatures[0];
  };

  const guard = new Guard({
    api,
    chainId,
    account: {
      address,
      hexPubKey,
    },
    walletMethods: {
      signArbitrary,
    },
  });

  const value = "Hello world!";

  await guard.put("test-data", value, "jest");

  const decryptedValue = await guard.get("test-data", "jest");
  console.log("Decrypted value from API: " + decryptedValue);

  expect(decryptedValue).toBe(value);
});
