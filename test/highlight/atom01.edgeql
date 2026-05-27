# atom01
# <- comment

scalar basic extending int64 {
# <- keyword
#            ^ keyword
#                      ^ type.builtin
	title := 'Basic Atom';
	# <- property
	#     ^ operator
	#        ^ string
	default := 2;
	# <- keyword
	#       ^ operator
	#          ^ number

	constraint min(0);
	# <- keyword
	#          ^ function.builtin
	#              ^ number
	constraint max(123456);
	# <- keyword
	#          ^ function.builtin
	#              ^ number
	delegated constraint expr on (__subject__ % 2 = 0);
	# <- keyword
	#                    ^ function.builtin
	#                             ^ variable
}
