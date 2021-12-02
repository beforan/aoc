namespace Day2

module Puzzle1 =

    type SubPosition =
        { X: int;        Depth: int}
    
    let empty = {X= 0; Depth    =    0}

    let parseDirection (direction: string) =
        let tokens = direction.Split(" ")
        match tokens[0] with
            | dir when dir = "forward" -> { empty with X= int tokens[1]}
            | dir when dir = "down" -> {empty with Depth = int tokens[1]}
            | dir when dir = "up" -> {empty with Depth = (int tokens[1]) * -1}
            | _ -> empty

    let getRelativePos (directions: list<string>) =
        List.fold
            (fun state value ->
                let delta = parseDirection value
                { X = state.X + delta.X; Depth = state.Depth + delta.Depth})
            empty
            directions
    
    let solve input =
        let pos = getRelativePos input
        pos.X * pos.Depth

module Puzzle2 =

    type SubPosition =
        { X: int; Aim: int; Depth: int}
    
    let empty = {X= 0; Depth =0; Aim =0}

    let parseDirection (direction: string) =
        let tokens = direction.Split(" ")
        match tokens[0] with
            | dir when dir = "forward" -> { empty with X= int tokens[1]; }
            | dir when dir = "down" -> {empty with Aim = int tokens[1]}
            | dir when dir = "up" -> {empty with Aim = (int tokens[1]) * -1}
            | _ -> empty

    let getRelativePos (directions: list<string>) =
        List.fold
            (fun state value ->
                let delta = parseDirection value

                { X = state.X + delta.X;
                Depth = state.Depth + (state.Aim * delta.X);
                Aim = state.Aim + delta.Aim})
            empty
            directions
    
    let solve input =
        let pos = getRelativePos input
        pos.X * pos.Depth