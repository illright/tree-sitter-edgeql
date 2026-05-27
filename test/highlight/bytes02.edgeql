# bytes02
# <- comment

b"this is a bytestring";
# <- string
b"this is a 'bytestring'";
# <- string
b"this is a \'bytestring\'";
# <- string
b"this is a \"bytestring\"";
# <- string
b"this \n is \\ a \xbb bytestring";
# <- string
b"this is a bad \xqq \a bytestring я";
# <- string
b"this is a bad bytestring \
";
# <- string
