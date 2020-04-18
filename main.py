
import argparse
import os
import csv
from bs4 import BeautifulSoup
import requests
import json

from dotenv import load_dotenv
load_dotenv()



def insert_into_db(data):
    endpoint = os.getenv("DB_URL")
    token = os.getenv("DB_AUTH_TOKEN")
    headers = {"Authorization": f"Bearer {token}"}
    print(requests.post(endpoint, data=json.dumps(data)).json())


def find_url_with_image_for_word(word):
    url = 'https://www.google.com/search?q=' + word + '&client=opera&hs=cTQ&source=lnms&tbm=isch&sa=X&ved=0ahUKEwig3LOx4PzKAhWGFywKHZyZAAgQ_AUIBygB&biw=1920&bih=982'
    page = requests.get(url).text
    soup = BeautifulSoup(page, 'html.parser')

    for raw_img in soup.find_all('img'):
        link = raw_img.get('src')
        if link is not None and link.startswith("http"):
            return link

# Driver Code

if __name__ == "__main__":
    # Parse the arguments
    ap = argparse.ArgumentParser()
    ap.add_argument("-i", "--input", help = "Path of csv file", required = True)
    args = vars(ap.parse_args())

    csv_path = args["input"]

    # Check if csv exists
    if not os.path.exists(csv_path):
        print(f"CSV Path does not exist. Please check.")
        os.system.exit(1)
    
    # Read each line from csv
    with open(csv_path, "r") as csv_file_handle:
        csvreader = csv.reader(csv_file_handle)
        # Skip the header
        next(csvreader)
        for row in csvreader:
            if row[0] in (None, ""):
                continue
            # Words are ; delimited and original word is equal to (=) delimited
            # For each word, search and find the url pointing to the image 
            # Append each URLS and keep adding to a list
            # For the original word, search and find the url pointing to the image
            complete_words_list = row[0].split("=")
            words_part_of_question = complete_words_list[0].split(";")
            question_category = row[1]
            original_word = complete_words_list[1]
            word_urls = list(map(find_url_with_image_for_word, words_part_of_question))
            answer_url = find_url_with_image_for_word(original_word)
            data = {
                "word_urls": word_urls,
                "answer_url": answer_url,
                "category": question_category,
                "actual_word": original_word
            }
            # Frame the JSON to be posted for firebase
            insert_into_db(data)



    