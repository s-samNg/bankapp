mongoose.connect('mongodb://localhost:27017', { ssl: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(() => console.log('Erreur with MongoDB connection'));