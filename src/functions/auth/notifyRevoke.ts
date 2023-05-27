import get from "../get";
import put from "../put";

export default async function notifyRevoke(name: string) {
  let authString = "";
  try {
    authString = await get.call(this, "notify-authorizations");
  } catch (e) {
    authString = "";
  }
  const authorizations = authString.split(",") || [];
  await put.call(
    this,
    "notify-authorizations",
    authorizations.filter((auth) => auth != name).join(",")
  );
}
