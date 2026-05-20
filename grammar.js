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
      kw("with"),
      commaSep1($.with_binding),
      $.statement
    ),

    with_binding: $ => seq(
      field("name", $.name),
      ":=",
      field("value", $.expression)
    ),

    select_statement: $ => seq(
      kw("select"),
      optional(kw("detached")),
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
      kw("insert"),
      $.type_name,
      optional($.shape_literal)
    ),

    update_statement: $ => seq(
      kw("update"),
      $.expression,
      optional($.filter_clause),
      optional($.shape_literal)
    ),

    delete_statement: $ => seq(
      kw("delete"),
      $.expression,
      optional($.filter_clause)
    ),

    for_statement: $ => seq(
      kw("for"),
      field("name", $.name),
      kw("in"),
      field("iterable", $.expression),
      kw("union"),
      field("result", $.expression)
    ),

    function_statement: $ => seq(
      choice(
        kw("function"),
        seq(kw("abstract"), kw("constraint")),
        kw("aggregate")
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
      kw("create"),
      kw("alter"),
      kw("drop"),
      kw("rename"),
      kw("set"),
      kw("from"),
      kw("configure"),
      kw("start"),
      kw("commit"),
      kw("rollback"),
      kw("grant"),
      kw("revoke")
    ),

    filter_clause: $ => seq(kw("filter"), $.expression),

    order_clause: $ => seq(
      kw("order"),
      optional(kw("by")),
      commaSep1($.expression)
    ),

    group_clause: $ => seq(
      kw("group"),
      optional(kw("by")),
      commaSep1($.expression)
    ),

    offset_clause: $ => seq(kw("offset"), $.expression),

    limit_clause: $ => seq(kw("limit"), $.expression),

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
      kw("if"),
      field("condition", $.expression),
      kw("else"),
      field("else", $.expression)
    )),

    binary_expression: $ => choice(
      prec.left(PREC.OR, seq($.expression, kw("or"), $.expression)),
      prec.left(PREC.AND, seq($.expression, kw("and"), $.expression)),
      prec.left(PREC.COMPARE, seq($.expression, choice("=", "!=", "<", "<=", ">", ">="), $.expression)),
      prec.left(PREC.COMPARE, seq($.expression, choice(kw("is"), kw("in"), kw("like"), kw("ilike")), $.expression)),
      prec.left(PREC.CONCAT, seq($.expression, choice("++", "//"), $.expression)),
      prec.left(PREC.ADD, seq($.expression, choice("+", "-"), $.expression)),
      prec.left(PREC.MUL, seq($.expression, choice("*", "/", "%"), $.expression)),
      prec.right(PREC.POW, seq($.expression, "^", $.expression)),
      prec.left(PREC.COMPARE, seq($.expression, choice("?!=", "??", "?="), $.expression))
    ),

    unary_expression: $ => prec.right(PREC.UNARY, seq(
      choice("+", "-", "~", kw("not")),
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
      optional(choice(kw("named"), kw("variadic"), kw("optional"), kw("required"))),
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
      kw("array"),
      "<",
      $.type_expression,
      ">"
    ),

    tuple_type: $ => seq(
      kw("tuple"),
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
      kw("true"),
      kw("false"),
      kw("empty")
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

    comment: _ => token(/#[^\n]*/)
  }
});
