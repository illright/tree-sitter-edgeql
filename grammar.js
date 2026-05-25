/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

import keyword_rules from "./grammar/keywords.js";
import builtin_rules from "./grammar/builtins.js";
import name_rules from "./grammar/names.js";
import literal_rules from "./grammar/literals.js";
import type_rules from "./grammar/types.js";
import expression_rules from "./grammar/expressions.js";
import statement_rules from "./grammar/statements.js";

export default grammar({
  name: "edgeql",

  extras: $ => [
    /\s+/,
    $.comment,
  ],

  word: $ => $.identifier,

  conflicts: $ => [
    [$.set_literal, $.block],
    [$.set_literal, $.statement],
    [$.array_type],
    [$.path_expression, $.module_qualified_name],
    [$.dotted_module_qualified_name, $.type_name],
    [$.type_name, $.expression],
    [$.create_statement, $.command_keyword],
    [$.sdl_module_declaration, $.with_module_clause],
  ],

  rules: {
    source_file: $ => optional($._statement_list),

    comment: _ => token(/#[^\n]*/),

    ...keyword_rules,
    ...builtin_rules,
    ...name_rules,
    ...literal_rules,
    ...type_rules,
    ...expression_rules,
    ...statement_rules,
  },
});
