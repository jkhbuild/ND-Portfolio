export type TextSegment = {
  text: string;
  marked: boolean;
};

export function splitEmphasis(input: string): TextSegment[] {
  return splitDelimitedText(input, "{{", "}}");
}

export function splitHighlight(input: string, phrase: string): TextSegment[] {
  if (!phrase) return [{ text: input, marked: false }];

  const index = input.indexOf(phrase);
  if (index === -1) return [{ text: input, marked: false }];

  return [
    { text: input.slice(0, index), marked: false },
    { text: phrase, marked: true },
    { text: input.slice(index + phrase.length), marked: false },
  ].filter((segment) => segment.text.length > 0);
}

function splitDelimitedText(input: string, startToken: string, endToken: string): TextSegment[] {
  const segments: TextSegment[] = [];
  let cursor = 0;

  while (cursor < input.length) {
    const start = input.indexOf(startToken, cursor);
    if (start === -1) {
      segments.push({ text: input.slice(cursor), marked: false });
      break;
    }

    const end = input.indexOf(endToken, start + startToken.length);
    if (end === -1) {
      segments.push({ text: input.slice(cursor), marked: false });
      break;
    }

    if (start > cursor) {
      segments.push({ text: input.slice(cursor, start), marked: false });
    }

    segments.push({
      text: input.slice(start + startToken.length, end),
      marked: true,
    });
    cursor = end + endToken.length;
  }

  return segments.filter((segment) => segment.text.length > 0);
}
