import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewController} from 'ionic-angular';
import { NewsService } from '../../providers/news-service/news-service';

/*
  Generated class for the NewsDetail component.
  by Rob(Hackd.design)

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'news-detail',
  templateUrl: 'build/components/news-detail/news-detail.html'
})
/**
 * Main Component for displaying news articles inside the modals 
 * on the landing page
 */ 
export class NewsDetail implements OnInit {

  text: string = 'I am a string';

  constructor(private newsServie: NewsService, private viewController: ViewController) {


  }

  ngOnInit() {
    console.log("News Detail fired");
  }
}
  