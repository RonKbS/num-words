const { test, only } = require('tap')

const numWords = require('.')

only('test playground', (t) => {
  t.end()
})

test('Should convert numbers to words correctly', (t) => {
  const assertNum = (num, words) => {
    t.equal(numWords(num), words)
  }

  assertNum(1, 'one')
  assertNum(12, 'twelve')
  assertNum(123, 'one hundred twenty three')
  assertNum(1234, 'one thousand, two hundred thirty four')
  assertNum(12345, 'twelve thousand, three hundred forty five')
  assertNum(123456, 'one hundred twenty three thousand, four hundred fifty six')
  assertNum(1234567, 'one million, two hundred thirty four thousand, five hundred sixty seven')
  assertNum(12345678, 'twelve million, three hundred forty five thousand, six hundred seventy eight')
  assertNum(123456789, 'one hundred twenty three million, four hundred fifty six thousand, seven hundred eighty nine')
  assertNum(1300099010900, 'one trillion, three hundred billion, ninety nine million, ten thousand, nine hundred')

  t.throws(() => numWords(1e15))

  t.end()
})
