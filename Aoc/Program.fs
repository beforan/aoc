
module DayMatchers =
    let NO_PUZZLE () = printfn "No puzzle found"
    
    let matchDay1 =
        function    | 1 -> printfn "%d" (Day1.Puzzle1.Solve())
                    | _ -> NO_PUZZLE()

module Program =
    open DayMatchers

    let NO_DAY () = printfn "No day found"


    let matchDay day puzzle args =
        match day with
        | 1 -> matchDay1 puzzle
        | _ -> NO_DAY()



    [<EntryPoint>]
    let main args =
        matchDay
            (int args[0])
            (int args[1])
            args[2..]
        0
