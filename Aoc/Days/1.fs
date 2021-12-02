namespace Day1

module Puzzle1 =

    type CheckIncreaseState =
        { FirstTime: bool;          Last: int;          Count: int }

    let checkIncrease state value =
        let isIncrease =
            not state.FirstTime && value > state.Last

        let newState =
            { state with
                FirstTime = false
                Last = value }

        match newState with
        | x when isIncrease -> { x with Count = x.Count + 1 }
        | x -> x

    let countIncreases input =
        (List.fold
            checkIncrease
            { Last = 0
              Count = 0
              FirstTime = true }
            input)
            .Count

    let solve input =
        countIncreases input

module Puzzle2 =
    let staggeredSum input n =
        (List.fold
            (fun (sums: list<int>) value ->
                let l = sums[..^(n-1)]
                let m = List.map
                            (fun x -> x + value)
                            sums[^(n-2)..]
                l @ m @ [value])
            []
            input)[..^(n-1)]

    let solve input =
        Puzzle1.countIncreases (staggeredSum input 3)
