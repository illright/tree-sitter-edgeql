# function03
# <- comment

function myfunc($arg1: str, $arg2: str = 'DEFAULT',
# <- keyword
#        ^ variable
#                      ^ type.builtin
#                                  ^ type.builtin
#                                      ^ operator
#                                        ^ string
				variadic $arg3:std::int64) -> set of int64 {
#   ^ keyword
#                  ^ namespace
#                     ^ punctuation.special
#                       ^ type.builtin
#                              ^ operator
#                                 ^ keyword
#                                     ^ keyword
#                                        ^ type.builtin
	volatile := true;
#         ^ operator
#            ^ boolean
	description := 'myfunc sample';
#            ^ operator
#               ^ string
	from sql $$SELECT blarg;$$;
#         ^ string
}
