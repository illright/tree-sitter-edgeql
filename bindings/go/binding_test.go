package tree_sitter_edgeql_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_edgeql "github.com/gelstable/gel-editor-plugin/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_edgeql.Language())
	if language == nil {
		t.Errorf("Error loading EdgeQL grammar")
	}
}
