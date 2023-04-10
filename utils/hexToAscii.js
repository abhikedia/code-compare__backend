function hexAndAsciiToString(input) {
  let output = "";
  let hex = "";

  for (let i = 0; i < input.length; i++) {
    const char = input.charAt(i);

    if (char === "\\") {
      if (hex) {
        output += hexToString(hex);
        hex = "";
      }
      if (input.charAt(i + 1) === "x") {
        i++;
        if (i + 2 >= input.length) {
          throw new Error("Invalid input: incomplete hex escape sequence");
        }
        const hexDigits = input.substr(i + 1, 2);
        const asciiChar = hexToString(hexDigits);
        output += asciiChar;
        i += 2;
      } else {
        output += "\\";
      }
    } else {
      if (!hex) {
        output += char;
      } else {
        hex += char;
      }
    }
  }

  if (hex) {
    output += hexToString(hex);
  }

  return output;
}

function hexToString(hex) {
  return String.fromCharCode(parseInt(hex, 16));
}

module.exports = hexAndAsciiToString;
