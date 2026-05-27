# create02
# <- comment

CREATE AGGREGATE std::array_agg(SET OF std::anytype) -> array<std::anytype>
# <- keyword
#      ^ keyword
#                ^ namespace
#                   ^ punctuation.special
#                     ^ function.builtin
#                               ^ keyword
#                                   ^ keyword
#                                                    ^ operator
#                                                       ^ type.builtin
	FROM SQL AGGREGATE 'array_agg';
	# <- keyword
	#     ^ keyword
	#         ^ keyword
	#                   ^ string
