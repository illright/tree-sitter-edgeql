# constraint02
# <- comment

abstract constraint maxlength($param:any) extending max_value, len_value {
# <- keyword
#         ^ keyword
	errmessage := '{$subject} must be no longer than {$param} characters.';
	# <- property
}
