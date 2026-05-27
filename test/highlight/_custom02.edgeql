# _custom02
# <- comment

using extension auth;
# <- keyword
#     ^ keyword

module default {
# <- keyword
	type Card {
	# <- keyword
		required order: int64;
		# <- keyword
		#        ^ property
		#               ^ type.builtin
		required front: str {
			annotation title := "Front side";
			annotation description := "Will be shown when reviewing the card.";
		};
		required back: str {
			annotation title := "Back side";
			annotation description := "Will be shown after you try to recall the front side.";
		};
		multi tags: card_internal::Tag;

		annotation substance::use_as_title := "front";

		access policy authenticated_user_has_full_access
		# <- keyword
		#      ^ keyword
			allow all
			# <- keyword
			#     ^ keyword
			using (exists global ext::auth::ClientTokenIdentity) {
			# <- keyword
			#      ^ keyword
				errmessage := "Only authenticated users can access this collection.";
				# <- property
				#             ^ string
			}
	};

	type Deck {
	# <- keyword
		required name: str;
		# <- keyword
		description: str {
			annotation substance::editor := "rich";
		};
		multi cards: Card {
			constraint exclusive;
			# <- keyword
			#          ^ function.builtin
			on target delete allow;
			# <- keyword
			#  ^ keyword
			#         ^ keyword
		};

		access policy authenticated_user_has_full_access
			allow all
			using (exists global ext::auth::ClientTokenIdentity) {
				errmessage := "Only authenticated users can access this collection.";
			}
	};
};

module card_internal {
# <- keyword
	type Tag {
	# <- keyword
		required slug: str;
		required name: str;
		required order: int32;

		annotation substance::use_as_order := "order";
	};
};
