import requests

url = "https://jsonplaceholder.typicode.com/posts?userId=3"

try:
    response = requests.get(url)

    if response.status_code == 200:
        posts = response.json()

        for post in posts:
            print(post["title"].upper())

        print(f"\nTotal posts: {len(posts)}")

    else:
        print(f"Error: Received status code {response.status_code}")

except requests.exceptions.RequestException as e:
    print(f"Request failed: {e}")