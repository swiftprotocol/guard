import get from "../get.js";
import put from "../put.js";

export default async function notifyAuthorize(name: string) {
  let authString = "";
  try {
    authString = await get.call(this, "notify-authorizations");
  } catch (e) {
    authString = "";
  }
  const authorizations = authString.split(",") || [];
  if (!authorizations.includes(name)) authorizations.push(name);
  await put.call(this, "notify-authorizations", authorizations.join(","));
}
