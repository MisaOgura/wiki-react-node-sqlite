import path from 'path'
import Sql from 'better-sqlite3'

const databaseClient = () => {
  const env = process.env.NODE_ENV

  const insertEntry = (title, content, timestamp) => {
    const db = new Sql(path.join(__dirname, `../../db/${env}.db`))
    const query = 'INSERT INTO wiki (date_created, date_updated, title, content) VALUES (?, ?, ?, ?)'
    const createEntry = db.prepare(query)
    createEntry.run(timestamp, timestamp, title, content)

    const latestEntry = db.prepare('SELECT * FROM wiki ORDER BY date_created DESC LIMIT 1').get()
    db.close()

    return latestEntry
  }

  const listEntries = () => {
    const db = new Sql(path.join(__dirname, `../../db/${env}.db`))
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
