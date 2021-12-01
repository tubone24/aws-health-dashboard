import os
import requests
from bs4 import BeautifulSoup

base_url = 'https://status.aws.amazon.com'

blocks = ['AP_block', 'NA_block', 'SA_block', 'EU_block', 'AF_block', 'ME_block']

rss_template = ('<?xml version="1.0" encoding="UTF-8"?>'
                '<rss version="2.0">'
                '  <channel>'
                '    <title><![CDATA[AWS Service Status]]></title>'
                '    <link>http://status.aws.amazon.com/</link>'
                '    <description><![CDATA[AWS Service Status]]></description>'
                '  </channel>'
                '</rss>'
                )

def get_rss_list(block):
    print('start get_rss_list')
    res = requests.get(base_url)
    aws_soup = BeautifulSoup(res.text, 'lxml')

    tables = aws_soup.find(id=block).find_all('table')

    links = []
    for tr in tables[1].find('tbody').find_all('tr'):
        tds = tr.find_all('td')
        links.append({'service': tds[1].text, 'url': tds[3].find('a').get('href')})

    return links

def get_rss_item(rss_url):
    print(rss_url)
    response = requests.get(rss_url)
    return response.text

def add_rss_item(rss_text, rss_path, service_name, output_soup):
    result = []
    rss = BeautifulSoup(rss_text, 'xml')
    items = rss.find_all('item')
    print(items)
    for item in items:
        title = item.find('title')
        pub_date = item.find('pubDate')
        description = item.find('description')
        service_name = item.find('service_name')
        result.append({'title': title, 'pub_date': pub_date, 'description': description, 'service_name': service_name})
    return result

def main():
    for block in blocks:
        print(block)
        output_soup = BeautifulSoup(rss_template, 'xml')
        for rss in get_rss_list(block):
            url = base_url + rss['url']
            text = get_rss_item(url)
            aaa = add_rss_item(text, url, rss['service'], output_soup)
            print(aaa)

main()
