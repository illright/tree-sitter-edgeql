# for01
# <- comment

WITH MODULE test
# <- keyword
FOR C IN {Card}
# <- keyword
#      ^ keyword.operator
UNION (C.name, Card.name);
# <- keyword
