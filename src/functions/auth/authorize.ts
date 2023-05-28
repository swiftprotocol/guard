import get from "../get.js";
import put from "../put.js";

export default async function authorize(type: string, address: string) {
  let authString = "";
  try {
    authString = await get.call(this, "authorizations");
  } catch (e) {
    authString = "";
  }
  const authorizations = authString.split(",") || [];
  if (!authorizations.includes(`${type}+${address}`))
    authorizations.push(`${type}+${address}`);
  await put.call(this, "authorizations", authorizations.join(","));
}
