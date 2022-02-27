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

  assertNum(2, 'two')
  assertNum(23, 'twenty three')
  assertNum(234, 'two hundred thirty four')
  assertNum(2345, 'two thousand, three hundred forty five')
  assertNum(23456, 'twenty three thousand, four hundred fifty six')
  assertNum(234567, 'two hundred thirty four thousand, five hundred sixty seven')
  assertNum(2345678, 'two million, three hundred forty five thousand, six hundred seventy eight')
  assertNum(23456789, 'twenty three million, four hundred fifty six thousand, seven hundred eighty nine')
  assertNum(234567890, 'two hundred thirty four million, five hundred sixty seven thousand, eight hundred ninety')

  t.throws(() => numWords(1e15))

  t.end()
})
