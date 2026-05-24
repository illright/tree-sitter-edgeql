export default {
  identifier: _ => token(/[A-Za-z_][A-Za-z0-9_]*/),

  quoted_name: _ => token(/`[^`\n]+`/),

  name: $ => choice($.identifier, $.quoted_name),

  module_qualified_name: $ => seq(
    field("module", choice($.name, $.builtin_module)),
    "::",
    field("name", choice(
      $.name,
      $.builtin_type,
      $.builtin_function,
      $.builtin_constraint,
      $.builtin_module,
      $.builtin_index,
    )),
  ),

  dotted_module_qualified_name: $ => seq(
    field("module", seq(
      choice($.name, $.builtin_module),
      ".",
      $.name,
      repeat(seq(".", $.name)),
    )),
    "::",
    field("name", choice(
      $.name,
      $.builtin_type,
      $.builtin_function,
      $.builtin_constraint,
      $.builtin_module,
      $.builtin_index,
    )),
  ),

  type_name: $ => choice(
    $.module_qualified_name,
    $.name,
    $.builtin_type,
  ),

  variable: $ => seq("$", choice($.identifier, $.quoted_name, $.integer)),

  link_property: $ => seq("@", choice($.identifier, $.quoted_name)),
};
