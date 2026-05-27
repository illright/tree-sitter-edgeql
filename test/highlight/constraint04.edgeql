# constraint04
# <- comment

type Foo {
# <- keyword
	property bar {
	# <- keyword
	#        ^ property
		constraint math::max();
		# <- keyword
		#           ^ namespace
		#               ^ punctuation.special
		#                 ^ function.builtin
	}
}
