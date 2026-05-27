# type03
# <- comment

abstract type Text {
# <- keyword
	required property body to std::str {
	# <- keyword
		constraint maxlength(10000);
		# <- keyword
			 #                     ^ number
	}
}
