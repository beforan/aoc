// tokens
export enum Tokens {
  NoOtherBags,
  BagIdentifier,
  Integer,
  Comma,
  End,
  Contains,
  Whitespace,
}

const tokens = {
  [Tokens.NoOtherBags]: /no other bags/,
  [Tokens.BagIdentifier]: /(?<type>\w+ \w+) bags?/, // TODO: "no other bags
  [Tokens.Integer]: /\d+/,
  [Tokens.Comma]: /,/,
  [Tokens.End]: /\./,
  [Tokens.Contains]: /contains/,
  [Tokens.Whitespace]: /\s+/,
};

// FSM
type Rule = {
  bagId: string;
  contains?: { [key: string]: number };
};

type ParserState = {
  sequence: Tokens[];
  listeners?: { [key: number]: ListenerCallback };
  transitions?: { [key: number]: () => ParserState };
};

type ListenerCallback = () => void;

const init: ParserState = {
  sequence: [
    Tokens.BagIdentifier,
    Tokens.Whitespace,
    Tokens.Contains,
    Tokens.Whitespace,
  ],
  // any missing matchers get thrown away
  listeners: {
    [Tokens.BagIdentifier]: () => {}, // (rule: Rule, match: string) => {
    //  rule.bagId = match;
    // },
  },
  transitions: {
    [Tokens.Integer]: () => bagCount,
    [Tokens.NoOtherBags]: () => noOtherBags,
  },
};

const bagCount: ParserState = {
  sequence: [Tokens.Integer, Tokens.Whitespace, Tokens.BagIdentifier],
  listeners: {
    [Tokens.Integer]: () => {}, // (state: { [key: string]: any }, match: string) => {},
  },
  transitions: {
    [Tokens.Comma]: () => list,
    [Tokens.End]: () => end,
  },
};

const list: ParserState = {
  sequence: [Tokens.Comma, Tokens.Whitespace],
  transitions: { [Tokens.Integer]: () => bagCount },
};

const noOtherBags: ParserState = {
  sequence: [Tokens.NoOtherBags, Tokens.End],
};

const end: ParserState = { sequence: [Tokens.End] };

// we're lucky enough to know that our tokens contain no overlap
// no match for one can be matched by another.
// also since matching is done by regex they're automatically greedy

const testInit: ParserState = {
  sequence: [Tokens.Integer, Tokens.Comma],
  listeners: {
    [Tokens.Integer]: () => console.log("int"),
    [Tokens.Comma]: () => console.log(","),
  },
  transitions: {
    [Tokens.End]: () => end,
  },
};

// TODO: genericise for other token sets and rules states
// TODO: spec listener callback signature
export const parseBagRules = (input: string) => {
  let parserState = testInit;
  const state = {};

  while (true) {
    for (const token of parserState.sequence) {
      // check the token
      const pattern = new RegExp(`^${tokens[token as Tokens].source}`);
      const match = input.match(pattern);
      if (match) {
        // callback for this token
        parserState.listeners?.[token]?.();

        // update the input
        input = input.replace(pattern, "");
      } else throw new Error("Parsing failed, unexpected token");
    }

    // done all tokens; work out where to go next

    // no transitions means end parsing.
    if (!parserState.transitions) break;
    let targetState: ParserState | undefined;

    // else check transitions to determine next parserState
    for (const token of Object.keys(parserState.transitions)) {
      const pattern = new RegExp(
        `^${tokens[parseInt(token) as Tokens].source}`
      );
      const match = input.match(pattern);
      if (match) {
        targetState = parserState.transitions![parseInt(token) as Tokens]();
        break;
      }
    }
    // set next parserState
    if (!targetState) break;
    parserState = targetState;
  }
};

// light red bags contain 1 bright white bag, 2 muted yellow bags.
// const rules = {
//   "light red": {
//     "bright white": 1,
//     "muted yellow": 2,
//   },
// };
