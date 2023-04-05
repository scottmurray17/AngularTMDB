import os
import json
import requests

API_KEY = os.environ.get('TMDB_KEY')
ALLOWED_ORIGINS = ['http://localhost:4200', 'https://scottmurray17.github.io']

def lambda_handler(event, context):
  try:
    if not event['headers']['origin'] in ALLOWED_ORIGINS: raise 'INVALID ORIGIN'

    searchType = None
    if event['resource'] == '/movie/{id+}': searchType = 'movie'
    elif event['resource'] == '/person/{id+}': searchType = 'person'
    elif event['resource'] == '/show/{id+}': searchType = 'tv'
    else: raise 'INVALID RESOURCE'

    index = event['pathParameters']['id']
    objectRequest = requests.get(f'https://api.themoviedb.org/3/{searchType}/{index}?api_key={API_KEY}')
    tmdbObject = objectRequest.json()

    response = None
    if objectRequest.status_code != 200:
      response = {'message': tmdbObject['status_message']}
    elif searchType == 'movie':
      cast = requests.get(f'https://api.themoviedb.org/3/{searchType}/{index}/credits?api_key={API_KEY}').json()
      if not 'cast' in cast: cast['cast'] = []
      response = {
        'backdrop_path': tmdbObject['backdrop_path'],
        'budget': tmdbObject['budget'],
        'genres': list(map(lambda genre: genre['name'], tmdbObject['genres'])),
        'homepage': tmdbObject['homepage'],
        'imdb_id': tmdbObject['imdb_id'],
        'original_language': tmdbObject['original_language'],
        'overview': tmdbObject['overview'],
        'popularity': tmdbObject['popularity'],
        'poster_path': tmdbObject['poster_path'],
        'release_date': tmdbObject['release_date'],
        'revenue': tmdbObject['revenue'],
        'runtime': tmdbObject['runtime'],
        'status': tmdbObject['status'],
        'tagline': tmdbObject['tagline'],
        'title': tmdbObject['title'],
        'vote_average': tmdbObject['vote_average'],
        'vote_count': tmdbObject['vote_count'],
        'cast': list(map(lambda person: {'id': person['id'], 'name': person['name'], 'character': person['character'], 'profile_path': person['profile_path']}, cast['cast'])),
      }
    else: response = tmdbObject

    return {
      'statusCode': objectRequest.status_code,
      'body': json.dumps(response),
      'headers': {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': event['headers']['origin'],
        "Access-Control-Allow-Methods": "GET"
      }
    }


  except Exception as e:
    print(e)
    return {
      'statusCode': 500,
      'headers': {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': event['headers']['origin'],
        "Access-Control-Allow-Methods": "GET"
      }
    }
