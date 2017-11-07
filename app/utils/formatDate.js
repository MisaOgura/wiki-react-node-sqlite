import moment from 'moment'

export const formatDate = (rawDate) => moment(rawDate).format('MMMM Do YYYY, HH:mm')
