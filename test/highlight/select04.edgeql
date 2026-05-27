# select04
# <- comment

SELECT Foo {
# <- keyword
	bar: {
	# <- property
		baz := (SELECT Doo {foo}),
		# <- property
		spam,
		# <- property
	},
	back_foo := Foo.<foo,
	# <- property
	#        ^ operator
	ham,
	# <- property
};
