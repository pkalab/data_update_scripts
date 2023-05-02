
#!/bin/bash

# Iterate through each line in the CSV file
while read -r id
do
  # Use the variable as input for your curl command
  curl -X GET --verbose "https://clouudfront/client/record/$id" --header 'Accept: application/json' --header 'Content-Type: application/json' --header 'Origin: URL' --header 'Accept-Language: en-us' --header 'Host: API_URL' --header 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Safari/605.1.15' --header 'Referer: URL' --header 'Accept-Encoding: gzip, deflate, br' --header 'Connection: keep-alive' --header 'token: token' --header 'x-api-key: api-key' | jq '{meta_id: .data.meta_id, financials: .data.financials[]}'

done < geeinput_fix.csv
