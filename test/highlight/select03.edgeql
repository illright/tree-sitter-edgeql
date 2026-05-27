# select03
# <- comment

SELECT
# <- keyword
	mod2::Person {
	# <- namespace
	#   ^ punctuation.special
		id,
		# <- property
		name,
		# <- property
		groups: {
		# <- property
			id,
			# <- property
			name,
			# <- property
		}
	};
