run the mysql database script in `db` directory first. 
  create tables and insert data by `sudo mysql < vwbdb_script.sql`
  or create tables only by `sudo mysql < vwbdb_empty_script.sql`

then run `npm install` and `npm run dev` in `vwbfrontend` and `vmServer` directory to start the service. 
make sure `port 3306` is open for mysql,  
`port 5173` is allocated for frontend,  
and `port 7001` is allocated for backend. 

visit `http://localhost:5173` for the web. 
