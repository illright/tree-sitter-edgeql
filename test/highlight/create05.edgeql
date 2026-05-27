# create05
# <- comment

CREATE FUNCTION test::my_edgeql_func2(std::str)
# <- keyword
#      ^ keyword
		-> sys::Concept
	FROM EdgeQL $$
	# <- keyword
	#    ^ keyword
		SELECT
		# <- keyword
			sys::Concept
			# <- namespace
			#   ^ punctuation.special
			#     ^ type
		FILTER sys::Concept.name = $1
		# <- keyword
	$$;
