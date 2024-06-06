import requests
import json

# Define the API endpoint
api_url = "https://data.calgary.ca/resource/cchr-krqg.json"

# Send a GET request to the API
response = requests.get(api_url)

# Check if the request was successful
if response.status_code == 200:
    # Parse the JSON response
    data = response.json()

    # Define the output file path
    output_file = "calgary_data.json"

    # Write the data to a JSON file
    with open(output_file, "w") as file:
        json.dump(data, file, indent=4)

    print(f"Data successfully written to {output_file}")
else:
    print(f"Failed to fetch data. Status code: {response.status_code}")
