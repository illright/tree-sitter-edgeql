# create03
# <- comment

CREATE FUNCTION std::len(array<std::anytype>) -> std::int64
# <- keyword
#      ^ keyword
#               ^ namespace
#                  ^ punctuation.special
#                                              ^ operator
	FROM SQL $$
# <- keyword
#    ^ keyword
#        ^ string
		SELECT array_length($1, 1)::bigint
#		<- keyword
	$$;
# <- string
array<std::anytype>;  # back to edgeql
# <- type.builtin
