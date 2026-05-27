# for02
# <- comment

WITH MODULE test
# <- keyword
FOR X IN {Card.name, User.name}
# <- keyword
#      ^ keyword.operator
UNION X
# <- keyword
FILTER Card.element = 'Air';
# <- keyword
