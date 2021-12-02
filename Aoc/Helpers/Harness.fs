module Helpers.Harness

open System.IO

let readInputFile day =
    let lines =
        File.ReadAllLines(Path.Combine("inputs", $"{day}.txt"))

    Array.toList lines
