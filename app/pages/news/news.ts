import { Component, OnInit, OnDestroy, DoCheck  } from '@angular/core';
import { NavController, Modal, ViewController } from 'ionic-angular';
import { NewsDetail } from '../../components/news-detail/news-detail';
import { NewsService } from '../../providers/news-service/news-service';
import { Article } from '../../providers/news-service/models/article';

@Component({
  providers: [NewsService],
  directives: [NewsDetail],
  templateUrl: 'build/pages/news/news.html'
})
/*** * * * * * * * * * * * * * * * * * * * * * * * * * * * * *** 
 * ********** POKEMON GO TIGARD FAN CLUB SITE **************** *
 * **********       Front Page Component      **************** *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/**
 * This Component initializes the NewsPage
 */
export class NewsPage implements OnInit, AfterViewInit {
  // General Vars
  error: any;

  articles = [];
  newsLeft: Array<{ title: string, content: string, id: string}>;
  newsRight: Array<{ title: string, content: string, id: string}>;
  middleContent: Array<{title: string, content: string, id: string}>;
  constructor(private newsService: NewsService, private navCtrl: NavController, private viewController: ViewController ) {
    
  this.newsLeft = [];
  this.newsRight = [];
  this.middleContent = [];
  for (let i = 0; i < 5; i++ ) {
    this.newsLeft.push({   
      title: 'News Title: ' + i,
      content: 'This is content for a news article',
      id: i + 'left' 
    }); 
    this.newsRight.push({ 
      title: 'News Title: ' + i,
      content: 'This is content for a news article',
      id: i + 'right'
    });
    this.middleContent.push({
      title: 'This Could Be Your Ad!',
      content: 'contact us at pokemongotigard@tigard.com',
      id: i + '-mid'
    });
  }
};

  /**
   * PokemonGO Tigard News Articles
   * Life Cycle Events
   * @author {rob} hackd.desgin The iLL Dev
   * @param {provider} NewsService The data component.
   */
  ngDoCheck() {
    console.log('check');
    this.newsService.getNews()
    .then(articles => this.articles = articles)
    .catch(error => this.error = error);
  }



  /**
   * ngOnInit sets up the news component's initial data for 
   * content distribution 
   */
  ngOnInit(){

    console.log('news init fired');
    // Gets article data
     

// DEBUG
console.dir(this.articles);


  }
  /**
   * Tap handler that displays a detail-modal for News Articles.
   * @param {string} aid The identification number for an article. 
   */
  showArticle(id: number) {
    console.log("show Article" + id);
  };
  showModal() {
    let modal = Modal.create(NewsModal);
    this.navCtrl.present(modal);
  }
};
/**
 * News-Detail Component - This is the modal component that will be displayed when user taps a
 * news articles.
 *
 */
@Component ({
  
  template: `
  <h1> I AM A MODEL </h1>
  <button button (click)="close()">Close</button>
  `
})
class NewsModal {
  constructor(private viewController: ViewController){
    console.log("constructor fired");
  };
  close() {
    this.viewController.dismiss();
  };
};