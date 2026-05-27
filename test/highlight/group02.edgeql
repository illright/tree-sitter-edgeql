# group02
# <- comment

WITH MODULE test
# <- keyword
GROUP Issue
# <- keyword
USING B :=  Issue.status.name
# <- keyword
BY B
# <- keyword
INTO Issue
# <- keyword
UNION _ := (
# <- keyword
	sum := sum(<int64>Issue.number),
	status := B,
)
FILTER
# <- keyword
	_.sum > 5
ORDER BY
# <- keyword
	B;
