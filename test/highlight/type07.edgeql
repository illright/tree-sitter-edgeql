# type07
# <- comment

type Issue extending foo.bar::NamedObject, Text {
# <- keyword
	multi link watchers to User;
	# <- keyword
	 #      ^ keyword
	required single link owner to User;
	# <- keyword
}
