import XCTest
import SwiftTreeSitter
import TreeSitterEdgeql

final class TreeSitterEdgeqlTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_edgeql())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading EdgeQL grammar")
    }
}
