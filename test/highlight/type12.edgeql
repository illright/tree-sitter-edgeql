# type12
# <- comment

type RangeTest {
# <- keyword
	required rval: range<int64>;
	# <- keyword
	#               ^ type.builtin
	index pg::gist on (.rval);
	# <- keyword
	#      ^ namespace
	#        ^ punctuation.special
	#          ^ type.builtin
}
