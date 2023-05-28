import get from "../get.js";
import put from "../put.js";

export default async function revoke(type: string, address: string) {
  let authString = "";
  try {
    authString = await get.call(this, "authorizations");
  } catch (e) {
    authString = "";
  }
  const authorizations = authString.split(",") || [];
  await put.call(
    this,
    "authorizations",
    authorizations.filter((auth) => auth != `${type}+${address}`).join(",")
  );
}
