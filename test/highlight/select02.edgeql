# select02
# <- comment

SELECT
# <- keyword
	test::User {
	# <- namespace
		id,
		# <- property
	}
FILTER
# <- keyword
	((test::User).score = $val);
