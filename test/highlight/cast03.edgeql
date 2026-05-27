# cast03
# <- comment

SELECT Foo.bar LIMIT <int64>'42';
# <- keyword
#              ^ keyword
#                    ^ operator
#                     ^ type.builtin
#                          ^ operator
#                           ^ string
