import snscrape.modules.twitter as sntwitter
import json

dados = []
background = ''
id_dia = ''
for i,tweet in enumerate(sntwitter.TwitterSearchScraper('from:WallpaperStarWa').get_items()):
    if i>100:
        break
    dia = str("Dia ")
    if dia in tweet.rawContent:
        dados.append([tweet.media, tweet.rawContent])
        dataImage = str(tweet.media).split("'")
        background = dataImage[3]

        dataText = str(tweet.rawContent).split("\n#")

        with open("tweet.json", "wt") as output:
            data = {
                "tweet_dia": dataText[0],
                "url_image": str(background)
            }
            output.write("{}\n".format(json.dumps(data, indent=4)))