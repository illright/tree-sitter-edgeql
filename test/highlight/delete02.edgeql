# delete02
# <- comment

WITH MODULE test
# <- keyword
DELETE (SELECT DeleteTest
# <- keyword
#        ^ keyword
	FILTER DeleteTest.name = 'bad name');
	# <- keyword
