# type06
# <- comment

type LogEntry extending OwnedObject, Text {
# <- keyword
	property start_date to datetime {
	# <- keyword
	   default := datetime_current();
	   # <- keyword
	   title := 'Start Date';
	   # <- property
		   #          ^ string
	}
}
