import React, { useState, useEffect } from 'react';
import api from '../api';

// eslint-disable-next-line
import { useLocation, Link, Router } from 'react-router-dom';

import styled from 'styled-components';

const SearchHeader = styled.div`
	text-align: center;
	font-size: 26px;
`

const SearchContainer = styled.div`
	padding: 10px;
`

const StyledLink = styled(Link)`
	text-decoration: none;
	color: black;
	font-style: italic;
`

const SearchPage = () => {
	// eslint-disable-next-line
	const [hasError, setErrors] = useState(false);
	const [tweets, setTweets] = useState([]);

	useEffect(() => { 
		api.getAllTweets().then(tweets => {
			setTweets({tweets: tweets.data.data});
		})
	}, [])

	console.log(tweets.tweets);

	const { search } = useLocation();
	const query = new URLSearchParams(search).get('s');
	//const [searchQuery, setSearchQuery] = useState(query || '');
	const filteredTweets = filterTweets(tweets.tweets, query);

    console.log('TCL: TweetList -> render -> tweets');

    return (
		<SearchContainer>
			{filteredTweets.length === 0 ?
				<SearchHeader>
					<i> No Results for "{query}" </i>		
				</SearchHeader>
			:
				<SearchHeader>
					<i> Search results for "{query}" </i>
				</SearchHeader>
			}
            <ul>
                {filteredTweets && filteredTweets.map(tweet => (
                	<StyledLink to ={`/tweets/${tweet.tweet_id}`}>
                    	<li key={tweet.tweet_id}>
                    		{tweet.text_string}
                    	</li>
                    </StyledLink>
                ))}
            </ul>
		</SearchContainer>
	)
}

export default SearchPage; 


const filterTweets = (tweets, query) => {
    if (!query) {
        return tweets;
    }

    if(tweets == null){
    	return [];
    }

    return tweets.filter((tweet) => {
        const tweetText = tweet.text_string.toLowerCase();
        return tweetText.includes(query);
    });
};