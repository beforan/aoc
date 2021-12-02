module Tests

open System
open Xunit
open Day1.Puzzle1

let p1_input =
    [ 199
      200
      208
      210
      200
      207
      240
      269
      260
      263 ]

[<Fact>]
let ``Puzzle 1 countIncreases`` () =
    let actual = countIncreases p1_input
    Assert.Equal(7, actual)
