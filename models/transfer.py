# transfer.py
from dotenv import load_dotenv
import os
from pymongo import MongoClient
import certifi

load_dotenv()

class Transfer:
    def __init__(self, name, position, old_team, new_team):
        self.name = name
        self.position = position
        self.old_team = old_team
        self.new_team = new_team

    def save(self):
        try:
            # Insert data into MongoDB or perform any other necessary operation
            mongoConnectionString = os.environ.get('MONGODB_CONNECTION_STRING')
            print("MGS", mongoConnectionString)
            client = MongoClient(mongoConnectionString, tlsCAFile=certifi.where())
            print("client", client)
            db = client.PythonCrudApp  # Corrected database name
            print("db", db.name)
            collection = db.Transfers  # Adjusted collection path
            print("cn", collection.name)
            result = collection.insert_one({
                'name': self.name,
                'position': self.position,
                'old_team': self.old_team,
                'new_team': self.new_team
            })
            # After inserting the document
            inserted_id = result.inserted_id
            inserted_document = collection.find_one({ '_id': inserted_id })
            print("inserted doc", inserted_document)
            print('result', result)
            return result.inserted_id
        except Exception as e:
            # Log the error
            print(f"An error occurred while saving data to MongoDB: {e}")
            return None
