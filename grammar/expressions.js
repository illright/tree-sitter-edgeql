import { PREC, commaSep } from "./helpers.js";

export default {
  expression: $ => choice(
    $.exists_expression,
    $.conditional_expression,
    $.binary_expression,
    $.unary_expression,
    $.cast_expression,
    $.shaped_expression,
    $.call_expression,
    $.path_expression,
    $.relative_path_expression,
    $.literal,
    $.constant,
    $.variable,
    $.link_property,
    $.set_literal,
    $.tuple_literal,
    $.empty_tuple_literal,
    $.array_literal,
    $.parenthesized_expression,
    $.generic_type,
    $.module_qualified_name,
    $.name,
    $.builtin_module,
    $.builtin_function,
    $.builtin_constraint,
  ),

  exists_expression: $ => seq(
    $.keyword_exists,
    optional($.keyword_global),
    $.expression,
  ),

  conditional_expression: $ => prec.right(PREC.CONDITIONAL, seq(
    field("then", $.expression),
    $.keyword_if,
    field("condition", $.expression),
    $.keyword_else,
    field("else", $.expression),
  )),

  binary_expression: $ => choice(
    prec.left(PREC.OR, seq($.expression, $.keyword_or, $.expression)),
    prec.left(PREC.AND, seq($.expression, $.keyword_and, $.expression)),
    prec.left(PREC.COMPARE, seq($.expression, choice("=", "!=", "<", "<=", ">", ">="), $.expression)),
    prec.left(PREC.COMPARE, seq($.expression, choice($.keyword_is, $.keyword_in, $.keyword_like, $.keyword_ilike), $.expression)),
    prec.left(PREC.CONCAT, seq($.expression, choice("++", "//"), $.expression)),
    prec.left(PREC.ADD, seq($.expression, choice("+", "-"), $.expression)),
    prec.left(PREC.MUL, seq($.expression, choice("*", "/", "%"), $.expression)),
    prec.right(PREC.POW, seq($.expression, "^", $.expression)),
    prec.left(PREC.COMPARE, seq($.expression, choice("?!=", "??", "?="), $.expression)),
  ),

  unary_expression: $ => prec.right(PREC.UNARY, seq(
    choice("+", "-", "~", $.keyword_not),
    $.expression,
  )),

  cast_expression: $ => prec.right(PREC.CAST, seq(
    "<",
    $.type_expression,
    ">",
    $.expression,
  )),

  call_expression: $ => prec(PREC.CALL, seq(
    field("function", choice($.path_expression, $.module_qualified_name, $.type_name, $.name, $.builtin_function, $.builtin_constraint)),
    field("arguments", $.arguments),
  )),

  arguments: $ => seq(
    "(",
    commaSep(choice($.definition, $.expression)),
    ")",
  ),

  definition: $ => prec.right(PREC.CONDITIONAL, seq(
    field("name", choice(
      $.name,
      $.builtin_function,
      $.builtin_constraint,
      $.builtin_type,
      $.builtin_module,
    )),
    ":=",
    field("value", $.expression),
  )),

  path_expression: $ => prec.left(PREC.PATH, seq(
    choice($.variable, $.link_property, $.type_name, $.name, $.parenthesized_expression),
    repeat1(choice(
      seq(".", $.path_segment),
      seq(".<", $.path_segment),
      seq(".>", $.path_segment),
      seq("::", $.name),
      seq("@", $.name),
    )),
  )),

  relative_path_expression: $ => prec.left(PREC.PATH, seq(
    ".",
    $.path_segment,
    repeat(choice(
      seq(".", $.path_segment),
      seq(".<", $.path_segment),
      seq(".>", $.path_segment),
      seq("::", $.name),
      seq("@", $.name),
    )),
  )),

  path_segment: $ => prec.right(seq(
    $.name,
    optional($.path_type_filter),
  )),

  path_type_filter: $ => seq(
    "[",
    $.keyword_is,
    $.type_name,
    "]",
  ),

  shaped_expression: $ => prec(PREC.PATH, seq(
    choice($.path_expression, $.call_expression, $.name, $.parenthesized_expression),
    $.shape_literal,
  )),

  shape_literal: $ => seq("{", commaSep($.shape_element), "}"),

  shape_element: $ => choice(
    seq(optional("@"), $.name, optional(seq(":", $.shape_literal)), optional($.shape_element_modifiers)),
    seq(optional("@"), $.name, ":=", $.expression, optional($.shape_element_modifiers)),
    $.shape_element_clause,
  ),

  shape_element_modifiers: $ => seq(
    choice(
      seq(
        $.shape_filter_clause,
        optional($.shape_offset_clause),
        optional($.shape_limit_clause),
      ),
      seq(
        $.shape_offset_clause,
        optional($.shape_limit_clause),
      ),
      $.shape_limit_clause,
    ),
  ),

  shape_element_clause: $ => choice(
    $.shape_filter_clause,
    $.shape_limit_clause,
    $.shape_offset_clause,
  ),

  shape_filter_clause: $ => seq($.keyword_filter, $.expression),

  shape_limit_clause: $ => seq($.keyword_limit, $.expression),

  shape_offset_clause: $ => seq($.keyword_offset, $.expression),

  set_literal: $ => seq("{", commaSep($.expression), "}"),

  tuple_literal: $ => seq(
    "(",
    choice($.definition, $.expression),
    ",",
    commaSep(choice($.definition, $.expression)),
    ")",
  ),

  empty_tuple_literal: _ => seq("(", ")"),

  array_literal: $ => seq("[", commaSep($.expression), "]"),

  parenthesized_expression: $ => seq(
    "(",
    choice(
      $.select_statement,
      $.insert_statement,
      $.update_statement,
      $.delete_statement,
      $.for_statement,
      $.group_statement,
      $.expression,
    ),
    ")",
  ),
};
