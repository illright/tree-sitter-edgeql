# type05
# <- comment

type LogEntry extending OwnedObject, Text {
# <- keyword
	property start_date := (SELECT std::datetime_current());
	# <- keyword
	#         ^ property
	#                    ^ operator
	#                        ^ keyword
}
