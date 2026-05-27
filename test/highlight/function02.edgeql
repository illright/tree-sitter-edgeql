# function02
# <- comment

function some_func($foo: std::int64 = 42) -> std::str {
# <- keyword
#        ^ variable
#                        ^ namespace
#                           ^ punctuation.special
#                             ^ type.builtin
#                                   ^ operator
#                                     ^ number
#                                         ^ operator
#                                                 ^ type.builtin
	from sql "SELECT 'life';";
#         ^ string
}
