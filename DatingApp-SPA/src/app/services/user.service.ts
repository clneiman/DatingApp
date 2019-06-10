import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Message } from '../models/message';
import { PaginatedResults } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl + 'users';

  constructor(private http: HttpClient) { }

  getUsers(page?, itemsPerPage?, userParams?, likesParam?): Observable<PaginatedResults<User[]>> {
    const paginatedResults: PaginatedResults<User[]> = new PaginatedResults<User[]>();

    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }

    if (likesParam === 'Likers') {
      params = params.append('likers', 'true');
    } else if (likesParam === 'Likees') {
      params = params.append('likees', 'true');
    }

    return this.http.get<User[]>(this.baseUrl, { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResults.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            paginatedResults.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResults;
        })
      );
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/' + userId);
  }

  updateUser(userId: number, user: User) {
    return this.http.put(this.baseUrl + '/' + userId, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(this.baseUrl + '/' + userId + '/photos/' + id + '/setMain', null);
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + '/' + userId + '/photos/' + id);
  }

  sendLike(userId: number, recipientId: number) {
    return this.http.post(this.baseUrl + '/' + userId + '/like/' + recipientId, null);
  }

  getMessages(userId: number, page?, itemsPerPage?, messageContainer?) {
    const paginatedResults: PaginatedResults<Message[]> = new PaginatedResults<Message[]>();

    let params = new HttpParams();

    params = params.append('MessageContainer', messageContainer);

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Message[]>(this.baseUrl + '/' + userId + '/messages', { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResults.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            paginatedResults.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResults;
        })
      );
  }

  getMessageThread(userId: number, recipientId: number) {
    return this.http.get<Message[]>(this.baseUrl + '/' + userId + '/messages/thread/' + recipientId);
  }

  sendMessage(userId: number, message: Message) {
    return this.http.post(this.baseUrl + '/' + userId + '/messages', message);
  }

  deleteMessage(userId: number, messageId: number) {
    return this.http.post(this.baseUrl + '/' + userId + '/messages/' + messageId, null);
  }

  markMessageAsRead(userId: number, messageId: number) {
    return this.http.post(this.baseUrl + '/' + userId + '/messages/' + messageId + '/read', null).subscribe();
  }

}
