(comment) @comment

(type_name) @type
(type_name (name (identifier) @type))
(type_name (name (quoted_name) @type))
(type_expression (dotted_module_qualified_name) @type)
(type_expression (generic_type base: (builtin_type) @type.builtin))
(type_expression (generic_type base: (name) @type))
(type_expression (generic_type base: (module_qualified_name) @type))

(builtin_type) @type.builtin
(builtin_module) @namespace
(builtin_index) @type.builtin
(builtin_function) @function.builtin
(builtin_constraint) @function.builtin

((builtin_module) @keyword
  (#match? @keyword "^(?i:schema)$"))

((name (identifier) @variable)
  (#is-not? local))
((name (quoted_name) @variable)
  (#is-not? local))

(create_constraint_statement
  (builtin_constraint) @keyword)

(module_qualified_name
  module: (name) @namespace)

(type_name
  (module_qualified_name
    module: (name) @namespace
    name: (name) @type))

(dotted_module_qualified_name
  module: (name) @namespace)

(import_module
  module: (import_path (name) @namespace))

(import_module
  alias: (name) @variable)

(with_module_clause
  module: (name) @namespace)

(create_from_clause
  language: (name) @keyword)

(create_from_clause
  language: (name (identifier) @keyword))

(create_from_clause
  language: (name (quoted_name) @keyword))

(create_function_statement
  name: (module_qualified_name
    module: (name) @namespace))

(call_expression
  function: (name (identifier) @function.call))

(call_expression
  function: (name (quoted_name) @function.call))

(call_expression
  function: (type_name) @function.call)

(call_expression
  function: (module_qualified_name) @function.call)

(call_expression
  function: (builtin_function) @function.builtin)

(call_expression
  function: (builtin_constraint) @function.builtin)

(parameter
  name: (name) @variable.parameter)

(parameter
  type: (type_expression (type_name) @type))

(variable) @variable.special
(link_property) @property

(shape_element
  (name) @property)

(shape_element
  (name (identifier) @property))

(shape_element
  (name (quoted_name) @property))

(definition
  name: (name) @property)

(definition
  name: (name (identifier) @property))

(definition
  name: (name (quoted_name) @property))

(sdl_pointer
  name: (name (identifier) @property))

(sdl_pointer
  name: (name (quoted_name) @property))

(sdl_property
  name: (name) @property)

(sdl_property
  name: (name (identifier) @property))

(sdl_property
  name: (name (quoted_name) @property))

(sdl_assignment
  name: (name) @property)

(sdl_assignment
  name: (name (identifier) @property))

(sdl_assignment
  name: (name (quoted_name) @property))

((sdl_constraint
   name: (name) @function.builtin)
  (#match? @function.builtin "^(?i:exclusive|expr|expression|len_value|max_ex_value|max_len_value|max_value|min_ex_value|min_len_value|min_value|one_of|regexp)$"))

((sdl_constraint
   name: (name (identifier) @function.builtin))
  (#match? @function.builtin "^(?i:exclusive|expr|expression|len_value|max_ex_value|max_len_value|max_value|min_ex_value|min_len_value|min_value|one_of|regexp)$"))

((sdl_constraint
   name: (name (quoted_name) @function.builtin))
  (#match? @function.builtin "^(?i:exclusive|expr|expression|len_value|max_ex_value|max_len_value|max_value|min_ex_value|min_len_value|min_value|one_of|regexp)$"))

(path_expression
  (name (identifier) @namespace)
  "::"
  (name))

(path_expression
  (name (quoted_name) @namespace)
  "::"
  (name))

(insert_statement
  (shape_literal
    (shape_element
      (name (identifier) @variable))))

(insert_statement
  (shape_literal
    (shape_element
      (name (quoted_name) @variable))))

(group_into_clause
  name: (name) @variable)

(with_binding
  name: (name) @variable)

(for_statement
  name: (name) @variable)

[
  (string)
  (raw_string)
  (bytes)
  (dollar_string)
] @string

[
  (integer)
  (float)
  (decimal)
] @number

[
  (keyword_true)
  (keyword_false)
] @boolean

(keyword_empty) @constant.builtin

[
  (keyword_after)
  (keyword_all)
  (keyword_allow)
  (keyword_annotation)
  (keyword_as)
  (keyword_before)
  (keyword_each)
  (keyword_default)
  (keyword_delegated)
  (keyword_do)
  (keyword_exists)
  (keyword_extension)
  (keyword_extending)
  (keyword_global)
  (keyword_into)
  (keyword_multi)
  (keyword_of)
  (keyword_on)
  (keyword_only)
  (keyword_policy)
  (keyword_property)
  (keyword_rewrite)
  (keyword_scalar)
  (keyword_single)
  (keyword_target)
  (keyword_to)
  (keyword_trigger)
  (keyword_type)
  (keyword_using)
] @keyword

[
  (keyword_abstract)
  (keyword_access)
  (keyword_aggregate)
  (keyword_alter)
  (keyword_by)
  (keyword_commit)
  (keyword_configure)
  (keyword_constraint)
  (keyword_create)
  (keyword_delete)
  (keyword_detached)
  (keyword_drop)
  (keyword_filter)
  (keyword_for)
  (keyword_from)
  (keyword_function)
  (keyword_grant)
  (keyword_group)
  (keyword_if)
  (keyword_import)
  (keyword_index)
  (keyword_insert)
  (keyword_link)
  (keyword_limit)
  (keyword_module)
  (keyword_named)
  (keyword_offset)
  (keyword_optional)
  (keyword_order)
  (keyword_required)
  (keyword_rename)
  (keyword_revoke)
  (keyword_rollback)
  (keyword_select)
  (keyword_set)
  (keyword_start)
  (keyword_union)
  (keyword_update)
  (keyword_variadic)
  (keyword_with)
] @keyword

[
  (keyword_else)
] @keyword

[
  (keyword_array)
  (keyword_tuple)
] @type.builtin

[
  (keyword_or)
  (keyword_and)
  (keyword_not)
  (keyword_is)
  (keyword_in)
  (keyword_like)
  (keyword_ilike)
] @keyword.operator

[
  "="
  "!="
  "<"
  "<="
  ">"
  ">="
  "?!="
  "??"
  "?="
  "+"
  "-"
  "*"
  "/"
  "%"
  "^"
  "++"
  "//"
  "~"
  "->"
  ":="
] @operator

[
  "."
  ".<"
  ".>"
  "::"
  "@"
] @punctuation.special

[
  ","
  ":"
  ";"
] @punctuation.delimiter

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket

; Fallback for parser variants where some newer EdgeQL keywords are still tokenized
; as identifiers. Keep this after generic name captures so it can override them.
((identifier) @keyword
  (#is-not? local)
  (#match? @keyword "^(?i:access|allow|database|deferred|deny|exists|extension|filter|global|if|index|intersect|introspect|last|limit|migration|of|optional|order|over|policy|required|restrict|rewrite|role|target|template|union|variadic)$"))

(sdl_type_declaration
  (type_expression
    (type_name
      (name (identifier) @type))))

(sdl_type_declaration
  (type_expression
    (type_name
      (name (quoted_name) @type))))

; Some command-form DDL statements still parse object-kind words as identifiers.
((command_statement
   (command_keyword
     (keyword_create))
   (expression
     (name
       (identifier) @keyword)))
  (#match? @keyword "^(?i:type)$"))

; Override generic fallback captures in declaration contexts where names should
; keep their semantic role even when they spell like keywords.
(sdl_pointer
  name: (name (identifier) @property))

(sdl_pointer
  name: (name (quoted_name) @property))

(sdl_property
  name: (name (identifier) @property))

(sdl_property
  name: (name (quoted_name) @property))

(sdl_assignment
  name: (name (identifier) @property))

(sdl_assignment
  name: (name (quoted_name) @property))

(create_function_statement
  name: (module_qualified_name
    module: (name (identifier) @namespace)))

(create_function_statement
  name: (module_qualified_name
    module: (name (quoted_name) @namespace)))

(parameter
  name: (name (identifier) @variable.parameter))

(parameter
  name: (name (quoted_name) @variable.parameter))

(import_module
  module: (import_path (name (identifier) @namespace)))

(import_module
  module: (import_path (name (quoted_name) @namespace)))

(delete_statement
  (expression
    (module_qualified_name
      module: (name (identifier) @namespace))))

(delete_statement
  (expression
    (module_qualified_name
      module: (name (quoted_name) @namespace))))

(type_expression
  (type_name
    (name (identifier) @type)))

(type_expression
  (type_name
    (name (quoted_name) @type)))

(type_expression
  (type_name
    (module_qualified_name
      module: (name (identifier) @namespace)
      name: (name (identifier) @type))))

(type_expression
  (type_name
    (module_qualified_name
      module: (name (quoted_name) @namespace)
      name: (name (quoted_name) @type))))

(type_expression
  (type_name
    (module_qualified_name
      name: (name (identifier) @type))))

(type_expression
  (type_name
    (module_qualified_name
      name: (name (quoted_name) @type))))

(sdl_link
  name: (name (identifier) @property))

(sdl_link
  name: (name (quoted_name) @property))
