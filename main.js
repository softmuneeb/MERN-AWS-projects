// why are you writing code here? explain from step 1 to end.

function reverseLetters(S) {
  let reversed = ''
  let letters = []

  // Loop through string S
  for (let i = 0; i < S.length; i++) {
    let char = S[i]

    // If the character is a letter, add it to the letters array
    if (/[a-zA-Z]/.test(char)) {
      letters.push(char)
    }
  }

  // Loop through string S again
  for (let i = 0; i < S.length; i++) {
    let char = S[i]

    // If the character is a letter, add the last letter from the letters array to the reversed string
    if (/[a-zA-Z]/.test(char)) {
      reversed += letters.pop()
    } else {
      // If the character is not a letter, add it to the reversed string
      reversed += char
    }
  }

  return reversed
}

console.log(reverseLetters('ab-cd'))
console.log(reverseLetters('!@a!bC01d'))
