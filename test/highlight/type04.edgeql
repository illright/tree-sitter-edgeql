# type04
# <- comment

type LogEntry extending OwnedObject, Text {
# <- keyword
	required property spent_time to int64;
	# <- keyword
	 #                 ^ property
	 #                                ^ type.builtin
}
