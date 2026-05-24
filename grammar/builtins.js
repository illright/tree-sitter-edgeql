import { makeCaseInsensitiveWordSet } from "./helpers.js";

const BUILTIN_MODULES = [
  "cal", "cfg", "enc", "ext", "fts", "go", "http", "js", "lang", "math",
  "net", "perm", "pg", "py", "rs", "schema", "std", "sys",
];

const BUILTIN_TYPES = [
  "Base64Alphabet", "BaseObject", "ElasticLanguage", "Endian", "FreeObject", "JsonEmpty", "Language",
  "LuceneLanguage", "Method", "Object", "PGLanguage", "RequestFailureKind", "RequestState", "Response",
  "ScheduledRequest", "Weight", "anycontiguous", "anydiscrete", "anyenum", "anyfloat", "anyint", "anynumeric",
  "anypoint", "anyreal", "anyscalar", "anytype", "array", "bigint", "bool", "bytes", "date", "date_duration",
  "datetime", "decimal", "document", "duration", "enum", "float32", "float64", "int16", "int32", "int64",
  "interval", "json", "local_date", "local_datetime", "local_time", "multirange", "range", "relative_duration",
  "sequence", "str", "timestamp", "timestamptz", "tuple", "uuid",
];

const BUILTIN_INDEXES = ["brin", "btree", "gin", "gist", "hash", "index", "spgist"];

const BUILTIN_FUNCTIONS = [
  "abs", "acos", "adjacent", "all", "any", "approximate_count", "array_agg", "array_fill", "array_get",
  "array_insert", "array_join", "array_replace", "array_set", "array_unpack", "asin", "assert", "assert_distinct",
  "assert_exists", "assert_single", "atan", "atan2", "bit_and", "bit_count", "bit_lshift", "bit_not", "bit_or",
  "bit_rshift", "bit_xor", "bounded_above", "bounded_below", "bytes_get_bit", "ceil", "contains", "cos", "cot",
  "count", "date_get", "datetime_current", "datetime_get", "datetime_of_statement", "datetime_of_transaction",
  "datetime_truncate", "duration_get", "duration_normalize_days", "duration_normalize_hours", "duration_to_seconds",
  "duration_truncate", "enumerate", "find", "floor", "get_current_branch", "get_current_database", "get_instance_name",
  "get_transaction_isolation", "get_version", "get_version_as_str", "json_array_unpack", "json_get", "json_object_pack",
  "json_object_unpack", "json_set", "json_typeof", "len", "lg", "ln", "log", "materialized", "max", "mean", "min",
  "multirange", "multirange_unpack", "overlaps", "pi", "random", "range", "range_get_lower", "range_get_upper",
  "range_is_empty", "range_is_inclusive_lower", "range_is_inclusive_upper", "range_unpack", "re_match", "re_match_all",
  "re_replace", "re_test", "reset_query_stats", "round", "search", "sequence_next", "sequence_reset", "sin", "sqrt",
  "stddev", "stddev_pop", "str_lower", "str_lpad", "str_ltrim", "str_pad_end", "str_pad_start", "str_repeat",
  "str_replace", "str_reverse", "str_rpad", "str_rtrim", "str_split", "str_title", "str_trim", "str_trim_end",
  "str_trim_start", "str_upper", "strictly_above", "strictly_below", "sum", "tan", "time_get", "to_bigint", "to_bytes",
  "to_date_duration", "to_datetime", "to_decimal", "to_duration", "to_float32", "to_float64", "to_int16", "to_int32",
  "to_int64", "to_json", "to_local_date", "to_local_datetime", "to_local_time", "to_relative_duration", "to_str",
  "to_uuid", "uuid_generate_v1mc", "uuid_generate_v4", "var", "var_pop", "with_options",
];

const BUILTIN_CONSTRAINTS = [
  "constraint", "exclusive", "expression", "len_value", "max_ex_value", "max_len_value", "max_value",
  "min_ex_value", "min_len_value", "min_value", "one_of", "regexp",
];

export default {
  builtin_module: _ => token(makeCaseInsensitiveWordSet(BUILTIN_MODULES)),
  builtin_type: _ => token(makeCaseInsensitiveWordSet(BUILTIN_TYPES)),
  builtin_index: _ => token(makeCaseInsensitiveWordSet(BUILTIN_INDEXES)),
  builtin_function: _ => token(makeCaseInsensitiveWordSet(BUILTIN_FUNCTIONS)),
  builtin_constraint: _ => token(makeCaseInsensitiveWordSet(BUILTIN_CONSTRAINTS)),
};
