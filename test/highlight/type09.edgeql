# type09
# <- comment

type Person {
# <- keyword
	trigger log_insert after update for each do (
	# <- keyword
		stuff(__new__.id, __old__.id)
		# <- function.call
	);

	trigger log_insert after update for all do (
	# <- keyword
		stuff(__new__.id, __old__.id)
		# <- function.call
	);
}
