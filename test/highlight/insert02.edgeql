# insert02
# <- comment

INSERT test::InsertTest {
# <- keyword
	name := 'insert nested',
	# <- variable
	l2 := 0,
	# <- variable
	#     ^ number
	subordinates := (
	# <- variable
		SELECT test::Subordinate
		# <- keyword
		FILTER test::Subordinate.name LIKE 'subtest%'
		# <- keyword
	)
};
