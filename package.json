{
  "dependencies": {
    "express": "^4.18.1",
    "jest": "^29.0.3",
    "pg": "^8.8.0",
    "sequelize": "^6.23.2"
  },
  "devDependencies": {
    "eslint": "^8.24.0",
    "prettier": "^2.7.1",
    "sequelize-cli": "^6.5.1",
    "supertest": "^6.2.4"
  },
  "scripts": {
    "pretest": "NODE_ENV=test npx sequelize-cli db:drop && NODE_ENV=test npx sequelize-cli db:create",
    "test": "NODE_ENV=test jest --json --outputFile=results.json --detectOpenHandles --forceExit"
  }
}
