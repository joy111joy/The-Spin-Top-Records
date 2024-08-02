const Pool = require("pg").Pool;
 
Pool.connect()
  .then(client => {
    return client.query('SELECT * FROM your_table_name')
      .then(result => {
        console.log('Query results:');
        console.log(result.rows);
        client.release();
      })
      .catch(err => {
        client.release();
        console.error('Error executing query', err.stack);
      });
  })
  .catch(err => {
    console.error('Error connecting to the database', err.stack);
  });