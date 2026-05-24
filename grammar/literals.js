export default {
  constant: $ => choice($.keyword_true, $.keyword_false, $.keyword_empty),

  literal: $ => choice(
    $.float,
    $.decimal,
    $.integer,
    $.raw_string,
    $.string,
    $.bytes,
    $.dollar_string,
  ),

  integer: _ => token(/(?:[1-9](?:[0-9_]*[0-9])?|0)/),

  float: _ => token(/(?:\.(?:[0-9](?:[0-9_]*[0-9])?)|(?:[1-9](?:[0-9_]*[0-9])?|0)(?:\.[0-9](?:[0-9_]*[0-9])?))(?:[eE][+\-]?[0-9](?:[0-9_]*[0-9])?)?/),

  decimal: _ => token(/(?:(?:\.(?:[0-9](?:[0-9_]*[0-9])?))|(?:(?:[1-9](?:[0-9_]*[0-9])?|0)(?:\.[0-9](?:[0-9_]*[0-9])?)?))(?:[eE][+\-]?[0-9](?:[0-9_]*[0-9])?)?n/),

  raw_string: _ => choice(
    token(/r'([^'\\]|\\.)*'/),
    token(/r"([^"\\]|\\.)*"/),
  ),

  string: _ => choice(
    token(/'([^'\\]|\\.)*'/),
    token(/"([^"\\]|\\.)*"/),
  ),

  bytes: _ => choice(
    token(/b'([^'\\]|\\.)*'/),
    token(/b"([^"\\]|\\.)*"/),
  ),

  // Accept both tagged ($tag$...$tag$) and untagged ($$...$$) forms.
  dollar_string: _ => choice(
    token(/\$\$[\s\S]*?\$\$/),
    token(/\$[A-Za-z_][A-Za-z0-9_]*\$[\s\S]*?\$[A-Za-z_][A-Za-z0-9_]*\$/),
  ),
};
