import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent {
  newsData: any = [];
  isLoading: any = true;
  private apiUrl = 'https://news-api14.p.rapidapi.com/v2/search/articles';
  private headers = new HttpHeaders({
    'x-rapidapi-key': 'd4c8a67a12msh8eb9f10bf7d21d8p1b3744jsn6dc8f6d6a3bd',
    'x-rapidapi-host': 'news-api14.p.rapidapi.com',
  });

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const result = this.getArticles('chicago', 'en').subscribe((data: any) => {
      console.log(data, 'data');
      this.isLoading = false;
      if (data.success) {
        this.newsData = data.data;
      } else {
        this.newsData = [
          {
            title: 'Chicago Bulls | NBA.com',
            url: 'https://www.nba.com/bulls/videos/highlights-chicago-bulls-beat-the-nets-128-102',
            excerpt: 'Watch the latest video on NBA.com',
            thumbnail:
              'https://cdn.nba.com/teams/uploads/sites/1610612741/2022/04/bullhead-1819.png',
            language: 'en',
            paywall: false,
            contentLength: 0,
            date: '2024-12-03T03:33:10+00:00',
            authors: [],
            keywords: [],
            publisher: {
              name: 'beIN SPORTS',
              url: 'https://www.nba.com',
              favicon:
                'https://staticns.bonai.io/publisher/eLzkTSuHr9kg4TPIxwL3v9YeADClsKQvEZr1E3cmg8',
            },
          },
          {
            title: 'Leafs beat Chicago without really trying',
            url: 'https://www.pensionplanpuppets.com/leafs-beat-chicago-without-really-trying/',
            excerpt: 'Seriously, they barely played the second period.',
            thumbnail:
              'https://images.unsplash.com/photo-1530191243238-40c331402218?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDMwfHxzcGFya2xlcnxlbnwwfHx8fDE3MzMxOTQ1MDh8MA&ixlib=rb-4.0.3&q=80&w=2000',
            language: 'en',
            paywall: false,
            contentLength: 3271,
            date: '2024-12-03T03:05:12+00:00',
            authors: ['Cathy Squires'],
            keywords: ['Game Coverage'],
            publisher: {
              name: 'PPP Leafs',
              url: 'https://www.pensionplanpuppets.com',
              favicon:
                'https://staticns.bonai.io/publisher/RRsO2Ecsg5YTv2hyZxdOejxjVf6FfEhrBFwhjy4M',
            },
          },
          {
            title: 'Matas Buzelis Has Breakout Game for the Chicago Bulls',
            url: 'https://www.si.com/nba/draft/nba-rookies/matas-buzelis-breakout-bulls',
            excerpt:
              'In a season of fluctuating minutes and an inconsistent role, Matas Buzelis seemed to find his footing in the Chicago Bulls’ 128-102 victory over an injury-laden',
            thumbnail:
              'https://images2.minutemediacdn.com/image/upload/c_crop,w_6761,h_3803,x_0,y_0/c_fill,w_1440,ar_16:9,f_auto,q_auto,g_auto/images/ImagnImages/mmsport/nba_draft/01je6m3a1fjwp0a8fvac.jpg',
            language: 'en',
            paywall: false,
            contentLength: 2200,
            date: '2024-12-04T02:13:43+00:00',
            authors: ['Matt Coletti'],
            keywords: [],
            publisher: {
              name: 'Sports Illustrated',
              url: 'https://www.si.com',
              favicon:
                'https://staticns.bonai.io/publisher/e9OY3dgf8N5GUK2ei3bek1ZxN7lJYJ7sUZ5PbqOGlM',
            },
          },
          {
            title: 'Chicago Bulls vs Brooklyn Nets Injury Report',
            url: 'https://www.si.com/nba/bulls/news/chicago-bulls-vs-brooklyn-nets-injury-report-01je3dkww3wg',
            excerpt:
              'The Chicago Bulls and Brooklyn Nets face off tonight in a battle between two teams on a two-game losing streak. Both teams desperately need a win before officia',
            thumbnail:
              'https://images2.minutemediacdn.com/image/upload/c_crop,w_4601,h_2588,x_0,y_0/c_fill,w_1440,ar_16:9,f_auto,q_auto,g_auto/images/ImagnImages/mmsport/bulls_news/01je3e4v3cyxsp0na8na.jpg',
            language: 'en',
            paywall: false,
            contentLength: 1521,
            date: '2024-12-02T20:50:00+00:00',
            authors: ['Farbod Esnaashari'],
            keywords: [],
            publisher: {
              name: 'Sports Illustrated',
              url: 'https://www.si.com',
              favicon:
                'https://staticns.bonai.io/publisher/e9OY3dgf8N5GUK2ei3bek1ZxN7lJYJ7sUZ5PbqOGlM',
            },
          },
          {
            title: 'Brooklyn Nets vs. Chicago Bulls: Injury Report',
            url: 'https://www.si.com/nba/nets/news/brooklyn-nets-chicago-bulls-injury-report-dec-2',
            excerpt:
              'Look away Nets fans, it could be a rough evening. With seven, and potentially eight, players held out due to injury, Brooklyn’s ‘next man up’ mentality must be',
            thumbnail:
              'https://images2.minutemediacdn.com/image/upload/c_crop,w_3817,h_2147,x_0,y_19/c_fill,w_1440,ar_16:9,f_auto,q_auto,g_auto/images/ImagnImages/mmsport/inside_the_nets/01je424n7xrwtfreez8w.jpg',
            language: 'en',
            paywall: false,
            contentLength: 1742,
            date: '2024-12-02T19:59:53+00:00',
            authors: ['Kyler Fox'],
            keywords: [],
            publisher: {
              name: 'Sports Illustrated',
              url: 'https://www.si.com',
              favicon:
                'https://staticns.bonai.io/publisher/e9OY3dgf8N5GUK2ei3bek1ZxN7lJYJ7sUZ5PbqOGlM',
            },
          },
          {
            title:
              'Projecting Chicago Cubs’ Starting Rotation Following Matthew Boyd Signing',
            url: 'https://www.si.com/fannation/mlb/fastball/news/projecting-chicago-cubs-starting-rotation-following-matthew-boyd-signing-justin-steele-shota-imanaga-javier-assad-jameson-taillon-ben-brown-jordan-wicks-hayden-wesneski-01je6f543fhh',
            excerpt:
              'Matthew Boyd joining the Cubs on a two-year deal gives Chicago five solid starting pitchers to lean on in 2025, starting with Justin Steele and Shota Imanaga.',
            thumbnail:
              'https://images2.minutemediacdn.com/image/upload/c_crop,w_4482,h_2521,x_0,y_25/c_fill,w_1440,ar_16:9,f_auto,q_auto,g_auto/images/ImagnImages/mmsport/fastball/01je6tbw69zcqhz19n54.jpg',
            language: 'en',
            paywall: false,
            contentLength: 3302,
            date: '2024-12-03T18:35:00+00:00',
            authors: ['Sam Connon'],
            keywords: [],
            publisher: {
              name: 'Sports Illustrated',
              url: 'https://www.si.com',
              favicon:
                'https://staticns.bonai.io/publisher/e9OY3dgf8N5GUK2ei3bek1ZxN7lJYJ7sUZ5PbqOGlM',
            },
          },
          {
            title:
              'Chicago Bulls’ Expectations Before NBA Trade Deadline Revealed',
            url: 'https://www.si.com/nba/bulls/news/chicago-bulls-expectation-before-nba-trade-deadline-revealed-01je4vbbfnd8',
            excerpt:
              'Trade rumors are often thrown around when a team has multiple players that could be assets to contenders and the team is underperforming. This is the case with',
            thumbnail:
              'https://images2.minutemediacdn.com/image/upload/c_crop,w_4500,h_2531,x_0,y_0/c_fill,w_1440,ar_16:9,f_auto,q_auto,g_auto/images/ImagnImages/mmsport/bulls_news/01je4vcpjbdcn3gdrvnb.jpg',
            language: 'en',
            paywall: false,
            contentLength: 2069,
            date: '2024-12-02T23:56:03+00:00',
            authors: ['Liam Willerup'],
            keywords: [],
            publisher: {
              name: 'Sports Illustrated',
              url: 'https://www.si.com',
              favicon:
                'https://staticns.bonai.io/publisher/e9OY3dgf8N5GUK2ei3bek1ZxN7lJYJ7sUZ5PbqOGlM',
            },
          },
          {
            title: 'San Antonio and Chicago meet in non-conference showdown',
            url: 'https://www.foxsports.com/articles/nba/san-antonio-and-chicago-meet-in-nonconference-showdown',
            excerpt:
              'San Antonio and Chicago square off in non-conference action',
            thumbnail:
              'https://b.fssta.com/uploads/application/fscom/SiteShareImage.vresize.1200.630.high.0.png',
            language: 'en',
            paywall: false,
            contentLength: 1509,
            date: '2024-12-04T07:03:28+00:00',
            authors: [],
            keywords: [],
            publisher: {
              name: 'FOX Sports',
              url: 'https://www.foxsports.com',
              favicon:
                'https://staticns.bonai.io/publisher/rEEwgl3QhTmCDOQCYCkB0HQcbOgQZssSTBZqPNkr1jw',
            },
          },
          {
            title:
              'Strong, wintry winds cause power outages, exacerbate fire in Chicago’s southwest suburbs',
            url: 'https://www.cbsnews.com/chicago/news/strong-wintry-winds-power-outages-fire-crestwood/',
            excerpt:
              'Fire crews battled whipping winds and freezing temperatures as they fought the blaze.',
            thumbnail:
              'https://assets1.cbsnewsstatic.com/hub/i/r/2024/12/05/f4e5179f-cce7-43d9-8289-6952a8c4b20b/thumbnail/1200x630/2711d5356bd7e8fb24a19c6a5d7ea025/crestwood-fire.png?v=0c07a24f1ac5eb64b06f31185829f707',
            language: 'en',
            paywall: false,
            contentLength: 3463,
            date: '2024-12-05T04:21:09+00:00',
            authors: ['Jermont Terry'],
            keywords: ['Wind Advisory', 'Fire', 'Crestwood'],
            publisher: {
              name: 'CBS News',
              url: 'https://www.cbsnews.com',
              favicon:
                'https://staticns.bonai.io/publisher/T1Fc9JRdunDQ9U0MIAQBygnBKEFpYwG0JoO41xaTg',
            },
          },
          {
            title:
              'Chicago White Sox Lefty Named Organization’s Top Prospect, Compares to Randy Johnson',
            url: 'https://www.si.com/fannation/mlb/fastball/news/chicago-white-sox-lefty-noah-schultz-named-organizations-top-prospect-by-baseball-america',
            excerpt:
              'Left-handed pitcher Noah Schultz was named the top prospect in the Chicago White Sox organization on Wednesday, per the newest list from Baseball America. The W',
            thumbnail:
              'https://images2.minutemediacdn.com/image/upload/c_crop,w_2500,h_1406,x_0,y_124/c_fill,w_1440,ar_16:9,f_auto,q_auto,g_auto/images/ImagnImages/mmsport/fastball/01je9jc92fey9s41ghyw.jpg',
            language: 'en',
            paywall: false,
            contentLength: 1849,
            date: '2024-12-04T19:34:40+00:00',
            authors: ['Brady Farkas'],
            keywords: [],
            publisher: {
              name: 'Sports Illustrated',
              url: 'https://www.si.com',
              favicon:
                'https://staticns.bonai.io/publisher/e9OY3dgf8N5GUK2ei3bek1ZxN7lJYJ7sUZ5PbqOGlM',
            },
          },
        ];
      }
    });
    console.log(result);
  }

  getArticles(query: string, language: string) {
    const params = new HttpParams()
      .set('query', query)
      .set('language', language);

    return this.http.get(this.apiUrl, { headers: this.headers, params });
  }
}
