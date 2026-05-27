# ddl_function01
# <- comment

CREATE FUNCTION test::call1(
# <- keyword
#      ^ keyword
#                ^ namespace
#                    ^ punctuation.special
	s: str,
	# <- variable.parameter
	#  ^ type.builtin
	VARIADIC a: int64,
	# <- keyword
	#        ^ variable.parameter
	#           ^ type.builtin
	NAMED ONLY suffix: str = '-suf',
	# <- keyword
	#      ^ keyword
	#          ^ variable.parameter
	#                  ^ type.builtin
	#                      ^ operator
	#                        ^ string
) -> std::str
#    ^ namespace
#       ^ punctuation.special
#         ^ type.builtin
	FROM EdgeQL $$
	# <- keyword
	#     ^ keyword
		SELECT 'foo';
		# <- keyword
		#       ^ string
	$$;
