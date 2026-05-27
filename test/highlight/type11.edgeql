# type11
# <- comment

type User {
# <- keyword
	required body: str;
	# <- keyword
	index fts::index on (
	# <- keyword
	#      ^ namespace
	#         ^ punctuation.special
	#                ^ keyword
		fts::with_options(.body,
		# <- namespace
		#   ^ punctuation.special
		#     ^ function.builtin
				language := fts::Language.eng,
				# <- type.builtin
				#           ^ namespace
				weight_category := fts::Weight.A
				# <- property
				#                  ^ namespace
		)
	);
}
