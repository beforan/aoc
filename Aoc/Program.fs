
module DayMatchers =
    let NO_PUZZLE () = printfn "No puzzle found"
    
    let matchDay1 day =
        let input = Helpers.Harness.readInputFile 1
        let intput = (List.map (fun line -> int line) input)
        match day with
            | 1 -> printfn "%d" (Day1.Puzzle1.solve intput)
            | 2 -> printfn "%d" (Day1.Puzzle2.solve intput)
            | _ -> NO_PUZZLE()
    
    let matchDay2 day =
        let input = Helpers.Harness.readInputFile 2
        match day with
            | 1 -> printfn "%d" (Day2.Puzzle1.solve input)
            | 2 -> printfn "%d" (Day2.Puzzle2.solve input)
            | _ -> NO_PUZZLE()

module Program =
    open DayMatchers

    let NO_DAY () = printfn "No day found"


    let matchDay day puzzle args =
        match day with
        | 1 -> matchDay1 puzzle
        | 2 -> matchDay2 puzzle
        | _ -> NO_DAY()



    [<EntryPoint>]
    let main args =
        matchDay
            (int args[0])
            (int args[1])
            args[2..]
        0
