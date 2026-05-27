# scalar01
# <- comment

scalar type constraint_length extending str {
# <- keyword
#      ^ keyword
	constraint max_len_value(16);
	# <- keyword
	#           ^ function.builtin
	constraint max_len_value(10);
	# <- keyword
	#           ^ function.builtin
	constraint min_len_value(5);
	# <- keyword
	#           ^ function.builtin
	constraint min_len_value(8);
	# <- keyword
	#           ^ function.builtin
}
