import { keyword } from "./helpers.js";

const KEYWORDS = [
  "abort", "abstract", "access", "after", "aggregate", "alias", "all", "allow", "alter", "analyze", "and", "annotation",
  "applied", "as", "asc", "assignment", "before", "begin", "branch", "by", "cardinality", "cast",
  "check", "commit", "committed", "config", "configure", "conflict", "constraint", "create", "cube",
  "current", "data", "database", "ddl", "declare", "default", "deallocate", "deferrable", "deferred",
  "delegated", "delete", "deny", "describe", "desc", "detached", "discard", "distinct", "do", "drop",
  "each", "else", "empty", "end", "except", "exists", "explain", "extending", "extension", "fetch",
  "filter", "final", "first", "for", "force", "from", "function", "future", "get", "global", "grant",
  "group", "if", "ilike", "implicit", "import", "in", "index", "infix", "inheritable", "insert",
  "instance", "intersect", "introspect", "into", "is", "isolation", "last", "like", "limit", "listen",
  "link", "load", "lock", "match", "migration", "module", "move", "multi", "named", "never", "not", "notify",
  "object", "of", "offset", "on", "only", "onto", "operator", "optional", "optionality", "or", "order",
  "orphan", "over", "overloaded", "owned", "package", "partition", "permission", "policy", "populate",
  "postfix", "prefix", "prepare", "proposed", "property", "pseudo", "raise", "read", "refresh", "reject",
  "release", "rename", "repeatable", "required", "reset", "restrict", "revoke", "rewrite", "role", "roles",
  "rollback", "rollup", "savepoint", "scalar", "schema", "sdl", "select", "serializable", "session", "set",
  "single", "source", "start", "superuser", "system", "target", "template", "ternary", "then", "to", "array", "tuple",
  "transaction", "trigger", "type", "typeof", "union", "unless", "update", "using", "variadic", "verbose",
  "version", "view", "when", "window", "with", "write",
];

const rules = Object.fromEntries(
  KEYWORDS.map(word => [`keyword_${word}`, _ => keyword(word)]),
);

export default {
  ...rules,

  keyword_true: _ => keyword("true"),
  keyword_false: _ => keyword("false"),
  keyword_empty: _ => keyword("empty"),
};
