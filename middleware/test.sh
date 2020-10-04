curl "http://localhost:3000/profile"

curl -H "Content-Type: application/json" -X POST -d '{"firstname":"Jane", "lastname": "Si"}' "http://localhost:3000/profile"
sleep 1

curl -H "Content-Type: application/json" -X PUT -d '{"firstname":"Ada", "lastname": "Wu"}' "http://localhost:3000/profile"
sleep 1

curl "http://localhost:3000/profile"
sleep 1

curl -X DELETE "http://localhost:3000/profilecurl -H 