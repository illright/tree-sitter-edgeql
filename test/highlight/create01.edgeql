# create01
# <- comment

CreatE CONSTRAINT std::regexp EXTENDING std::constraint {
# <- keyword
#       ^ keyword
	SET errmessage := 'invalid {subject}';
	# <- keyword
	SET expr := re_test(subject, $0);
	# <- keyword
};
