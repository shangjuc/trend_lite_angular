
console.log(document.location.host)

let origin = "https://analytics.qsearch.cc"
if (document.location.hostname.includes("localhost")) {
  origin = "http://localhost:3000";
}

export const server_origin = origin;

