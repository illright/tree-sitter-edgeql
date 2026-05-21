/**
 * @file The query language for the Gel database (formerly known as EdgeDB)
 * @author illright
 * @license GPL-3.0
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const PREC = {
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
  CONDITIONAL: 12
};

function ci(word) {
  return new RegExp(
    word
      .split("")
      .map(ch => {
        if (/[a-zA-Z]/.test(ch)) {
          return `[${ch.toLowerCase()}${ch.toUpperCase()}]`;
        }
        return ch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      })
      .join("")
  );
}

function kw(word) {
  return token(prec(2, ci(word)));
}

function commaSep(rule) {
  return optional(commaSep1(rule));
}

function commaSep1(rule) {
  return seq(rule, repeat(seq(",", rule)), optional(","));
}

export default grammar({
  name: "edgeql",

  extras: $ => [
    /\s+/,
    $.comment
  ],

  word: $ => $.identifier,

  rules: {
    source_file: $ => optional($._statement_list),

    _statement_list: $ => seq(
      $.statement,
      repeat(seq(";", $.statement)),
      optional(";")
    ),

    statement: $ => choice(
      choice(
        $.with_statement,
        $.select_statement,
        $.insert_statement,
        $.update_statement,
        $.delete_statement,
        $.for_statement,
        $.function_statement,
        $.command_statement,
        $.expression
      )
    ),

    with_statement: $ => seq(
      $.keyword_with,
      commaSep1($.with_binding),
      $.statement
    ),

    with_binding: $ => seq(
      field("name", $.name),
      ":=",
      field("value", $.expression)
    ),

    select_statement: $ => seq(
      $.keyword_select,
      optional($.keyword_detached),
      commaSep1($.expression),
      repeat(choice(
        $.filter_clause,
        $.order_clause,
        $.offset_clause,
        $.limit_clause,
        $.group_clause
      ))
    ),

    insert_statement: $ => seq(
      $.keyword_insert,
      $.type_name,
      optional($.shape_literal)
    ),

    update_statement: $ => seq(
      $.keyword_update,
      $.expression,
      optional($.filter_clause),
      optional($.shape_literal)
    ),

    delete_statement: $ => seq(
      $.keyword_delete,
      $.expression,
      optional($.filter_clause)
    ),

    for_statement: $ => seq(
      $.keyword_for,
      field("name", $.name),
      $.keyword_in,
      field("iterable", $.expression),
      $.keyword_union,
      field("result", $.expression)
    ),

    function_statement: $ => seq(
      choice(
        $.keyword_function,
        seq($.keyword_abstract, $.keyword_constraint),
        $.keyword_aggregate
      ),
      $.name,
      $.parameters,
      optional(seq("->", $.type_expression)),
      choice($.block, $.expression)
    ),

    command_statement: $ => seq(
      $.command_keyword,
      repeat1(choice(
        $.expression,
        $.block,
        ","
      ))
    ),

    command_keyword: $ => choice(
      $.keyword_create,
      $.keyword_alter,
      $.keyword_drop,
      $.keyword_rename,
      $.keyword_set,
      $.keyword_from,
      $.keyword_configure,
      $.keyword_start,
      $.keyword_commit,
      $.keyword_rollback,
      $.keyword_grant,
      $.keyword_revoke
    ),

    filter_clause: $ => seq($.keyword_filter, $.expression),

    order_clause: $ => seq(
      $.keyword_order,
      optional($.keyword_by),
      commaSep1($.expression)
    ),

    group_clause: $ => seq(
      $.keyword_group,
      optional($.keyword_by),
      commaSep1($.expression)
    ),

    offset_clause: $ => seq($.keyword_offset, $.expression),

    limit_clause: $ => seq($.keyword_limit, $.expression),

    expression: $ => choice(
      $.conditional_expression,
      $.binary_expression,
      $.unary_expression,
      $.cast_expression,
      $.shaped_expression,
      $.call_expression,
      $.path_expression,
      $.literal,
      $.constant,
      $.variable,
      $.link_property,
      $.array_literal,
      $.parenthesized_expression,
      $.name
    ),

    shaped_expression: $ => prec(PREC.PATH, seq(
      choice($.path_expression, $.call_expression, $.name, $.parenthesized_expression),
      $.shape_literal
    )),

    conditional_expression: $ => prec.right(PREC.CONDITIONAL, seq(
      field("then", $.expression),
      $.keyword_if,
      field("condition", $.expression),
      $.keyword_else,
      field("else", $.expression)
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
      prec.left(PREC.COMPARE, seq($.expression, choice("?!=", "??", "?="), $.expression))
    ),

    unary_expression: $ => prec.right(PREC.UNARY, seq(
      choice("+", "-", "~", $.keyword_not),
      $.expression
    )),

    cast_expression: $ => prec.right(PREC.CAST, seq(
      "<",
      $.type_expression,
      ">",
      $.expression
    )),

    call_expression: $ => prec(PREC.CALL, seq(
      field("function", choice($.path_expression, $.type_name, $.name)),
      field("arguments", $.arguments)
    )),

    arguments: $ => seq(
      "(",
      commaSep(choice($.definition, $.expression)),
      ")"
    ),

    definition: $ => seq(
      field("name", $.name),
      ":=",
      field("value", $.expression)
    ),

    path_expression: $ => prec.left(PREC.PATH, seq(
      choice($.variable, $.link_property, $.type_name, $.name, $.parenthesized_expression),
      repeat1(choice(
        seq(".", $.name),
        seq(".<", $.name),
        seq(".>", $.name),
        seq("::", $.name),
        seq("@", $.name)
      ))
    )),

    parameters: $ => seq(
      "(",
      commaSep($.parameter),
      ")"
    ),

    parameter: $ => seq(
      optional(choice($.keyword_named, $.keyword_variadic, $.keyword_optional, $.keyword_required)),
      field("name", $.name),
      ":",
      field("type", $.type_expression),
      optional(seq(":=", $.expression))
    ),

    type_expression: $ => choice(
      $.type_name,
      $.array_type,
      $.tuple_type
    ),

    array_type: $ => seq(
      $.keyword_array,
      "<",
      $.type_expression,
      ">"
    ),

    tuple_type: $ => seq(
      $.keyword_tuple,
      "<",
      commaSep1(choice(
        $.type_expression,
        seq($.name, ":", $.type_expression)
      )),
      ">"
    ),

    array_dimensions: $ => seq("[", optional($.integer), "]"),

    type_name: _ => token(/[A-Za-z_][A-Za-z0-9_]*(?:::[A-Za-z_][A-Za-z0-9_]*)*/),

    shape_literal: $ => seq("{", commaSep($.shape_element), "}"),

    shape_element: $ => choice(
      seq(optional("@"), $.name, optional(seq(":", $.shape_literal))),
      seq(optional("@"), $.name, ":=", $.expression)
    ),

    set_literal: $ => seq("{", commaSep($.expression), "}"),

    array_literal: $ => seq("[", commaSep($.expression), "]"),

    parenthesized_expression: $ => seq("(", $.expression, ")"),

    block: $ => seq("{", optional($._statement_list), "}"),

    constant: $ => choice(
      $.keyword_true,
      $.keyword_false,
      $.keyword_empty
    ),

    literal: $ => choice(
      $.float,
      $.decimal,
      $.integer,
      $.raw_string,
      $.string,
      $.bytes,
      $.dollar_string
    ),

    integer: _ => token(/[0-9](?:[0-9_]*[0-9])?/),

    float: _ => token(/(?:[0-9](?:[0-9_]*[0-9])?\.[0-9](?:[0-9_]*[0-9])?|[0-9](?:[0-9_]*[0-9])?[eE][+\-]?[0-9](?:[0-9_]*[0-9])?)(?:[eE][+\-]?[0-9](?:[0-9_]*[0-9])?)?/),

    decimal: _ => token(/(?:[0-9](?:[0-9_]*[0-9])?(?:\.[0-9](?:[0-9_]*[0-9])?)?|\.[0-9](?:[0-9_]*[0-9])?)n/),

    raw_string: _ => choice(
      token(/r'([^'\\]|\\.)*'/),
      token(/r"([^"\\]|\\.)*"/)
    ),

    string: _ => choice(
      token(/'([^'\\]|\\.)*'/),
      token(/"([^"\\]|\\.)*"/)
    ),

    bytes: _ => choice(
      token(/b'([^'\\]|\\.)*'/),
      token(/b"([^"\\]|\\.)*"/)
    ),

    dollar_string: _ => token(/\$[A-Za-z_][A-Za-z0-9_]*\$[^$]*\$[A-Za-z_][A-Za-z0-9_]*\$/),

    variable: $ => seq("$", choice($.identifier, $.quoted_name, $.integer)),

    link_property: $ => seq("@", choice($.identifier, $.quoted_name)),

    name: $ => choice($.identifier, $.quoted_name),

    identifier: _ => token(/[A-Za-z_][A-Za-z0-9_]*/),

    quoted_name: _ => token(/`[^`\n]+`/),

    comment: _ => token(/#[^\n]*/),

    keyword_with: _ => ci("with"),
    keyword_select: _ => ci("select"),
    keyword_detached: _ => ci("detached"),
    keyword_insert: _ => ci("insert"),
    keyword_update: _ => ci("update"),
    keyword_delete: _ => ci("delete"),
    keyword_for: _ => ci("for"),
    keyword_in: _ => ci("in"),
    keyword_union: _ => ci("union"),
    keyword_function: _ => ci("function"),
    keyword_abstract: _ => ci("abstract"),
    keyword_constraint: _ => ci("constraint"),
    keyword_aggregate: _ => ci("aggregate"),
    keyword_create: _ => ci("create"),
    keyword_alter: _ => ci("alter"),
    keyword_drop: _ => ci("drop"),
    keyword_rename: _ => ci("rename"),
    keyword_set: _ => ci("set"),
    keyword_from: _ => ci("from"),
    keyword_configure: _ => ci("configure"),
    keyword_start: _ => ci("start"),
    keyword_commit: _ => ci("commit"),
    keyword_rollback: _ => ci("rollback"),
    keyword_grant: _ => ci("grant"),
    keyword_revoke: _ => ci("revoke"),
    keyword_filter: _ => ci("filter"),
    keyword_order: _ => ci("order"),
    keyword_by: _ => ci("by"),
    keyword_group: _ => ci("group"),
    keyword_offset: _ => ci("offset"),
    keyword_limit: _ => ci("limit"),
    keyword_if: _ => ci("if"),
    keyword_else: _ => ci("else"),
    keyword_or: _ => ci("or"),
    keyword_and: _ => ci("and"),
    keyword_is: _ => ci("is"),
    keyword_like: _ => ci("like"),
    keyword_ilike: _ => ci("ilike"),
    keyword_not: _ => ci("not"),
    keyword_named: _ => ci("named"),
    keyword_variadic: _ => ci("variadic"),
    keyword_optional: _ => ci("optional"),
    keyword_required: _ => ci("required"),
    keyword_array: _ => ci("array"),
    keyword_tuple: _ => ci("tuple"),
    keyword_true: _ => ci("true"),
    keyword_false: _ => ci("false"),
    keyword_empty: _ => ci("empty"),
  }
});
