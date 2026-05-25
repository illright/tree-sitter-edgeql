import { commaSep1 } from "./helpers.js";

export default {
  _statement_list: $ => seq(
    $.statement,
    repeat(seq(";", $.statement)),
    optional(";"),
  ),

  statement: $ => choice(
    $.import_statement,
    $.sdl_using_extension,
    $.sdl_module_declaration,
    $.sdl_assignment,
    $.sdl_scalar_declaration,
    $.sdl_type_declaration,
    $.sdl_link_declaration,
    $.sdl_constraint_declaration,
    $.create_statement,
    $.with_statement,
    $.select_statement,
    $.insert_statement,
    $.update_statement,
    $.delete_statement,
    $.for_statement,
    $.group_statement,
    $.function_statement,
    $.command_statement,
    $.expression,
  ),

  create_statement: $ => seq(
    $.keyword_create,
    choice(
      $.create_constraint_statement,
      $.create_function_statement,
      $.create_aggregate_statement,
    ),
  ),

  create_constraint_statement: $ => seq(
    choice($.keyword_constraint, $.builtin_constraint),
    field("name", choice($.module_qualified_name, $.name, $.builtin_constraint)),
    optional(seq($.keyword_extending, field("base", $.type_expression))),
    optional($.create_body_block),
  ),

  create_function_statement: $ => seq(
    $.keyword_function,
    field("name", choice($.module_qualified_name, $.name, $.builtin_function)),
    $.parameters,
    optional(seq("->", $.type_expression)),
    optional($.create_from_clause),
  ),

  create_aggregate_statement: $ => seq(
    $.keyword_aggregate,
    field("name", choice($.module_qualified_name, $.name, $.builtin_function)),
    $.parameters,
    optional(seq("->", $.type_expression)),
    optional($.create_from_clause),
  ),

  create_from_clause: $ => seq(
    $.keyword_from,
    field("language", $.name),
    optional($.keyword_aggregate),
    field("definition", choice($.dollar_string, $.string)),
  ),

  _create_body_statement_list: $ => seq(
    $.create_body_statement,
    repeat(seq(";", $.create_body_statement)),
    optional(";"),
  ),

  create_body_block: $ => seq("{", optional($._create_body_statement_list), "}"),

  create_body_statement: $ => choice(
    $.create_set_statement,
    $.sdl_constraint,
    $.sdl_property,
    $.sdl_link,
  ),

  create_set_statement: $ => seq(
    $.keyword_set,
    field("name", $.name),
    ":=",
    field("value", $.expression),
  ),

  sdl_scalar_declaration: $ => seq(
    optional($.keyword_abstract),
    $.keyword_scalar,
    optional($.keyword_type),
    field("name", $.name),
    optional(seq($.keyword_extending, commaSep1($.type_expression))),
    $.sdl_block,
  ),

  sdl_constraint_declaration: $ => seq(
    optional($.keyword_abstract),
    $.keyword_constraint,
    field("name", choice($.module_qualified_name, $.builtin_constraint, $.builtin_function, $.name)),
    optional($.parameters),
    optional(seq($.keyword_extending, commaSep1($.type_expression))),
    optional(seq($.keyword_on, field("subject", $.parenthesized_expression))),
    $.sdl_block,
  ),

  sdl_type_declaration: $ => seq(
    optional($.keyword_abstract),
    $.keyword_type,
    field("name", $.name),
    optional(seq($.keyword_extending, commaSep1($.type_expression))),
    optional($.sdl_block),
  ),

  sdl_link_declaration: $ => seq(
    optional($.keyword_abstract),
    $.keyword_link,
    field("name", $.name),
    optional($.sdl_block),
  ),

  sdl_using_extension: $ => seq(
    $.keyword_using,
    $.keyword_extension,
    field("name", choice($.module_qualified_name, $.name, $.builtin_module)),
  ),

  _sdl_module_statement_list: $ => seq(
    $.sdl_module_statement,
    repeat(seq(";", $.sdl_module_statement)),
    optional(";"),
  ),

  sdl_module_statement: $ => choice(
    $.sdl_type_declaration,
    $.sdl_scalar_declaration,
    $.sdl_link_declaration,
    $.sdl_constraint_declaration,
  ),

  sdl_module_declaration: $ => seq(
    $.keyword_module,
    field("name", choice($.name, $.builtin_module)),
    "{",
    optional($._sdl_module_statement_list),
    "}",
  ),

  _sdl_statement_list: $ => seq(
    $.sdl_statement,
    repeat(seq(";", $.sdl_statement)),
    optional(";"),
  ),

  sdl_block: $ => seq("{", optional($._sdl_statement_list), "}"),

  sdl_statement: $ => choice(
    $.sdl_assignment,
    $.sdl_annotation,
    $.sdl_pointer,
    $.sdl_constraint,
    $.sdl_property,
    $.sdl_link,
    $.sdl_access_policy,
    $.sdl_on_target_delete,
    $.sdl_rewrite,
    $.sdl_trigger,
    $.sdl_index,
  ),

  sdl_pointer: $ => seq(
    optional(choice($.keyword_required, $.keyword_optional, $.keyword_multi, $.keyword_single)),
    field("name", $.name),
    ":",
    field("type", $.type_expression),
    optional($.sdl_block),
  ),

  sdl_assignment: $ => seq(
    field("name", choice($.name, $.keyword_default)),
    ":=",
    field("value", $.expression),
  ),

  sdl_annotation: $ => seq(
    $.keyword_annotation,
    field("name", choice($.module_qualified_name, $.name)),
    ":=",
    field("value", $.expression),
  ),

  sdl_constraint: $ => prec.right(seq(
    optional($.keyword_delegated),
    $.keyword_constraint,
    field("name", choice($.module_qualified_name, $.builtin_constraint, $.builtin_function, $.name)),
    optional($.arguments),
    optional(seq($.keyword_on, field("subject", $.parenthesized_expression))),
  )),

  sdl_property: $ => seq(
    optional(choice($.keyword_required, $.keyword_optional, $.keyword_multi, $.keyword_single)),
    $.keyword_property,
    field("name", $.name),
    choice(
      seq(":=", field("value", $.expression)),
      seq(choice($.keyword_to, "->"), field("type", $.type_expression), optional($.sdl_block)),
      $.sdl_block,
    ),
  ),

  sdl_link: $ => seq(
    repeat(choice($.keyword_required, $.keyword_optional, $.keyword_multi, $.keyword_single)),
    $.keyword_link,
    field("name", $.name),
    choice($.keyword_to, "->"),
    field("type", $.type_expression),
    optional($.sdl_block),
  ),

  sdl_access_policy: $ => seq(
    $.keyword_access,
    $.keyword_policy,
    field("name", $.name),
    field("action", choice($.keyword_allow, $.keyword_deny)),
    field("scope", choice($.keyword_all, $.keyword_select, $.keyword_update, $.keyword_delete, $.keyword_insert)),
    optional(seq($.keyword_using, field("condition", $.parenthesized_expression))),
    optional($.sdl_block),
  ),

  sdl_on_target_delete: $ => seq(
    $.keyword_on,
    field("subject", choice($.keyword_target, $.name)),
    $.keyword_delete,
    field("action", choice($.keyword_allow, $.keyword_restrict, $.keyword_delete, $.keyword_deferred)),
  ),

  sdl_rewrite: $ => seq(
    $.keyword_rewrite,
    choice($.keyword_insert, $.keyword_update),
    $.keyword_using,
    field("value", $.expression),
  ),

  sdl_trigger: $ => seq(
    $.keyword_trigger,
    field("name", $.name),
    choice($.keyword_after, $.keyword_before),
    choice($.keyword_insert, $.keyword_update, $.keyword_delete),
    $.keyword_for,
    choice($.keyword_each, $.keyword_all),
    $.keyword_do,
    field("value", $.expression),
  ),

  sdl_index: $ => seq(
    $.keyword_index,
    field("name", choice($.module_qualified_name, $.builtin_index, $.name)),
    optional(seq($.keyword_on, field("value", $.expression))),
  ),

  with_statement: $ => seq(
    $.keyword_with,
    commaSep1(choice($.with_module_clause, $.with_binding)),
    $.statement,
  ),

  with_module_clause: $ => seq(
    $.keyword_module,
    field("module", choice($.name, $.builtin_module)),
  ),

  with_binding: $ => seq(
    field("name", $.name),
    ":=",
    field("value", $.expression),
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
      $.group_clause,
    )),
  ),

  insert_statement: $ => seq(
    $.keyword_insert,
    $.type_name,
    optional($.shape_literal),
  ),

  update_statement: $ => seq(
    $.keyword_update,
    $.expression,
    optional($.filter_clause),
    optional(seq($.keyword_set, $.shape_literal)),
  ),

  delete_statement: $ => seq(
    $.keyword_delete,
    $.expression,
    optional($.filter_clause),
  ),

  for_statement: $ => seq(
    $.keyword_for,
    field("name", $.name),
    $.keyword_in,
    field("iterable", $.expression),
    $.keyword_union,
    field("result", $.expression),
    repeat(choice(
      $.filter_clause,
      $.order_clause,
      $.offset_clause,
      $.limit_clause,
    )),
  ),

  group_statement: $ => seq(
    $.keyword_group,
    field("subject", $.expression),
    optional($.group_using_clause),
    $.group_by_clause,
    optional($.group_into_clause),
    $.keyword_union,
    field("result", choice($.definition, $.expression)),
    repeat(choice(
      $.filter_clause,
      $.order_clause,
      $.offset_clause,
      $.limit_clause,
    )),
  ),

  group_using_clause: $ => seq(
    $.keyword_using,
    commaSep1($.with_binding),
  ),

  group_by_clause: $ => seq(
    $.keyword_by,
    commaSep1($.expression),
  ),

  group_into_clause: $ => seq(
    $.keyword_into,
    field("name", $.name),
  ),

  function_statement: $ => seq(
    choice(
      $.keyword_function,
      $.keyword_aggregate,
    ),
    $.name,
    $.parameters,
    optional(seq("->", $.type_expression)),
    choice($.block, $.expression),
  ),

  command_statement: $ => seq(
    $.command_keyword,
    repeat1(choice(
      $.expression,
      $.block,
      ",",
    )),
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
    $.keyword_revoke,
  ),

  filter_clause: $ => seq($.keyword_filter, $.expression),

  order_clause: $ => seq(
    $.keyword_order,
    optional($.keyword_by),
    commaSep1($.expression),
  ),

  group_clause: $ => seq(
    $.keyword_group,
    optional($.keyword_by),
    commaSep1($.expression),
  ),

  offset_clause: $ => seq($.keyword_offset, $.expression),

  limit_clause: $ => seq($.keyword_limit, $.expression),

  parameters: $ => seq(
    "(",
    optional(commaSep1(choice($.parameter, $.positional_parameter))),
    ")",
  ),

  parameter: $ => seq(
    optional(choice(
      seq($.keyword_named, $.keyword_only),
      $.keyword_named,
      $.keyword_variadic,
      $.keyword_optional,
      $.keyword_required,
    )),
    field("name", choice($.variable, $.name)),
    ":",
    field("type", $.type_expression),
    optional(seq(choice(":=", "="), $.expression)),
  ),

  import_statement: $ => seq(
    $.keyword_import,
    commaSep1($.import_module),
  ),

  import_module: $ => seq(
    field("module", choice($.import_path, $.name, $.builtin_module)),
    optional(seq($.keyword_as, field("alias", $.name))),
  ),

  import_path: $ => seq(
    choice($.name, $.builtin_module),
    ".",
    $.name,
    repeat(seq(".", $.name)),
  ),

  positional_parameter: $ => seq(
    field("type", $.type_expression),
  ),

  block: $ => seq("{", optional($._statement_list), "}"),
};
