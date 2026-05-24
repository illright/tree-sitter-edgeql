export const PREC = {
  OR: 1,
  AND: 2,
  COMPARE: 3,
  CONCAT: 4,
  ADD: 5,
  MUL: 6,
  POW: 7,
  UNARY: 8,
  CAST: 9,
  CALL: 10,
  PATH: 11,
  CONDITIONAL: 12,
};

function escapeRegex(char) {
  return char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function ciChar(char) {
  if (/[a-zA-Z]/.test(char)) {
    return `[${char.toLowerCase()}${char.toUpperCase()}]`;
  }
  return escapeRegex(char);
}

export function makeKeyword(word) {
  return new RegExp(word.split("").map(ciChar).join(""));
}

export function makeCaseInsensitiveWordSet(words) {
  const parts = words
    .slice()
    .sort((a, b) => b.length - a.length)
    .map(word => word.split("").map(ciChar).join(""));

  return new RegExp(`(?:${parts.join("|")})`);
}

export function keyword(word) {
  return token(prec(2, makeKeyword(word)));
}

export function commaSep(rule) {
  return optional(commaSep1(rule));
}

export function commaSep1(rule) {
  return seq(rule, repeat(seq(",", rule)), optional(","));
}
