# create04
# <- comment

CREATE FUNCTION std::len(array<std::anytype>) -> std::int64
# <- keyword
#      ^ keyword
#                                              ^ operator
	FROm Sql $a$
# <- keyword
#    ^ keyword
#        ^ string
		SELECT array_length($1, 1)::bigint
#		<- keyword
	$a$;
# <- string
array<std::anytype>;  # back to edgeql
# <- type.builtin
