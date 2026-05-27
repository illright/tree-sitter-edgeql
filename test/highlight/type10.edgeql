# type10
# <- comment

type User {
# <- keyword
	created: datetime {
		rewrite insert using (datetime_of_statement());
		# <- keyword
	};
	modified: datetime {
		rewrite update using (
		# <- keyword
			datetime_of_statement()
			if __specified__.modified
			# <- keyword
			else .modified
			# <- keyword
		);
	}
}
