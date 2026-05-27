# select05
# <- comment

WITH MODULE test
# <- keyword
SELECT User{
# <- keyword
	name,
	# <- property
	owner_of := (
	# <- property
		SELECT User.<owner[IS Issue] {
		# <- keyword
		#                   ^ keyword.operator
			number
			# <- property
		} FILTER <int64>(.number) < 3
	),
} FILTER User.name = 'Elvis';
