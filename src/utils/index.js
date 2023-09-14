import { createHmac } from "node:crypto";

export function signJWT(obj, secret, expiresAt) {
  const header = {
    alg: "HS256",
    typ: "JWT",
    iss: "node http server",
    exp: expiresAt.getTime(),
  };

  const b64Header = toBase64(header);
  const jwtB64Header = replaceSpecialChars(b64Header);

  const payload = {
    ...obj
  };


  const b64Payload = toBase64(payload);
  const jwtB64Payload = replaceSpecialChars(b64Payload);

  const signature = createSignature(jwtB64Header, jwtB64Payload, secret);

  return `${jwtB64Header}.${jwtB64Payload}.${signature}`;
}

export function verifyJWT(token, secret) {
  const [b64header, b64payload, signature] = token.split(".");

  if (!verifySecret(signature, b64header, b64payload, secret))
    throw new Error("invalid secret");

  const header = JSON.parse(Buffer.from(b64header, "base64").toString("ascii"));

  const { typ, iss } = header;

  if (typ !== "JWT" || iss !== "node http server")
    throw new Error("Invalid jwt header");

  if (header.exp <= Date.now())
    throw new Error("Expired token");

  const payload = JSON.parse(Buffer.from(b64payload, "base64").toString("ascii"));

  return payload;
}

function toBase64(obj) {
  return Buffer.from(JSON.stringify(obj)).toString("base64");
}

function replaceSpecialChars(b64String) {
  return b64String.replace(/[=+/]/g, charToBeReplaced => {
    switch (charToBeReplaced) {
      case "=":
        return "";
      case "+":
        return "-";
      case "/":
        return "_";
    }
  })
}

function createSignature(jwtB64Header, jwtB64Payload, secret) {
  const signature = createHmac("sha256", secret);

  signature.update(`${jwtB64Header}.${jwtB64Payload}`);

  return replaceSpecialChars(signature.digest("base64"));
}

function verifySecret(signature, jwtB64Header, jwtB64Payload, secret) {
  const testSignature = createHmac("sha256", secret);

  testSignature.update(`${jwtB64Header}.${jwtB64Payload}`);

  return replaceSpecialChars(testSignature.digest("base64")) === signature;
}
