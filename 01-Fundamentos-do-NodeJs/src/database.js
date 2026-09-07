import fs from 'node:fs/promises'

const DATABASE_PATH = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(DATABASE_PATH, 'utf-8')
      .then((data) => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database))
  }

  select(table, search) {
    let data = this.#database[table] ?? []

    if (Object.entries(search).length > 0) {
      data = data.filter((row) => {
        return Object.entries(search).find(([key, value]) => {
          return row[key].toUpperCase().includes(value.toUpperCase())
        })
      })
    }

    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  update(table, id, data) {
    if (!Array.isArray(this.#database[table])) {
      return false
    }

    const rowIndex = this.#database[table].findIndex((row) => row.id === id)

    if (rowIndex === -1) {
      return false
    }

    this.#database[table][rowIndex] = { id, ...data }
    this.#persist()
    return true
  }

  delete(table, id) {
    if (!Array.isArray(this.#database[table])) {
      return false
    }

    const rowIndex = this.#database[table].findIndex((row) => row.id === id)

    if (rowIndex === -1) {
      return false
    }

    this.#database[table].splice(rowIndex, 1)
    this.#persist()
    return true
  }
}
