# Grow Frontend Challenge - Yang Yu

### install
`npm install`

### run the app
`npm run dev`

### run the test suites
`npm test`

# Hello (world) from the developer!

Hi and thank you for taking the time to look over my work!

This was a fun take-home and I learned quite a bit doing it. This is my first project using TypeScript & vite, so forgive me if you see
any strange patterns there. I've been doing a bit of TypeScript learning on the side for a few weeks now, but this is the first
time I've built an app in it.

I tried to build the major features in the app as if I were shipping them to production - you may see some comments
interspersed throughout the code pointing out potential areas of improvement and or limitations of the API used here.

# Enhancements I chose & why I chose them!

### Filter by country

- I chose to build out the country enhancement mostly because I saw it as an opportunity to add a bit more complexity to the state
of the components, and or interface with the API a bit more than just pinging the default endpoint.
- There are some more detailed notes on this in the CountrySelector.tsx component, but as a brief overview, the API was very inconsistent with returning 200s so I decided to scrape the API, filter the countries that 404 (the ones that only have so few views) 
and then store those countries (name and 2 digit ISO code) in a JSON file. I go into pro's and con's in <CountrySelector />


### Pin your results

- I also wanted to implement the pinned results feature since it gave me an opportunity to create a custom LocalStorage hook and actually bring some form of utility to the app (pinning results and seeing how other results compare over time)
- I added a timestamp as a feature to the pinned results, since, I realized if days went by since the article was pinned, both the views and the rank would no longer be actually accurate.
- I felt like a table with rows was a clean implementation of the requirements of the results and MUI came with a lot out of the box
for this. If the app had needed to scale with pagination, etc, the table could've gracefully handled that, including the third enhancement. 


# Where I would improve if I had more time to dedicate to this challenge

### 1 - Testing :) 

The testing in this app is admittedly pretty bare bones. There's render & snapshot testing which covers basic, static UI 
functionality / appearance, but there isn't much testing for deeper functionality.

This was a tradeoff I made due to wanting to limit the amount of time I spent on this challenge. If I had more time, I would go through and simulate click events within all the components, test the results of those events, etc. 

Given that a lot of the functionality came out of the box with MUI, I felt like I would rather have spent time on implementing the logic for how this app would perform in production, than testing the UI components. I totally understand if I get docked here, obviously tests are extremely important for any production environment and in the real world I never ship code without functionality tests.

### 2 - Error / UI edge case handling

If I had more time I would abstract error handling more, add error boundaries to logic, and added UI components to manage states where the fetch request returned nothing, were loading, etc. 

### 3 - React-query

React-Query was another package I was wanting to learn, but after attempting for a while, I decided 2 new technologies was enough
for one take home. If I had more time, I'd have looped in the fetches to react-query. 

### 4 - Style reusability

If I had time I would be more intentional about the styles I'm using - some of them are one offs, and I'd much prefer to create more reusable layouts, themes, etc., though, for the sake of this project they'd have only been used in like 2-3 instances max, so I decided to prioritize other aspects. 

### 5 - Country API

As I mentioned above, the countries.json decoupling from the actual API is something to consider deeper. I think given the relatively static nature of countries (at least compared to things like tweets, etc) this one is pretty low on the priority list, but I do wonder if there could have been a more elegant solution to handling the lack of API support whilst giving the user a relatively error free / stress free experience. 

# Performance considerations

### API limitations
Due to the fact that the API did not support using limits, I realize these api calls could be improved. I think React-Query could have helped with caching and reducing the number of fetches, but I instead opted to simply debounce the API calls to limit subsequent calls from re-renders. 

# API Endpoints

This application currently only uses 1 endpoint since it filters by country by default (defaulting to US)

- `https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country/${countryCode}/all-access/${dateToDisplay}`
