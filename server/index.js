const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors()); // Allow cross-origin requests

// Mock data for the purpose of this example.
const articles = {
    "After Kevin McCarthy's ousting, who might replace him as US House Speaker?": {
        "url": "https://www.bbc.com/news/world-us-canada-67004970",
        "source": "www.bbc.com",
        "subjectivity_score": 0.7905569429944579,
        "sentiment_score": 0.00019232097479474308,
        "category": "Politics"
    },
    "ChatGPT chief warns of some 'superhuman' skills AI could develop": {
        "url": "https://www.foxnews.com/us/chatgpt-chief-warns-superhuman-skills-ai-develop",
        "source": "www.foxnews.com",
        "subjectivity_score": 0.4870962776281843,
        "sentiment_score": 0.01966024995120176,
        "category": "Technology"
    },
    "Connor Stalions and Michigan alleged cheating scandal: Timeline and everything fans need to know": {
        "url": "https://www.foxnews.com/sports/connor-stalions-michigan-alleged-cheating-scandal-timeline-everything-fans-need-know",
        "source": "www.foxnews.com",
        "subjectivity_score": 0.7873128751436935,
        "sentiment_score": -0.24030326619792555,
        "category": "Sports"
    },
    "Cutting-edge AI raises fears about risks to humanity. Are tech and political leaders doing enough?": {
        "url": "https://apnews.com/article/artificial-intelligence-risks-uk-summit-regulation-ce89e842a176e55e46b6cc493cd515a5",
        "source": "apnews.com",
        "subjectivity_score": 0.5592328515714484,
        "sentiment_score": -0.2111147784902087,
        "category": "Technology"
    },
    "How Microsoft\"s AI is making a mess of the news": {
        "url": "https://www.cnn.com/2023/11/02/tech/microsoft-ai-news/index.html",
        "source": "www.cnn.com",
        "subjectivity_score": 0.6366157145585569,
        "sentiment_score": -0.1646835093760126,
        "category": "Technology"
    },
    "Kevin McCarthy has been ousted as speaker of the House. Here's what happens next.": {
        "url": "https://www.cbsnews.com/news/kevin-mccarthy-removed-house-speaker-what-happens-next/",
        "source": "www.cbsnews.com",
        "subjectivity_score": 0.45815291302777444,
        "sentiment_score": -0.18142929537917843,
        "category": "Politics"
    },
    "Michigan Sign-Stealing Scandal Faces NCAA Ahead of Courts": {
        "url": "https://sports.yahoo.com/michigan-sign-stealing-scandal-faces-153916190.html?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAAB4IQSzMVx-dfA5XG4bQD0JUuaBhHTS4ngwuN-bQ3QRrqc9KBcau7NkgewJy6yYc1gxIRnoV-HX0RKscSb6hFdq-EgfYUCR9zndBQQ5l0LUIuXqiN0eghNEDk1XIDTEAamyOl0XyJ7WWhz_BTShaOyjkRRSNUl_XAHDdaSCiVtzi",
        "source": "sports.yahoo.com",
        "subjectivity_score": 0.4924031753308173,
        "sentiment_score": -0.21223475357152569,
        "category": "Sports"
    },
    "Microsoft AI Publishes Fake News on MSN, Angers 'The Guardian'": {
        "url": "https://www.entrepreneur.com/business-news/microsoft-ai-publishes-fake-news-on-msn-angers-the/464775",
        "source": "www.entrepreneur.com",
        "subjectivity_score": 0.5365058158582008,
        "sentiment_score": -0.42036243111739424,
        "category": "Technology"
    },
    "NCAA at Michigan for sign-stealing investigation, sources say": {
        "url": "https://www.espn.com/college-football/story/_/id/38750516/ncaa-michigan-sign-stealing-investigation-sources-say",
        "source": "www.espn.com",
        "subjectivity_score": 0.5178461192198874,
        "sentiment_score": -0.0017241555447004703,
        "category": "Sports"
    },
    "No. 2 Michigan suspends staffer after NCAA launches investigation into allegations of sign-stealing": {
        "url": "https://apnews.com/article/michigan-sign-stealing-8923fc28dd50a0afc3e065ed18962e68",
        "source": "apnews.com",
        "subjectivity_score": 0.5196692681042081,
        "sentiment_score": -0.14902358255485923,
        "category": "Sports"
    },
    "October 3, 2023 - Kevin McCarthy ousted as Speaker of the House": {
        "url": "https://www.cnn.com/politics/live-news/matt-gaetz-kevin-mccarthy-house-speakership-10-03-23/index.html",
        "source": "www.cnn.com",
        "subjectivity_score": 0.3611172383177211,
        "sentiment_score": -0.20288585620748006,
        "category": "Politics"
    },
    "Speaker McCarthy ousted in historic House vote, as scramble begins for a Republican leader": {
        "url": "https://apnews.com/article/mccarthy-gaetz-speaker-motion-to-vacate-congress-327e294a39f8de079ef5e4abfb1fa555",
        "source": "apnews.com",
        "subjectivity_score": 0.5752300242339647,
        "sentiment_score": -0.1351466430187894,
        "category": "Politics"
    },
    "The US economy added 150,000 jobs last month. Here’s what that means": {
        "url": "https://www.cnn.com/2023/11/03/economy/jobs-report-october-final/index.html",
        "source": "www.cnn.com",
        "subjectivity_score": 0.5454155463159113,
        "sentiment_score": 0.18460515251670762,
        "category": "News"
    },
    "US employers pulled back on hiring in October, adding 150,000 jobs in face of higher borrowing rates": {
        "url": "https://apnews.com/article/jobs-economy-inflation-rates-hiring-federal-reserve-941e0963d178e3435dfd01f3393787aa",
        "source": "apnews.com",
        "subjectivity_score": 0.518002050691182,
        "sentiment_score": 0.31574173789284726,
        "category": "News"
    },
    "US job growth cools in October to 150K while unemployment unexpectedly rises": {
        "url": "https://www.foxbusiness.com/economy/us-jobs-report-october-2023",
        "source": "www.foxbusiness.com",
        "subjectivity_score": 0.5360532775882544,
        "sentiment_score": -0.5531418560442769,
        "category": "News"
    },
    "US labor market loosens as job gains slow, unemployment rate hits 3.9%": {
        "url": "https://www.reuters.com/markets/us/us-job-growth-slows-october-unemployment-rate-rises-39-2023-11-03/",
        "source": "www.reuters.com",
        "subjectivity_score": 0.3783717638961182,
        "sentiment_score": -0.02828916627943301,
        "category": "News"
    }
};
const articlesMap = new Map(Object.entries(articles));

app.get("/api/articles/by-url", (req, res) => {
    const articleUrl = req.query.url;
    console.log(articleUrl);

    let foundKey = "";
    const articleEntry = Object.entries(articles).find(([key, article]) => {
        const isMatch = article.url === articleUrl;
        if (isMatch) {
            foundKey = key; // Capture the key
        }
        return isMatch;
    });

    if (articleEntry) {
        const [key, article] = articleEntry;
        // Set the title attribute to the key of the object
        article.title = key;
        res.json({ article: article });
    } else {
        res.status(404).send('Article not found');
    }
});

app.get("/api/articles", (req, res) => {
    const articleArray = Object.keys(articles).map(key => ({
        title: key,
        ...articles[key]
    }));
    res.json({ articles: articleArray });
});

app.get("/api/articles/:title", (req, res) => {
    const articleKey = decodeURIComponent(req.params.title);
    const article = articlesMap.get(articleKey);
    if (article) {
        res.json({ title: articleKey, ...article });
    } else {
        res.status(404).send('Article not found');
    }
});

app.get("/api/articles/by-url", (req, res) => {
    const url = decodeURIComponent(req.query.url); // Get the URL from the query string
    if (!url) {
        res.status(400).send('URL parameter is required');
        return;
    }

    const articleEntry = Array.from(articlesMap.values()).find(article => article.url === url);
    if (articleEntry) {
        res.json(articleEntry);
    } else {
        res.status(404).send('Article not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
