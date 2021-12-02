module Day1Tests

open System
open Xunit
open Day1

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
    let actual = Puzzle1.countIncreases p1_input
    Assert.Equal(7, actual)

[<Fact>]
let ``Puzzle 2 solve`` () =
    let actual = Puzzle2.solve p1_input
    Assert.Equal(5, actual)


[<Fact>]
let ``Puzzle 2 staggeredSum`` () =
    let actual = Puzzle2.staggeredSum p1_input 3

    let expected =
        [ 607
          618
          618
          617
          647
          716
          769
          792 ]

    Assert.Equal<list<int>>(expected, actual)
