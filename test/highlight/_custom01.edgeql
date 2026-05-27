# _custom01
# <- comment

WITH MODULE schema
# <- keyword
#    ^ keyword
#           ^ keyword
		SELECT ObjectType {
		# <- keyword
		#      ^ variable
			name,
			# <- property
			annotations: { name, @value },
			# <- property
			# 						 ^ property
			# 						       ^ property
			pointers: {
			# <- property
				name,
				# <- property
				annotations: { name, @value }
				# <- property
			} filter .name != "__type__" and .name != 'id'
			# ^ keyword
			#         ^ variable
			#                 ^ string
			#                                         ^ string
		}
