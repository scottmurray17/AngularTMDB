import os
import json
import requests

API_KEY = os.environ.get('TMDB_KEY')

def lambda_handler(event, context):
  try:

    movieId = event['pathParameters']['movieId']
    movieResponse = requests.get(f'https://api.themoviedb.org/3/movie/{movieId}?api_key={API_KEY}')

    return {
      'statusCode': movieResponse.status_code,
      'body': json.dumps(movieResponse.json()),
      'headers': {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        "Access-Control-Allow-Methods": "GET"
      }
    }


  except Exception as e:
    return {
      'statusCode': 500,
      'headers': {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        "Access-Control-Allow-Methods": "GET"
      }
    }

