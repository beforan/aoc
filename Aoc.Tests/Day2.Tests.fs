module Day2Tests

open Xunit
open Day2

let p1_input =
    [ "forward 5"
      "down 5"
      "forward 8"
      "up 3"
      "down 8"
      "forward 2" ]

[<Fact>]
let ``Puzzle 1 getRelativePos`` () =
    let actual = Puzzle1.getRelativePos p1_input
    Assert.Equal(15, actual.X)
    Assert.Equal(10, actual.Depth)

[<Fact>]
let ``Puzzle 2 getRelativePos`` () =
    let actual = Puzzle2.getRelativePos p1_input
    Assert.Equal(15, actual.X)
    Assert.Equal(60, actual.Depth)
