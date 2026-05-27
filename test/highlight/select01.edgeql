# select01
# <- comment

SELECT
# <- keyword
	test::NamedObject {
		abc,
		# <- property
		defd,
		# <- property
		name: {
		# <- property
			@lang
			# <- punctuation.special
		}
	}
FILTER
# <- keyword
	test::`NamedObject`.name = 'Test';
