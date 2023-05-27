import get from "../get";
import put from "../put";

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
