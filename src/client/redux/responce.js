import fetch from "node-fetch";

export default async function(url, headers = {}) {
  const data = await fetch(url, headers);
  return data.json();
}
