# call01
# <- comment

type Foo {
# <- keyword
	property avg_rating :=
	# <- keyword
	#        ^ property
	#                   ^ operator
		math::mean(__source__.<movie[IS Review].rating);
		# <- namespace
		#   ^ punctuation.special
		#     ^ function.builtin
		#           ^ variable
}
