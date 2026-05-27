# constraint03
# <- comment

abstract constraint max($param:any) on (()) {
# <- keyword
#         ^ keyword
	expr := __subject__ <= $param;
	# <- property
	errmessage := 'Maximum allowed value for {subject} is {param}.';
	# <- property
}
