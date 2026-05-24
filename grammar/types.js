import { commaSep1 } from "./helpers.js";

export default {
  type_expression: $ => choice(
    $.set_of_type,
    $.generic_type,
    $.dotted_module_qualified_name,
    $.type_name,
    $.array_type,
    $.tuple_type,
  ),

  set_of_type: $ => seq(
    $.keyword_set,
    $.keyword_of,
    $.type_expression,
  ),

  generic_type: $ => prec(1, seq(
    field("base", choice($.module_qualified_name, $.name, $.builtin_type)),
    "<",
    commaSep1(choice(
      $.type_expression,
      $.literal,
      seq($.name, ":", $.type_expression),
    )),
    ">",
  )),

  array_type: $ => seq(
    $.keyword_array,
    "<",
    $.type_expression,
    ">",
    repeat($.array_dimensions),
  ),

  tuple_type: $ => seq(
    $.keyword_tuple,
    "<",
    commaSep1(choice(
      $.type_expression,
      seq($.name, ":", $.type_expression),
    )),
    ">",
  ),

  array_dimensions: $ => seq("[", optional($.integer), "]"),
};
