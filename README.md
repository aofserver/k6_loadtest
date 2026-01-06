# k6_loadtest

# Install
MacOS
```
brew install k6
```
Windows
`choco install k6` or `winget install k6 --source winget`

# Run Local
```
k6 run script_stress_testing.js
```

# Monitor With Gafana Cloud
*limitation 500 vu/hour
```
k6 cloud login --token <token_gafana>
k6 cloud run script_stress_testing.js
```

# Monitor With Gafana Local
run influxdb
```
docker run -d --name influxdb -p 8086:8086 -e INFLUXDB_DB=k6 influxdb:1.8
```
run grafana
```
docker run -d --name grafana -p 4000:3000 grafana/grafana
```
</br> </br>
Connect Grafana To Influxdb </br>
go to `http://localhost:4000` login gafana `user:admin` `password:admin` </br>
go to `Connections > Data Sources > Add new data source` search `influxdb` </br>
config influxdb and save
```
url : http://host.docker.internal:8086
database : k6
```
</br> </br>
Set Dashboards </br>
go to `Dashboards > New Dashboard > Import dashboard > 2587` </br>
</br> </br>
run
```
k6 run --out influxdb=http://localhost:8086/k6 script_stress_testing.js
```