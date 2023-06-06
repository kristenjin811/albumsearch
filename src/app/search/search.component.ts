import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Album {
  collectionName: string;
  artistName: string;
  artworkUrl100: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  artistName: string = '';
  albums: Album[] = [];
  loading: boolean = false;

  constructor(private http: HttpClient) { }

  searchAlbums() {
    if (this.artistName.trim() === '') {
      return;
    }

    const apiUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(this.artistName)}&media=music&entity=album&attribute=artistTerm&limit=50`;
    this.loading = true;

    this.http.get(apiUrl)
      .subscribe(
        (data: any) => {
          this.albums = data.results;
          this.loading = false;
        },
        error => {
          console.log('Error fetching albums:', error);
          this.loading = false;
        }
      );
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/