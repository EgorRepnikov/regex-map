module.exports = class RegexMap {

  constructor() {
    this.patterns = new Set()
    this.values = []
  }

  put(pattern, value) {
    this.patterns.add(pattern)
    this.values.push(value)
  }

  getByPattern(pattern) {
    let index = 0
    for (const p of this.patterns) {
      if (pattern === p) {
        return this.values[index]
      }
      index++
    }
  }

  get(string) {
    let index = 0
    for (const pattern of this.patterns) {
      const matches = pattern.exec(string)
      if (matches !== null) {
        return {
          matches,
          value: this.values[index]
        }
      }
      index++
    }
  }

  merge(...maps) {
    for (const map of maps) {
      for (const [pattern, value] of map) {
        this.patterns.add(pattern)
        this.values.push(value)
      }
    }
  }

  keys() {
    const patternsIterator = this.patterns.values()
    return {
      next() {
        const currentPattern = patternsIterator.next()
        if (currentPattern.done) {
          return { done: true }
        } else {
          return { value: currentPattern.value }
        }
      }
    }
  }

  values() {
    const valuesIterator = this.values.values()
    return {
      next() {
        const currentValue = valuesIterator.next()
        if (currentValue.done) {
          return { done: true }
        } else {
          return { value: currentValue.value }
        }
      }
    }
  }

  entries() {
    const patternsIterator = this.patterns.values()
    const valuesIterator = this.values.values()
    return {
      next() {
        const currentPattern = patternsIterator.next()
        if (currentPattern.done) {
          return { done: true }
        } else {
          return { value: [currentPattern.value, valuesIterator.next().value] }
        }
      }
    }
  }

  [Symbol.iterator]() {
    return this.entries()
  }
}
