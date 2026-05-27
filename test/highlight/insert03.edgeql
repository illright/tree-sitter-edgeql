# insert03
# <- comment

WITH MODULE test
# <- keyword
INSERT InsertTest {
# <- keyword
	name := 'insert nested 2',
	# <- variable
	l2 := 0,
	# <- variable
	subordinates := (
	# <- variable
		SELECT Subordinate {
		# <- keyword
			@comment := (SELECT 'comment ' + Subordinate.name)
		}
		FILTER Subordinate.name IN {'subtest 3', 'subtest 4'}
		# <- keyword
	)
};
