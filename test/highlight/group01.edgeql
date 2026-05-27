# group01
# <- comment

WITH MODULE test
# <- keyword
GROUP User
# <- keyword
USING _ := User.name
# <- keyword
BY _
# <- keyword
INTO User
# <- keyword
UNION count(User.<owner);
# <- keyword
