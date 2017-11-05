import path from 'path'
import Sql from 'better-sqlite3'
import moment from 'moment'

const databaseClient = () => {
  const env = process.env.NODE_ENV
  const dbPath = path.join(__dirname, `../db/${env}.db`)

  const insertEntry = (title, content) => {
    const db = new Sql(dbPath)
    const timestamp = moment().format()

    const query = 'INSERT INTO wiki (date_created, date_updated, title, content) VALUES (?, ?, ?, ?)'
    const createEntry = db.prepare(query)
    createEntry.run(timestamp, timestamp, title, content)

    const latestEntry = db.prepare('SELECT * FROM wiki ORDER BY date_created DESC LIMIT 1').get()
    db.close()

    return latestEntry
  }

  const listEntries = () => {
    const db = new Sql(dbPath)
    const query = 'SELECT * FROM wiki ORDER BY datetime(date_created) DESC'
    const entries = db.prepare(query).all()
    db.close()

    return entries
  }

  return {
    insertEntry,
    listEntries
  }
}

export default databaseClient
