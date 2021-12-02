namespace Day1

module Puzzle1 =
    type CheckIncreaseAccumulator =
        { FirstTime: bool
          Last: int
          Count: int }

    let checkIncrease state value =
        if not state.FirstTime && value > state.Last then
            { Last = value
              Count = state.Count + 1
              FirstTime = false }
        else
            { state with
                Last = value
                FirstTime = false }

    let countIncreases input =
        (List.fold
            checkIncrease
            { Last = 0
              Count = 0
              FirstTime = true }
            input)
            .Count

    let Solve () =
        (countIncreases (Helpers.Harness.readInputFile 1))

module Puzzle2 =
    let staggeredSum x = x
