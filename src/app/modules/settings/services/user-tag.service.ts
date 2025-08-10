import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../shared/services/http.service';
import { UserTag } from '../models/user-tag.model';

@Injectable({
  providedIn: 'root'
})
export class UserTagService {

  tags: Map<number, UserTag> = new Map();
  tagsList: UserTag[] = [];

  constructor(private httpService: HttpService) {
    // Load tags on startup
    this.loadTags();
  }

  loadTags() {
    this.httpService.get<UserTag[]>(environment.apiUrl + "/user-tags").subscribe(result => {
      this.tags.clear();
      this.tagsList = result;
      result.map(tag => this.tags.set(tag.id, tag));
    });
  }

  getTags(): string[] {
    let tagsArr: string[] = [];
    if (this.tags) {
      this.tags.forEach(tag => {
        tagsArr.push(tag.tag);
      });
    }
    return tagsArr;
  }

  getTagNameById(tagId: number): string {
    let tag: UserTag = this.tags.get(tagId);
    if (tag) {
      return tag.tag;
    }
    return "";
  }

  getUserTagById(id: number) {
    return this.tags.get(id);
  }

  getUserTagByName(tag: string): UserTag {
    let userTag: UserTag;
    this.tags.forEach(uTag => {
      if(uTag.tag == tag){
        userTag = uTag;
      }
    });
    return userTag;
  }

  createTag(tag: UserTag): Observable<UserTag> {
    return this.httpService.post<UserTag, UserTag>(environment.apiUrl + '/user-tags/tag', tag);
  }

  updateTag(tag: UserTag): Observable<UserTag> {
    return this.httpService.put<UserTag, UserTag>(environment.apiUrl + '/user-tags/tag', tag);
  }

  registerTag(tag: UserTag) {
    if (tag) {
      this.tags.set(tag.id, tag);
    }
  }



}
