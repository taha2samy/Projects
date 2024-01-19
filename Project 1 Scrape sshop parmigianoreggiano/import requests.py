import requests
from bs4 import BeautifulSoup
import pandas as pd
import re
id=1
columns = ["price", "weight", "eu_ber_kg","title1","title2"]
df = pd.DataFrame(columns=columns)

start_page = 1
end_page =5
path_to_save = r"C:\Users\Taha\Desktop\New folder (8)\outputfile.csv" #path
url =r"https://shop.parmigianoreggiano.com/it/shop.html?p"
def move_on_url(n):
    global url
    url = url+f"{n}"
    response = requests.get(url)
    html_content = response.content

    soup = BeautifulSoup(html_content, 'html.parser')
    cards = soup.select("li.item.product.product-item")

    for i in range(len(cards)):
        price = select_one(cards,i,".price") 
        weight = select_one(cards,i,".formato-peso")
        eu_kg = select_one(cards,i,".prezzo-kg") or {}
        title1 = select_one(cards,i,".nome-caseificio span")
        title2 =select_one(cards,i,".product-item-link")
        add_row_in_csv(price,weight,eu_kg,title1,title2)
def select_one(cards,i,selector):
    try:
        text = cards[i].select_one(selector).text
        return text
    except:
        return " "
def add_row_in_csv(price,weight,eu_ber_kg,title1,title2):
    global id
    print([price, weight, eu_ber_kg,title1,title2])
    price = re.sub(r'\D', '', price)
    weight = re.sub(r'\D', '', weight)
    eu_ber_kg = re.sub(r'\D', '', eu_ber_kg)
    df.loc[int(id)] = [price, weight, eu_ber_kg,title1,title2]
    id=id+1
for page in range(start_page, end_page + 1):
    move_on_url(page)

df.to_csv(path_to_save)

