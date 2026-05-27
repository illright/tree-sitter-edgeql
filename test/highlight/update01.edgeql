# update01
# <- comment

WITH MODULE test
# <- keyword
UPDATE UpdateTest
# <- keyword
FILTER UpdateTest.name = 'update-test1'
# <- keyword
SET {
# <- keyword
	status := (SELECT Status FILTER Status.name = 'Closed')
	#           ^ keyword
};
